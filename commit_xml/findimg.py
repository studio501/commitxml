# -*- coding: utf-8 -*
import subprocess
import os,sys,shutil
import json,zipfile,plistlib,biplist,re

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

def find_png(sourceDir,outer_arr,s_md5):
    if len(outer_arr) > 0:
        return
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(sourceF)
            ebf = file_extension(bf)
            if file_extension(bf) != '.png' and file_extension(bf) != '.jpg':
                continue
            t_md5 = get_file_md5(sourceF)
            if t_md5 == s_md5:
                outer_arr.append(sourceF)
                break
        elif os.path.isdir(sourceF):
            if len(outer_arr) > 0:
                break
            find_png(sourceF,outer_arr,s_md5)

def main():
    if len(sys.argv) == 3:
        outer = []
        get_file_md5(sys.argv[1])

        find_png(sys.argv[2],outer,get_file_md5(sys.argv[1]))
        if len(outer) > 0:
            print(u'找到图片~~~')
            print(outer)
            subprocess.call(['open',os.path.dirname(outer[0])])
        else:
            print(u'找不到到图片!!!')
    elif len(sys.argv) == 2:
        if sys.argv[1] == 'init':
            if not os.path.exists('allpng.json'):
                pass


if __name__ == "__main__":
    main() 