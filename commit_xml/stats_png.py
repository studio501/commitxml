#!python   
import os,sys,shutil,re
import json,plistlib
from PIL import Image
from collections import OrderedDict

Size_re = re.compile(r'\{\{\d+,\d+\},\{(\d+),(\d+)\}\}')

def get_png_size(file_name):
    im = Image.open(file_name)
    return im.size

def check_imag(img):
    img = Image.open(img)
    count = 0
    pixel_arr = []
    for y in range(img.height):
        for x in range(img.width):
            pixel = img.getpixel((x, y))
            if not pixel in pixel_arr:
                pixel_arr.append(pixel)
                count += 1
    return count

def file_extension(path): 
	return os.path.splitext(path)[1]

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 

def find_with_size(t,size_config):
    for x in t:
        if x["width"] == size_config[0] and x["height"] == size_config[1]:
            return x
    return False

def stats_file(file_path,json_map):
    if file_extension(file_path) == ".plist":
        pass
        bf = file_without_extension(file_path)
        data = plistlib.readPlist(file_path)
        size_arr = []
        t = {"count":0,"size_arr":size_arr,"name":bf}
        
        for x in data["frames"]:
            t["count"] += 1
            tf = data["frames"][x]
            size = Size_re.findall(tf["frame"])[0]
            # json.loads(tf["frame"].split(',')[1][1:-2].split(','))
            preve_v = find_with_size(size_arr,size)
            if preve_v:
                preve_v["count"] += 1
            else:
                size_arr.append({"width":size[0],"height":size[1],"count":1})
        
        size_arr.sort(key =lambda t: int(t["count"]),reverse=True)
        json_map.append(t)
    elif file_extension(file_path) == ".atlas":
        pass

def stats_spine(file_path,size_arr):
    if file_extension(file_path) == ".png":
        bf = file_without_extension(file_path)
        size = get_png_size(file_path)
        preve_v = find_with_size(size_arr,size)
        if preve_v:
            preve_v["count"] += 1
        else:
            size_arr.append({"width":size[0],"height":size[1],"count":1})

def look_dir(sourceDir,json_map):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            stats_file(sourceF,json_map)
        elif os.path.isdir(sourceF):
            look_dir(sourceF,json_map)

def look_spine_dir(sourceDir,json_map):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            stats_spine(sourceF,json_map)
        elif os.path.isdir(sourceF):
            look_spine_dir(sourceF,json_map)

if __name__ == '__main__':  
    # s = check_imag("/Users/mac/Downloads/_-1495149767_49.wxapkg_dir/image_res/icon_equip2/icon_equip/equip_301.png")
    # s1 = check_imag("/Users/mac/Downloads/_-1495149767_49.wxapkg_dir/image_res/icon_equip2/icon_equip/equip_302.png")
    # s2 = check_imag("/Users/mac/Downloads/_-1495149767_49.wxapkg_dir/image_res/icon_equip2/icon_equip/equip_303.png")

    currtenPath = "/Users/mac/Documents/my_projects/creator_proj/some_component/client/assets"
    res = []
    look_dir(currtenPath,res)
    with open("ui_stats.json","w") as f:
        f.write(json.dumps(res,"utf-8"))

    # spine_res = []
    # look_spine_dir("/Users/mac/Downloads/_-1495149767_49.wxapkg_dir/spine_res",spine_res)
    # with open("spine_stats2.json","w") as f:
    #     f.write(json.dumps(spine_res,"utf-8"))
    a = 100