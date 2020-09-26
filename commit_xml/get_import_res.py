import subprocess
import os,sys,shutil,re
import imghdr,json,zipfile,plistlib,biplist
from PIL import Image
import diag_code

size_re = re.compile(r'size:\s* (\d+)\s*,\s*(\d+)')
md5_re = re.compile(r'MD5\s+.*? = (\w+)\n')
# jsfile_re = re.compile(r'(\w+?):\[function\(\w+,\w+,\w+\)\{\s*"use strict";\s*cc\._RF\.push\(\w+,"(.*?)"')
jsfile_re = re.compile(r'cc._RF.push\(e,\"(.*?)",\"(.*?)\"\)')
same_name_dir = 0

def get_png_size(file_name):
    im = Image.open(file_name)
    return im.size

def get_png_md5(file_name):
    res = subprocess.check_output(["md5",file_name])
    return md5_re.sub(r'\1',res)

def file_extension(path): 
	return os.path.splitext(path)[1]

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 

def is_json_file(f):
    try:
        with open(f,'r') as load_f:
            load_dict = json.load(load_f,"utf-8")
            return load_dict
    except Exception as e:
        return False
    else:
        return False

def convert_spriteFrame2_plist(json_file_name,png_name,png_size,png_md5):
    json_data = is_json_file(json_file_name)
    if not json_data:
        return
    
    if not type(json_data) is list:
        return

    result = {}
    result["frames"] = {}
    result["metadata"] = {
        "format" : 2,
        "realTextureFileName" : png_name,
        "size": "{{{0},{1}}}".format(png_size[0],png_size[1]),
        "smartupdate": "$TexturePacker:SmartUpdate:{0}:1/1$".format(png_md5),
        "textureFileName": png_name
    }

    for x in json_data:
        if type(x) is dict and x["__type__"] == "cc.SpriteFrame":
            t = {}
            content = x["content"]
            rect = content["rect"]
            offset = content["offset"]
            originalSize = content["originalSize"]
            t["frame"] = "{{{{{0},{1}}},{{{2},{3}}}}}".format(rect[0],rect[1],rect[2],rect[3])
            t["offset"] = "{{{0},{1}}}".format(offset[0],offset[1])
            t["rotated"] = False
            if content.get("rotated") and content["rotated"] == 1:
                t["rotated"] = True
            
            t["sourceColorRect"] = "{{{{{0},{1}}},{{{2},{3}}}}}".format(0,0,rect[2],rect[3])
            t["sourceSize"] = "{{{0},{1}}}".format(originalSize[0],originalSize[1])
            result["frames"][content["name"]] = t
            pass
    return result



def find_imgplist(sourceDir,dstDir,json_map):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(sourceF)
            if file_extension(sourceF) == ".png":
                file_base_name = file_without_extension(f)
                json_key = file_base_name + ".plist"
                plist_filename = json_map.get(json_key)
                if plist_filename and os.path.exists(plist_filename):
                    dst = os.path.join(dstDir,file_base_name)
                    os.makedirs(dst)
                    png_size = get_png_size(sourceF)
                    png_md5 = get_png_md5(sourceF)
                    plist_contents = convert_spriteFrame2_plist(plist_filename,f,png_size,png_md5)
                    if plist_contents:
                        plistlib.writePlist(plist_contents, os.path.join(dst,json_key))
                        shutil.copy(sourceF, os.path.join(dst,bf))
                        print("save {0} successful".format(json_key))
                    

        elif os.path.isdir(sourceF):
            find_imgplist(sourceF,dstDir,json_map)

