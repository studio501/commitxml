from __future__ import print_function
import sys,os
import json
import codecs
import my_input

def file_extension(path): 
	return os.path.splitext(path)[1]

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 

def get_json_data(f):
    with open(f, "r") as load_f:
        # sys.getfilesystemencoding()
        load_dict = json.load(load_f,"utf-8")
        return load_dict

def merge_all_json(src_dir,dst_dir="/Users/tangwen/Documents/my_projects/cocos_creator/some_comp/client/assets/resources"):
    if src_dir == dst_dir:
        print("src_dir must diffrent with dst_dir")
        return
    if not os.path.exists(dst_dir):
        print(dst_dir,"not exists")
        return

    res = {}
    for f in os.listdir(src_dir):
        sourceF = os.path.join(src_dir,f)
        if file_extension(f) == ".json":
            key = file_without_extension(f)
            res[key] = get_json_data(sourceF)
    
    fp = codecs.open(os.path.join(dst_dir,"data.json"), 'w', 'utf-8')
    fp.write(json.dumps(res,ensure_ascii=False,separators=(',',':')))
    fp.close()
    print("save {} successful".format("data.json"))

if __name__ == '__main__':
    if len(sys.argv == 3):
        merge_all_json(sys.argv[1],sys.argv[2])
    pass