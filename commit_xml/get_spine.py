import subprocess
import os,sys,shutil,re
import imghdr,json,zipfile,plistlib,biplist
from PIL import Image

size_re = re.compile(r'size:\s* (\d+)\s*,\s*(\d+)')
same_name_dir = 0

fc = [
]

def get_png_size(file_name):
    im = Image.open(file_name)
    return im.size

def file_extension(path): 
	return os.path.splitext(path)[1]

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 

def is_filter_extension(f):
    pass
    for x in fc:
        if x in f:
            return True
    return False

def is_json_file(f):
    try:
        with open(f,'r') as load_f:
            load_dict = json.load(load_f,"utf-8")
            return load_dict
    except Exception as e:
        return False
    else:
        return False

def write_atlas_file(file_str,file_name):
    
    lines = file_str.split(r'\n')
    with open(file_name,'w') as f:
        for line in lines:
            f.write('\n' if line =='"' else line + '\n')

        return [lines[1],lines[2]]


def write_sp_file(file_str,file_name):
    with open(file_name,'w') as f:
        f.write(file_str)

def is_num_equal(num1,num2):
    return abs(num2 - num1) < 2

def is_size_equal(size1,size2):
    return is_num_equal(int(size1[0]),int(size2[0])) and is_num_equal(int(size1[1]),int(size2[1]))

def find_relative_png(json_data,atlas_data,dir_path):
    texture_uuid_prefix = json_data["textures"][0]["__uuid__"][:2]
    texture_size = size_re.sub(r'\1 \2',atlas_data[1]).split(' ')

    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.isfile(sourceF) and file_extension(f) == ".png":
            bf = os.path.basename(f)
            file_prefix = "res-raw-assets-{0}-".format(texture_uuid_prefix)
            if file_prefix in bf:
                file_size = get_png_size(sourceF)
                if is_size_equal(texture_size,file_size):
                    return sourceF
        elif os.path.isdir(sourceF):
            return find_relative_png(json_data,atlas_data,sourceF)

def find_spine(sourceDir,dstDir):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(sourceF)
            if is_filter_extension(bf):
                continue
            
            if file_extension(sourceF) == ".json":
                json_data = is_json_file(sourceF)
                if json_data and type(json_data) is dict:
                    if json_data.get("__type__") and json_data["__type__"] == "sp.SkeletonData":
                        pass
                        file_base_name = file_without_extension(f)
                        os.makedirs(os.path.join(dstDir,file_base_name))
                        # json.dumps(json_data["_skeletonJson"],encoding="utf-8") _atlasText
                        atlas_data = write_atlas_file(json.dumps(json_data["_atlasText"],encoding="utf-8"),os.path.join(dstDir,file_base_name,file_base_name + ".atlas"))
                        spine_name = file_without_extension(atlas_data[0])
                        shutil.move(os.path.join(dstDir,file_base_name,file_base_name + ".atlas"),os.path.join(dstDir,file_base_name,spine_name + ".atlas"))
                        find_png = find_relative_png(json_data,atlas_data,sourceDir)
                        write_sp_file(json.dumps(json_data["_skeletonJson"],encoding="utf-8"),os.path.join(dstDir,file_base_name,spine_name + ".json"))
                        shutil.copy(find_png, os.path.join(dstDir,file_base_name,atlas_data[0]))

                        dst_dir = os.path.join(dstDir,spine_name)
                        if os.path.exists(dst_dir):
                            global same_name_dir
                            same_name_dir = same_name_dir + 1
                            dst_dir = dst_dir + str(same_name_dir)
                        os.rename(os.path.join(dstDir,file_base_name),dst_dir)

        elif os.path.isdir(sourceF):
            find_spine(sourceF,dstDir)



