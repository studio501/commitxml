# -*- coding: utf-8 -*
import os,sys,json,re,subprocess

S1_re = re.compile(r'.* = (\w+)\s*')

def open_json_file(f):
	with open(f,'r') as load_f:
  		load_dict = json.load(load_f)
  		return load_dict

def save_json_file(f,data):
    with open(f, 'w') as outfile:
        json.dump(data, outfile)

def file_extension(path): 
	return os.path.splitext(path)[1]

def get_file_md5(filepath):
    res = subprocess.check_output(['md5',filepath])
    return S1_re.sub(r'\1',res)

def find_png(sourceDir,outer_arr,s_md5,json_data,need_update):
    if len(outer_arr) > 0:
        return
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(sourceF)
            ebf = file_extension(bf)
            if ebf != '.png' and ebf != '.jpg':
                continue
            t_md5 = json_data.get(sourceF)
            if not t_md5:
                t_md5 = get_file_md5(sourceF)
                json_data[sourceF] = t_md5
                need_update[0] = True
            if t_md5 == s_md5:
                outer_arr.append(sourceF)
                break
        elif os.path.isdir(sourceF):
            if len(outer_arr) > 0:
                break
            find_png(sourceF,outer_arr,s_md5,json_data,need_update)

def main():
    if len(sys.argv) == 3:
        outer = []
        get_file_md5(sys.argv[1])

        json_name = 'allpng.json'
        json_data = None
        need_update = [False]
        if not os.path.exists('allpng.json'):
            need_update[0] = True
            json_data = {}
            print(u'第一次找会比较慢,请耐心等待,之后会非常快~')
        else:
            json_data = open_json_file(json_name)

        find_png(sys.argv[2],outer,get_file_md5(sys.argv[1]),json_data,need_update)

        if need_update[0]:
            save_json_file(json_name,json_data)

        if len(outer) > 0:
            print(u'找到图片~~~')
            print(outer)
            subprocess.call(['open',os.path.dirname(outer[0])])
        else:
            print(u'找不到到图片!!!')
    else:
        print(u'使用方法:findimg.sh 源图片 要找的目录')


if __name__ == "__main__":
    main() 