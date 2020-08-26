# -*- coding: utf-8 -*
import os,sys,json,re,subprocess
import shutil
import demjson

W_re = re.compile(r'\w')
PushRF_re = re.compile(r'cc._RF.push\(.*?\),')
PopRF_re = re.compile(r',\s*cc._RF.pop\(\s*\)')
Pat_re = re.compile(r'\%\{\d+\}')
JsRe_re = re.compile(r'/.*?[\'\"].*?/\.test\(.*?\)')

CorArr = ['(','[','{','}',']',')']

class word_class:
    def __init__(self,w,p):
        self.w = w
        self.p = p


class world_stack:
    def __init__(self,data,check_arr,call_back,match_back=None,err_func=None,Js_Reg=True):
        self.m_data = data
        self.m_arr = []
        self.m_quta_stack  = []
        self.m_check_arr = []
        for x in check_arr:
            self.m_check_arr.append(word_class(x,0))
        self.m_call_back = call_back
        self.m_match_back = match_back
        self.m_err_func = err_func
        self.m_js_reg_check = Js_Reg

    def push(self, word):
        if self.is_cor(word):
            can_del = self.can_del(word)
            if can_del:
                if self.m_match_back:
                    self.m_match_back(self.get_top(),word)
                
                is_match = self.is_matcher()
                if is_match:
                    if self.m_call_back:
                        self.m_call_back(self.get_top(),word)
                self.pop()
                # self.dump()
                # line = self.get_line_of(word)
                # print(line)
            else:
                if self.is_left_cor(word):
                    self.m_arr.append(word)
                
                if self.is_right_cor(word):
                    if self.m_err_func:
                        self.m_err_func(word)
        else:
            w = word.w
            if w == '"' or w == "'":
                if not self.is_wrap_by_reg(word):
                    t_len = len(self.m_quta_stack)
                    if t_len == 0:
                        self.m_quta_stack.append(w)
                    elif t_len == 1:
                        preve_one = self.m_quta_stack[0]
                        if w == preve_one:
                            self.m_quta_stack.pop()
                    else:
                        print('error: m_quta_stack length error!!!')

    def get_line_of(self,word):
        p = word.p
        i1 = i2 = p
        t_len = len(self.m_data)
        while True:
            if i1 <= 0:
                break
            if self.m_data[i1] == '\n':
                break
            i1 -= 1

        while True:
            if i2 >= t_len - 1:
                break
            if self.m_data[i2] == '\n':
                break
            i2 += 1

        return self.m_data[i1:i2]

    def is_wrap_by_reg(self,word):
        if self.m_js_reg_check:
            line = self.get_line_of(word)
            return len(JsRe_re.findall(line)) > 0
        return False

    def is_right_cor(self,word):
        w = word.w
        return w == ')' or w == '}' or w == ']'
                    
    def is_left_cor(self,wold):
        w = wold.w
        return w == '(' or w == '{' or w == '['

    def is_cor(self,wold):
        w = wold.w
        f1 = w in CorArr
        if not f1:
            return False
        
        if len(self.m_quta_stack) == 1:
            return False
        
        return True

    def is_matcher(self):
        if len(self.m_arr) != len(self.m_check_arr):
            return False
        for i,x in enumerate(self.m_arr):
            c_x = self.m_check_arr[i]
            if x.w != c_x.w:
                return False

        return True

    def get_top(self):
        if len(self.m_arr) > 0:
            return self.m_arr[-1]
        return None

    def pop(self):
        self.m_arr.pop()


    def can_del(self,word):
        la = self.get_top()
        if not la:
            return False

        if word.w == '(' or word.w == '[' or word.w == '{':
            return False

        if la.w == '(':
            return word.w == ')'

        if la.w == '[':
            return word.w == ']'

        if la.w == '{':
            return word.w == '}'

        return False

    def dump(self,no_print=False):
        t = []
        for x in self.m_arr:
            t.append(x.w)
        ss = ''.join(t)
        if not no_print:
            print('dump m_arr',ss)

        return ss

def get_module_name(contents,start):
    i = start
    quto_cter = []
    ctr = 0
    t = []
    while True:
        ctr+=1
        i -= 1
        c = contents[i]
        t.append(c)
        if c == ':':
            quto_cter.append(i)
        elif len(quto_cter) == 1 and len(W_re.findall(c)) != 1:
            return contents[i+1:quto_cter[0]]

        if ctr >= 100:
            print("can not find module name",''.join(t))
            break

def get_code(js_file_name,out_put_dir):
    if os.path.exists(out_put_dir):
        shutil.rmtree(out_put_dir)

    subprocess.call(['mkdir','-p',out_put_dir])

    contents = None
    def when_match(word1,word2):
        
        module_name = get_module_name(contents,word1.p)
        module_contents = contents[word1.p:word2.p+1]
        print("when_match",module_name)
        def when_match2(w1_,w2_):
            file_pts = os.path.join(out_put_dir,module_name+'.js')
            if os.path.exists(file_pts):
                return
            contents_ = module_contents[w1_.p+1:w2_.p]
            contents_ = contents_.replace('"use strict";','')
            contents_ = PushRF_re.sub('',contents_)
            contents_ = PopRF_re.sub('',contents_)
            with open(file_pts,"w") as f1:
                f1.write(contents_.encode("utf-8"))
            pass
        ms = world_stack(module_contents,['[','{'],when_match2)
        for i1,x in enumerate( module_contents ):
            ms.push(word_class(x,i1))
        pass

    def can_del(word1,word2):
        pass
        print("can_del",word1.w,word2.w,"   ")

    def error_func(word1):
        pass
        st = word1.p - 10
        et = word1.p + 10
        print("error_func",contents[st:et])

    i_cter = 0
    with open(js_file_name) as f:
        contents = f.read()
        f.seek(0)

        ws = world_stack(contents,['(','{','(','{','['],when_match,None,error_func)
        while True:
            c = f.read(1)
            if not c:
                break
            ws.push(word_class(c,i_cter))
            i_cter+=1

    pass

def get_res(js_file_name,out_put_dir):
    if os.path.exists(out_put_dir):
        shutil.rmtree(out_put_dir)

    subprocess.call(['mkdir','-p',out_put_dir])

    contents = None
    def when_match(word1,word2):
        module_contents = contents[word1.p:word2.p+1]
        module_contents = module_contents.replace('\n','').decode("utf-8")
        result = demjson.decode(module_contents)
        pass

    def can_del(word1,word2):
        pass
        print("can_del",word1.w,word2.w,"   ")

    def error_func(word1):
        pass
        st = word1.p - 10
        et = word1.p + 10
        print("error_func",contents[st:et])

    i_cter = 0
    with open(js_file_name) as f:
        contents = f.read()
        f.seek(0)

        ws = world_stack(contents,['(','{','{'],when_match,None,error_func,False)
        while True:
            c = f.read(1)
            if not c:
                break
            ws.push(word_class(c,i_cter))
            i_cter+=1

    pass

def main():
    if len(sys.argv) == 4:
        js_file_name = sys.argv[1]
        out_put_dir = sys.argv[2]
        res_type = sys.argv[3]
        if res_type == "code":
            get_code(js_file_name,out_put_dir)
        elif res_type == "res":
            get_res(js_file_name,out_put_dir)


if __name__ == "__main__":
    main()