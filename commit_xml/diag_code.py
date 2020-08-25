# -*- coding: utf-8 -*
import os,sys,json,re,subprocess

W_re = re.compile(r'\w')

CorArr = ['(','[','{','}',']',')']

class word_class:
    def __init__(self,w,p):
        self.w = w
        self.p = p


class world_stack:
    def __init__(self,check_arr,call_back):
        self.m_arr = []
        self.m_check_arr = []
        for x in check_arr:
            self.m_check_arr.append(word_class(x,0))
        self.m_call_back = call_back

    def push(self, word):
        if self.is_cor(word):
            can_del = self.can_del(word)
            if can_del:
                is_match = self.is_matcher()
                if is_match:
                    if self.m_call_back:
                        self.m_call_back(self.get_top(),word)
                self.pop()
            else:
                self.m_arr.append(word)
                    
    
    def is_cor(self,wold):
        w = wold.w
        return w in CorArr

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

def get_module_name(contents,start):
    i = start
    quto_cter = []
    while True:
        i -= 1
        c = contents[i]
        if c == ':':
            quto_cter.append(i)
        elif len(quto_cter) == 1 and len(W_re.findall(c)) != 1:
            return contents[i+1:quto_cter[0]]

def main():
    if len(sys.argv) == 2:
        js_file_name = sys.argv[1]

        contents = None
        def when_match(word1,word2):
            c1 = contents[word1.p]
            c2 = contents[word2.p]
            s = contents[word1.p:word2.p+1]
            module_name = get_module_name(contents,word1.p)
            print(s)
            pass

        ws = world_stack(['(','{','(','{','['],when_match)

        i_cter = 0
        with open(js_file_name) as f:
            contents = f.read()
            f.seek(0)

            while True:
                c = f.read(1)
                if not c:
                    break
                ws.push(word_class(c,i_cter))
                i_cter+=1

        pass


if __name__ == "__main__":
    main()