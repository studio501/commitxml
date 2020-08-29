# -*- coding: utf-8 -*
import os,sys,json,re,subprocess
import shutil
import demjson
import urllib2

W_re = re.compile(r'\w')
PushRF_re = re.compile(r'cc._RF.push\(.*?\),')
PopRF_re = re.compile(r',\s*cc._RF.pop\(\s*\)')
Pat_re = re.compile(r'\%\{\d+\}')
JsRe_re = re.compile(r'/.*?[\'\"].*?/\.test\(.*?\)')

CorArr = ['(','[','{','}',']',')']

def is_number(str):
    try:
        # 因为使用float有一个例外是'NaN'
        if str=='NaN':
            return False
        float(str)
        return True
    except ValueError:
        return False

def get_json_data(f):
	with open(f,'r') as load_f:
  		load_dict = json.load(load_f)
  		return load_dict

def decode_uuid(uuid):
    return subprocess.check_output(['node','decode-uuid.js',uuid]).rstrip()

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

def save_one_file(url,file_path,file_mode):
    dst_dir = os.path.dirname(file_path)
    if not os.path.exists(dst_dir):
        try:
            subprocess.call(['mkdir','-p',dst_dir])
        except Exception as e:
            pass

    try:
        contents = urllib2.urlopen(url).read()
        with open(file_path, file_mode) as f:
            f.write(contents)

            print("save file",file_path,"success")
    except Exception as e:
        pass

def gen_res_json(js_file_name,json_pt):
    contents = None
    had_save = [False]
    def when_match(word1,word2):
        if had_save[0]:
            return
        module_contents = contents[word1.p:word2.p+1]
        module_contents = module_contents.replace('\n','').replace('!0','true').replace('!1','false')
        result = demjson.decode(module_contents)
        json_str = json.dumps(result,encoding="utf-8")
        with open(json_pt,"w") as f:
            f.write(json_str)
            had_save[0] = json.loads(json_str,"utf-8")
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
            if had_save[0]:
                return had_save[0]

def download_res_(url,save_file):
    pass

def get_md5_suffix(val,tab):
    if not val in tab:
        return False
    x = tab.index(val)
    return tab[x+1]

def get_first2char(in_str):
    return in_str[:2]

def get_res(js_file_name,out_put_dir,base_url):
    if os.path.exists(out_put_dir):
        shutil.rmtree(out_put_dir)

    subprocess.call(['mkdir','-p',out_put_dir])

    gen_json_name = "settings.json"
    scripyts_pwd = os.path.dirname( os.path.realpath(__file__))
    gen_json_path = os.path.join(scripyts_pwd,gen_json_name)
    json_data = None
    if os.path.exists(gen_json_path):
        json_data = get_json_data(gen_json_path)
    else:
        json_data = gen_res_json(js_file_name,gen_json_path)
    assetTypes = json_data['assetTypes']

    direct_get_res = ["cc.Texture2D","cc.AudioClip","cc.JsonAsset","sp.SkeletonData"]
    direct_get_res_suff = [".png",".mp3",".json",".json"]
    file_mode_arr = ["wb","wb","w","w"]
    file_mode_arr = ["wb","wb","w","w"]
    searchModule = ["raw-assets","raw-assets","import","import"]
    direct_get_res_idx = []
    for i,v in enumerate(direct_get_res):
        for i1,v1 in enumerate(assetTypes):
            if v == v1:
                direct_get_res_idx.append(i1)
                break

    uuids_arr = json_data['uuids']
    md5AssetsMap = json_data['md5AssetsMap']
    md5AssetsMap_import = md5AssetsMap["import"]
    md5AssetsMap_raw = md5AssetsMap["raw-assets"]

    tm = get_md5_suffix(978,md5AssetsMap_import)
    raw_url = "raw-assets"
    import_url = "import"
    for k in json_data['rawAssets']:
        asset_tmp = json_data['rawAssets'][k]
        for k1 in asset_tmp:
            asset_one = asset_tmp[k1]
            asset_url = asset_one[0]
            asset_type = asset_one[1]

            if asset_type in direct_get_res_idx:
                asset_idx = direct_get_res_idx.index(asset_type)
                asset_suffix = direct_get_res_suff[asset_idx]
                file_mode = file_mode_arr[asset_idx]
                searchMo = searchModule[asset_idx]
                uuid_idx = int(k1)
                uuid = uuids_arr[uuid_idx]
                md5_suf = get_md5_suffix(uuid_idx,md5AssetsMap[searchMo])
                if md5_suf:
                    dec_uuid = decode_uuid(uuid)
                    url_prefix = get_first2char(dec_uuid)
                    url_arr = [base_url,searchMo,url_prefix,dec_uuid+"."+md5_suf+asset_suffix]
                    final_url = '/'.join(url_arr)
                    dst_path = os.path.join(out_put_dir,asset_url)
                    save_one_file(final_url,dst_path,file_mode)
                    a = 100
    
    for k in json_data['packedAssets']:
        md5_suf = get_md5_suffix(k,md5AssetsMap_import)
        if md5_suf:
            url_prefix = get_first2char(k)
            url_arr = [base_url,import_url,url_prefix,k+"."+md5_suf+".json"]
            final_url = '/'.join(url_arr)
            dst_path = os.path.join(out_put_dir,k+".json")
            save_one_file(final_url,dst_path,"w")
    pass


def main():
    # a = subprocess.check_output(['node','decode-uuid.js','fcmR3XADNLgJ1ByKhqcC5Z']).rstrip()
    if len(sys.argv) == 4:
        js_file_name = sys.argv[1]
        out_put_dir = sys.argv[2]
        res_type = sys.argv[3]
        if res_type == "code":
            get_code(js_file_name,out_put_dir)
        elif res_type == "res":
            base_url = "https://cdn.ftaro.com/kingwar4_h5/43331/wx/res"
            get_res(js_file_name,out_put_dir,base_url)


if __name__ == "__main__":
    main()