def find_spine_withfilename(sourceDir,dstDir,originSrcDirLen):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(sourceF)
            if file_extension(sourceF) == ".json":
                if not bf in ["scene_14.json","scene_16.json","scene_17.json"]:
                    continue
                relative_dir = sourceDir[originSrcDirLen+1:]
                json_data = is_json_file(sourceF)
                if json_data and type(json_data) is dict:
                    if json_data.get("__type__") and json_data["__type__"] == "sp.SkeletonData":
                        pass
                        file_base_name = file_without_extension(f)
                        print("start save {0}".format(file_base_name))
                        # find_png = os.path.join(sourceDir,file_base_name+".png")
                        textureName = json_data["textureNames"][0]
                        find_png = os.path.join(sourceDir,textureName)
                        if os.path.exists(find_png):
                            tmpDir = dstDir
                            if relative_dir != "":
                                tmpDir = os.path.join(dstDir,relative_dir)
                                try:
                                    subprocess.call(['mkdir','-p',tmpDir])
                                except Exception as e:
                                    tmpDir = dstDir
                                    pass
                            os.makedirs(os.path.join(tmpDir,file_base_name))
                            # json.dumps(json_data["_skeletonJson"],encoding="utf-8") _atlasText
                            atlas_name = file_base_name + ".atlas"
                            atlas_data = write_atlas_file(json.dumps(json_data["_atlasText"],encoding="utf-8"),os.path.join(tmpDir,file_base_name, atlas_name))
                            spine_name = file_base_name
                            # file_without_extension(atlas_data[0])
                            # shutil.move(os.path.join(tmpDir,file_base_name,atlas_name),os.path.join(tmpDir,file_base_name,spine_name + ".atlas"))
                        
                            write_sp_file(json.dumps(json_data["_skeletonJson"],encoding="utf-8"),os.path.join(tmpDir,file_base_name,spine_name + ".json"))
                            shutil.copy(find_png, os.path.join(tmpDir,file_base_name,textureName))
                            print("save {0} successful".format(file_base_name))
                            # dst_dir = os.path.join(tmpDir,spine_name)
                            # if os.path.exists(dst_dir):
                            #     global same_name_dir
                            #     same_name_dir = same_name_dir + 1
                            #     dst_dir = dst_dir + str(same_name_dir)
                            # os.rename(os.path.join(tmpDir,file_base_name),dst_dir)

        elif os.path.isdir(sourceF):
            find_spine_withfilename(sourceF,dstDir,originSrcDirLen)

def try_create_dir(dst):
	pass
	if not os.path.exists(dst):
		os.makedirs(dst)

def unzip_to(zf,dst_dir):
    try_create_dir(dst_dir)
    with zipfile.ZipFile(zf, 'r') as zip_ref:
        zip_ref.extractall(dst_dir)

def test():

    json_data = is_json_file("/Users/mac/Documents/decompile/wx_littlegame/wxanewfiles/acce0ff4e31734d43cb5974cb575d451/gamecaches/res-import-14-142b4f18-987c-4123-b731-8144d4cedefd.001ca.json")
    altas_str = json.dumps(json_data["_atlasText"],encoding="utf-8")
    file_name = "/Users/mac/Documents/decompile/wx_littlegame/wxanewfiles/acce0ff4e31734d43cb5974cb575d451/512_512/test.atlas"
    atlas_data = write_atlas_file(altas_str,file_name)
    # dst_dir = "/Users/mac/Documents/decompile/wx_littlegame/wxanewfiles/acce0ff4e31734d43cb5974cb575d451/gamecaches"
    # find_png = find_relative_png(json_data,atlas_data,dst_dir)

    # file_name = "/Users/mac/Documents/decompile/wx_littlegame/wxanewfiles/acce0ff4e31734d43cb5974cb575d451/512_512/test.json"
    # ss = json.dumps(json_data["_skeletonJson"],encoding="utf-8")
    # write_sp_file(json.dumps(json_data["_skeletonJson"],encoding="utf-8"),file_name)

    
    abcd = 100

    
def main():
    if len(sys.argv) >= 3:
        src_dir = sys.argv[1]
        dst_dir = sys.argv[2]
        if os.path.exists(dst_dir):
            subprocess.call(["rm","-rf",dst_dir])
        os.makedirs(dst_dir)

        use_name_alreay_ok = False
        if len(sys.argv) == 4:
            use_name_alreay_ok = sys.argv[3] == "1"

        if use_name_alreay_ok:
            find_spine_withfilename(src_dir,dst_dir,len(src_dir))
        else:
            find_spine(src_dir,dst_dir)
        a = 100


if __name__ == "__main__":
    main()   
    # test()