def get_json_map(json_dir,json_map,type_name="cc.SpriteAtlas"):
    for f in os.listdir(json_dir):
        sourceF = os.path.join(json_dir,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(sourceF)
            if file_extension(sourceF) == ".json":
                json_data = is_json_file(sourceF)
                if json_data and type(json_data) is list:
                    for x in json_data:
                        if type(x) is dict and x.get("__type__") and x["__type__"] == type_name:
                            json_map[x["_name"]] = sourceF
                            break

        elif os.path.isdir(sourceF):
            get_json_map(sourceF,json_map)

def get_prefab_byfilename(file_name,dstDir):
    json_name = "/Users/tangwen/Documents/my_projects/cplusplus_test/opengl_st1/Opengl_st1/commit_xml/settings.json"
    tmp_file = "/Users/tangwen/Documents/my_projects/wxlittlegame/pkg1/_-1495149767_49.wxapkg_dir/prefab_parse/tmp.json"
    # file_name = "part/PartBattleBoom.prefab"
    diag_code.get_oneres_byname(json_name,tmp_file,file_name)

    get_prefab_byfile(tmp_file,dstDir)

def get_prefab_byfile(sourceF,dstDir):
    bf = os.path.basename(sourceF)
    if file_extension(sourceF) == ".json":
        json_data = is_json_file(sourceF)
        if json_data and type(json_data) is list:
            y = json_data
            if type(y) is list and type(y[0]) is dict and y[0].get("__type__") and y[0]["__type__"] == "cc.Prefab":
                prefab_contents = y
                prefab_name = y[0]["_name"]
                prefab_filename = os.path.join(dstDir,prefab_name+".prefab")
                with open(prefab_filename,"w") as f:
                    f.write(json.dumps(prefab_contents,encoding="utf-8"))
                return

            for x in json_data:
                if type(x) is list and type(x[0]) is dict and x[0].get("__type__") and x[0]["__type__"] == "cc.Prefab":
                    prefab_contents = x
                    prefab_name = x[0]["_name"]
                    prefab_filename = os.path.join(dstDir,prefab_name+".prefab")
                    with open(prefab_filename,"w") as f:
                        f.write(json.dumps(prefab_contents,encoding="utf-8"))
                    break

def get_prefab(json_dir,dstDir):
    for f in os.listdir(json_dir):
        sourceF = os.path.join(json_dir,f)
        if os.path.isfile(sourceF):
            get_prefab_byfile(sourceF,dstDir)
            # bf = os.path.basename(sourceF)
            # if file_extension(sourceF) == ".json":
            #     json_data = is_json_file(sourceF)
            #     if json_data and type(json_data) is list:
            #         for x in json_data:
            #             if type(x) is list and type(x[0]) is dict and x[0].get("__type__") and x[0]["__type__"] == "cc.Prefab":
            #                 prefab_contents = x
            #                 prefab_name = x[0]["_name"]
            #                 prefab_filename = os.path.join(dstDir,prefab_name+".prefab")
            #                 with open(prefab_filename,"w") as f:
            #                     f.write(json.dumps(prefab_contents,encoding="utf-8"))
            #                 break

        elif os.path.isdir(sourceF):
            get_prefab(sourceF,dstDir)

def convetBmfont2fnt(bmfontConfig,png_size):
    pass
    fntConfig = bmfontConfig["_fntConfig"]
    chars_cnt = 0
    for fd in fntConfig["fontDefDictionary"]:
        chars_cnt+=1

    lines = []
    lines.append('info face="DFYuanW7-GBK" size={0} bold=1 italic=0 charset="" unicode=0 stretchH=100 smooth=1 aa=1 padding=1,1,1,1 spacing=2,2'.format(bmfontConfig["fontSize"]))
    lines.append('common lineHeight={0} base={1} scaleW={2} scaleH={3} pages=1 packed=0'.format(fntConfig["commonHeight"],34,png_size[0],png_size[1]))
    lines.append('page id=0 file="{0}"'.format(fntConfig["atlasName"]))
    lines.append('chars count={0}'.format(chars_cnt))

    for id in fntConfig["fontDefDictionary"]:
        t_dict = fntConfig["fontDefDictionary"][id]
        x = t_dict["rect"]["x"]
        y = t_dict["rect"]["y"]
        width = t_dict["rect"]["width"]
        height = t_dict["rect"]["height"]
        xoffset = t_dict["xOffset"]
        yoffset = t_dict["yOffset"]
        xadvance = t_dict["xAdvance"]
        lines.append('char id={}     x={}   y={}   width={}     height={}     xoffset={}     yoffset={}    xadvance={}    page=0 chnl=0'.format(id,x,y,width,height,xoffset,yoffset,xadvance))

    return '\n'.join(lines)


def get_bmfont(sourceDir,dstDir,json_map):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(sourceF)
            if file_extension(sourceF) == ".png":
                file_base_name = file_without_extension(f)
                json_key = file_base_name
                plist_filename = json_map.get(json_key)
                if plist_filename and os.path.exists(plist_filename):
                    png_size = get_png_size(sourceF)
                    json_data = is_json_file(plist_filename)
                    if json_data and type(json_data) is list:
                        for x in json_data:
                            if type(x) is dict and x.get("__type__") and x["__type__"] == "cc.BitmapFont":
                                contents = convetBmfont2fnt(x,png_size)
                                fnt_filename = os.path.join(dstDir,file_base_name+".fnt")
                                with open(fnt_filename,"w") as f:
                                    f.write(contents.encode("utf-8"))
                                    shutil.copy(sourceF, os.path.join(dstDir,bf))
                                    print('save {0} successful'.format(fnt_filename))
                                break
                    

        elif os.path.isdir(sourceF):
            get_bmfont(sourceF,dstDir,json_map)

def try_create_dir(dst):
	pass
	if not os.path.exists(dst):
		os.makedirs(dst)

def unzip_to(zf,dst_dir):
    try_create_dir(dst_dir)
    with zipfile.ZipFile(zf, 'r') as zip_ref:
        zip_ref.extractall(dst_dir)

def test():
    abcd = 100
    get_prefab_byfile("/Users/tangwen/Documents/my_projects/wxlittlegame/pkg1/_-1495149767_49.wxapkg_dir/prefab_parse/a6b36e74-74d3-448a-80c7-4ca795e2f2e5.e5b86.json","/Users/tangwen/Documents/my_projects/wxlittlegame/pkg1/_-1495149767_49.wxapkg_dir/prefab_res")

def parse_jsfile(js_filename,output):
    with open(js_filename,"r") as f:
        contents = f.read()
        ss = jsfile_re.findall(contents)
        result = {}
        for x in ss:
            # result[x[1]] = x[0]
            result[x[0]] = x[1]
        with open(output,"w") as f:
            f.write(json.dumps(result,encoding="utf-8"))


    
def main():
    # pl = {
    #     "aString" : "Doodah",
    #     "aList" : ["A", "B", 12, 32.1, [1, 2, 3]],
    #     "aFloat" : 0.1,
    #     "anInt" : 730
    # }

    # plistlib.writePlist(pl, "hello.plist")

    if len(sys.argv) >= 4:
        png_dir = sys.argv[1]
        json_dir = sys.argv[2]
        dst_dir = sys.argv[3]
        res_type = "plist"
        if len(sys.argv) == 5:
            res_type = sys.argv[4]
        if os.path.exists(dst_dir):
            subprocess.call(["rm","-rf",dst_dir])
        os.makedirs(dst_dir)

        if res_type == "plist":
            json_map = {}
            get_json_map(json_dir,json_map)
            find_imgplist(png_dir,dst_dir,json_map)
        elif res_type == "prefab":
            get_prefab(json_dir,dst_dir)
        elif res_type == "bmfont":
            json_map = {}
            get_json_map(json_dir,json_map,"cc.BitmapFont")
            get_bmfont(png_dir,dst_dir,json_map)
            a =10
        elif res_type == "jsmap":
            jsfile_name = sys.argv[2]
            parse_jsfile(jsfile_name,os.path.join(sys.argv[3],"map.json"))


if __name__ == "__main__":
    # get_prefab_byfilename("part/PartBattleBoom.prefab","/Users/tangwen/Documents/my_projects/wxlittlegame/pkg1/_-1495149767_49.wxapkg_dir/prefab_res")
    main()   
    # test()