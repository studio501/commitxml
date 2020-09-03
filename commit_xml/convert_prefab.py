# -*- coding: utf-8 -*
import os,sys,shutil,re
import subprocess,json
import my_input

type_re = re.compile(r'"__type__":\s*"(.*?)"')
ref_re = re.compile(r"cc._RF.push\(module,\s*'(.*?)',\s*.*?\);")
spriteframe_re = re.compile(r'"_spriteFrame":\s*\{"__uuid__":\s*"(.*?)"\}')

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 

def file_extension(path): 
	return os.path.splitext(path)[1] 

def read_json_file(f):
    with open(f,'r') as load_f:
        load_dict = json.load(load_f,"utf-8")
        return load_dict

# 8f59a cVi6R OOIiC ua1h+ VaI
# 2577b lRG3R GP4vW PJu/n JOQ
def find_all_jscomp(prefabfile):
    with open(prefabfile,"r") as f:
        contents = f.read()
        all_res = type_re.findall(contents)
        res = []
        for x in all_res:
            if len(x) > 22 and (not x in res):
                res.append(x)
        return res

def find_all_spriteframe(prefabfile):
    with open(prefabfile,"r") as f:
        contents = f.read()
        all_res = spriteframe_re.findall(contents)
        res = []
        for x in all_res:
            if not x in res:
                res.append(x)
        return res

def find_new_script(depend_js_readable,new_lib_dir):
    uuid_json = os.path.join(new_lib_dir,"uuid-to-mtime.json")
    uuid_data = read_json_file(uuid_json)
    if not uuid_data:
        return

    res = {}
    for x in uuid_data:
        t_data = uuid_data[x]
        sc0 = file_extension(t_data["relativePath"])
        sc = file_without_extension(t_data["relativePath"])
        if sc0 == ".js" and sc in depend_js_readable:
            
            fp = os.path.join(new_lib_dir,'imports',x[:2],x+".js")
            with open(fp,"r") as f:
                lines = f.readlines()
                uuid_str = ref_re.sub(r'\1',lines[1]).rstrip()
                res[sc] = uuid_str

    return res
    
def convert_js_bind(origin_prefab,jsmapfile,new_lib_dir,dst_dir):
    depend_js = find_all_jscomp(origin_prefab)
    js_map = read_json_file(jsmapfile)
    
    depend_js_readable = []
    oldjs = {}
    for x in depend_js:
        if js_map.get(x):
            depend_js_readable.append(js_map.get(x))
            oldjs[js_map.get(x)] = x
    if len(depend_js_readable) == 0:
        return
    print(u'prefab depen of',depend_js_readable)

    is_continue = my_input.my_input(u"是否替换(y/n)?") == 'y'
    if not is_continue:
        return

    new_js = find_new_script(depend_js_readable,new_lib_dir)

    js_reflect_map = {}
    for x in oldjs:
        js_reflect_map[oldjs[x]] = new_js[x]

    new_prefab = os.path.join(dst_dir,os.path.basename(origin_prefab))
    with open(origin_prefab,"r") as f:
        contents = f.read()
        for x in js_reflect_map:
            contents = contents.replace(x,js_reflect_map[x])
        
        with open(new_prefab,"w") as f2:
            f2.write(contents)

def my_index(arr,val):
    index_value = -1
    try:
        index_value = arr.index(val)
    except ValueError:
        pass

    return index_value

def sf_uuid2_pngpath(uuid,settingsfile):
    t_data = read_json_file(settingsfile)
    uuids = t_data["uuids"]
    if not uuids:
        return

    uuid_idx = my_index(uuids,uuid)
    if uuid_idx == -1:
        return
    
    rawAssets = [t_data["assets"],t_data["internal"]]

    find_png = None
    for x in rawAssets:
        for y in x:
            if y == uuid_idx:
                find_png = x[y][0]
                break
        if find_png:
            break
    if find_png:
        return [0,find_png]
    
    find_pack = None
    packedAssets = t_data["packedAssets"]
    for x in packedAssets:
        if uuid_idx in packedAssets[x]:
            packedAssets = x
            break
    if not find_pack:
        return
    
    old_import_dir = "/Users/mac/Downloads/_-1495149767_49.wxapkg_dir/allres/import"
    old_import_json = os.path.join(old_import_dir,find_pack+".json")
    o_data = read_json_file(old_import_json)
    atlas = None
    for x in o_data:
        if x["__type__"] == "cc.SpriteAtlas":
            atlas = [1,file_without_extension(x["_name"])]

            for y in x["_spriteFrames"]:
                if x["_spriteFrames"][y]["__uuid__"] == uuid:
                    atlas.append(y)
                    break

            return atlas
    


def convert_srpitFrame_bind(origin_prefab,settingsfile,new_lib_dir,dst_dir):
    pass
    all_sfs = find_all_spriteframe(origin_prefab)

    a = 100


# python convert_prefab.py /Users/mac/Downloads/_-1495149767_49.wxapkg_dir/prefab_res/LayoutLoading.prefab /Users/mac/Documents/my_projects/creator_proj/third_code/jsfilemap/map.json /Users/mac/Documents/my_projects/creator_proj/some_component/library /Users/mac/Downloads/_-1495149767_49.wxapkg_dir/prefab_convert
def main():
    if len(sys.argv) == 6:
        origin_prefab = sys.argv[1]
        jsmapfile = sys.argv[2]
        settingsfile = sys.argv[3]
        new_lib_dir = sys.argv[4]
        dst_dir = sys.argv[5]

        if not os.path.exists(dst_dir):
            os.makedirs(dst_dir)
        
        # convert_js_bind(origin_prefab,jsmapfile,new_lib_dir,dst_dir)
        convert_srpitFrame_bind(origin_prefab,settingsfile,new_lib_dir,dst_dir)
        


        a = 100

if __name__ == "__main__":
    main() 