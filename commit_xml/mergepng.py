# -*- coding: utf-8 -*
from __future__ import print_function
from opcode import opname
import sys,os,re,subprocess, time
from turtle import right

from PIL import Image
import numpy as np
import plistlib, hashlib
import argparse

# 需要设置系统变量 'ClientDir' 为指定路径
# ClientDir 	: cok client dir

client_dir = ""


from xml.etree import ElementTree as ET

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 

def file_extension(path): 
	return os.path.splitext(path)[1]

def find_last_number(text):
    return re.search(r'\d+', text[::-1]).group()[::-1]

def get_file_md5(file_path):
    if not os.path.exists(file_path):
        return ''
    m = hashlib.md5()
    data = open(file_path, 'rb').read()
    m.update(data)
    return m.hexdigest()

def rect2bbox(rect):
    left = rect[0]
    upper = rect[1]
    right = left + rect[2]
    bottom = upper + rect[3]
    return (left, upper, right, bottom)

def merge_png(new_image, im1_path, pos):
    board_padding = 2
    shape_padding = 2

    image1 = Image.open(im1_path, 'r').convert('RGBA')
    image1_size = image1.size

    new_image.paste(image1,pos,mask=image1.split()[3])

    # new_image.paste(image1,pos)

    a = 100

def merge2png(im1_path, im2_path):
    pass
    board_padding = 2
    shape_padding = 2

    new_image = Image.new(mode="RGBA", size=(2048, 2048), color=(255, 255, 255, 0))
    image1 = Image.open(im1_path)
    image2 = Image.open(im2_path)
    image1_size = image1.size
    image2_size = image2.size

    new_image.paste(image1,(0,0))
    new_image.paste(image2,(image1_size[0],0))

    new_image.save("test123.png","PNG")

def get_image_size(im1_path):
    image1 = Image.open(im1_path)
    image1_size = image1.size
    return image1_size

def get_meta_dict(textureFileName, sheet_width, sheet_height):
    res = {}
    res["format"] = 2
    res["realTextureFileName"] = textureFileName
    res["size"] = "{{{0},{1}}}".format(sheet_width, sheet_height)
    res["smartupdate"] = ""
    res["textureFileName"] = textureFileName
    return res

def change_path_ext(png_path, ext=".pvr"):
    dir_path = os.path.dirname(png_path)
    bn = os.path.basename(png_path)
    noext = file_without_extension(bn)

    return os.path.join(dir_path, noext + ext)


def ensure_file_exist(file_path):
    if not os.path.exists(file_path):
        with open(file_path, "wb") as f:
            pass

def check_plist(plist_path):
    pass
    plistcontents = plistlib.readPlist(plist_path)

    frames_dict = plistcontents.get('frames')

    res = []
    for f in frames_dict:
        tf = frames_dict[f]
        if not tf.get("vertices"):
            res.append(f)

    return res


def merge_allpngs(new_size, source_dirs, outptbasename="test123", board_padding=2, shape_padding=2, tex_scale=1.0, tex_format = "PVRTC2", checkonece = [False], exclude_list = []):
    
    outpt = outptbasename + ".png"

    outpt = os.path.join(os.path.dirname(source_dirs), outpt)

    text_ext = ".png"

    plistFileName = change_path_ext(outpt, ".plist") #"test.plist"

    # texture_formats = ["PNG","PVRTC2","PVRTC4","PVRTC2CCZ","PVRTC4CCZ","ETC1"]
    if tex_format == "PVRTC2" or tex_format == "PVRTC4":
        text_ext = ".pvr"
    elif tex_format == "PVRTC2CCZ" or tex_format == "PVRTC4CCZ":
        text_ext = ".pvr.ccz"
        tex_format = "PVRTC2" if tex_format == "PVRTC2CCZ" else "PVRTC4"
    elif tex_format == "ETC1":
        text_ext = ".pkm"

    pvr_output = change_path_ext(outpt, text_ext)

    # get one image size
    unified_size = (0, 0)

    png_list = []
    quad_list = []
    for f in os.listdir(source_dirs):
        sourceF = os.path.join(source_dirs,f)
        if os.path.isfile(sourceF) and file_extension(f) == ".png":
            if f in exclude_list:
                pass
                quad_list.append([int(find_last_number(f)), sourceF])
            else:
                png_list.append([int(find_last_number(f)), sourceF])
                if unified_size[0] == 0 and unified_size[1] == 0:
                    unified_size = get_image_size(sourceF)
                else:
                    ts = get_image_size(sourceF)
                    if ts[0] != unified_size[0] or ts[1] != unified_size[1]:
                        print(sourceF, "image size is invalid ",ts, "should be", unified_size)
                        sys.exit(1)
    
    # sort by number oreder
    png_list.sort(key=lambda m : m[0])

    sheet_width = new_size[0]
    sheet_height = new_size[1]

    image_width = unified_size[0]
    image_height = unified_size[1]

    max_image_ocupy_width = image_width + 2* shape_padding + board_padding
    max_image_ocupy_height = image_height + 2* shape_padding + board_padding

    col_num_odd = int(sheet_width / max_image_ocupy_width)
    col_num_even = int( (sheet_width - image_width / 2 - 2* shape_padding) / max_image_ocupy_width)
    raw_num = int(sheet_height / (max_image_ocupy_height / 2))

    even_start_x = board_padding / 2 + image_width / 2


    new_image = Image.new(mode="RGBA", size=(sheet_width, sheet_height), color=(255, 255, 255, 0))

    t_sum = 0
    stop_flag = False

    plist_dict = {}

    textureFileName = os.path.basename(pvr_output) #"test.pvr"

    plist_dict["metadata"] = get_meta_dict(textureFileName, sheet_width, sheet_height)
    frames = {}
    plist_dict["frames"] = frames

    max_py = 0
    for i in range(raw_num):
        is_odd = i % 2 == 0
        tcol_num =  col_num_odd if is_odd else col_num_even
        for j in range(tcol_num):
            if t_sum >= (len(png_list) - 0):
                stop_flag = True
                break
            frame_name = os.path.basename(png_list[t_sum][1])

            px = shape_padding + (0 if is_odd else even_start_x) + ( shape_padding + image_width + board_padding) * j
            py = shape_padding + (image_height / 2 + shape_padding + board_padding/2) * i

            max_py = py + image_height + shape_padding

            merge_png(new_image, png_list[t_sum][1], (px, py))

            t_frame = {}
            t_frame["frame"] = "{{{{{0},{1}}},{{{2},{3}}}}}".format(px,py,image_width,image_height)
            t_frame["offset"] = "{{{0},{1}}}".format(0,0)
            t_frame["rotated"] = False
            t_frame["sourceColorRect"] = "{{{{{0},{1}}},{{{2},{3}}}}}".format(0,0,image_width,image_height)
            t_frame["sourceSize"] = "{{{0},{1}}}".format(image_width,image_height)
            frames[frame_name] = t_frame
            t_sum += 1
        if stop_flag:
            break

    if len(quad_list) > 0:
        pass
        PRECISION = 10
        quad_list.sort(key=lambda m : m[0])
        for i, v in enumerate(quad_list):
            j = i % col_num_odd
            ti = int(i / col_num_odd)
            frame_name = os.path.basename(quad_list[i][1])
            px = shape_padding + (0) + ( shape_padding + image_width + board_padding) * j
            py = max_py + (image_height + shape_padding ) * ti

            merge_png(new_image, quad_list[i][1], (px, py))

            t_frame = {}
            t_frame["frame"] = "{{{{{0},{1}}},{{{2},{3}}}}}".format(px,py,image_width,image_height)
            t_frame["offset"] = "{{{0},{1}}}".format(0,0)
            t_frame["rotated"] = False
            t_frame["sourceColorRect"] = "{{{{{0},{1}}},{{{2},{3}}}}}".format(0,0,image_width,image_height)
            t_frame["sourceSize"] = "{{{0},{1}}}".format(image_width,image_height)

            t_frame["triangles"] = "0 1 2 3 2 1"
            x1 = 0
            x2 = x1 + image_width

            y1 = 0
            y2 = y1 + image_height


            pts = [x1,y1,x2,y1,x1,y2,x2,y2]
            uvs = []

            for pi in range(0, len(pts), 2):
                lu = int((px + pts[pi + 0]))
                lv = int((py + (image_height - pts[pi + 1])))
                uvs.append(lu)
                uvs.append(lv)

            t_frame["vertices"] = " ".join([str(i * PRECISION) for i in pts])
            t_frame["verticesUV"] = " ".join([str(i) for i in uvs])

            frames[frame_name] = t_frame

    if os.path.exists(outpt):
        os.remove(outpt)
        time.sleep(0.5)
    
    new_image.convert("P").save(outpt,"PNG")
    md5_str = get_file_md5(outpt)

    plist_dict["metadata"]["smartupdate"] = "$TexturePacker:SmartUpdate:{0}:1/1$".format(md5_str)
    plistlib.writePlist(plist_dict, plistFileName)


    time.sleep(0.5)

    if tex_format != "PNG":
        ensure_file_exist(pvr_output)

        if tex_format == "ETC1":
            etc_bin = os.path.join(client_dir,"CCB/IF/bin")
            etc_color = outpt

            etc_alpha = change_path_ext(etc_color, "_alpha.pkm")
            etc_alpha_png = change_path_ext(etc_color, "_alpha.png")
            ensure_file_exist(etc_alpha)

            filePWD = os.path.dirname(etc_color)
            drop_plist = os.path.join(filePWD, "drop.plist")
            os.chdir(etc_bin)

            os.system('TexturePacker --texture-format png --png-opt-level 0 --opt ALPHA  --size-constraints AnySize --disable-rotation --border-padding 0  --no-trim --sheet {0} --data {1} {2}'.format(etc_alpha_png, drop_plist, etc_color))

            os.system('./etcpack {0} {1} -c etc1'.format(etc_color, filePWD))
            os.system('./etcpack {0} {1} -c etc1'.format(etc_alpha_png, filePWD))

            os.system('rm -rf {0}'.format(etc_alpha_png))
            os.system('rm -rf {0}'.format(drop_plist))
        else:
            drop_plist = "no_use.plist"
            # gen png to pvr
            cmd_list = ['TexturePacker','--opt',tex_format,"--force-squared", "--shape-padding", "0", "--border-padding", "0", "--extrude", "0", "--disable-rotation", "--trim-mode", "None", "--sheet", pvr_output, outpt, "--data", drop_plist]
            subprocess.call(cmd_list)
            os.system('rm {0}'.format(drop_plist))

    # gen polygon plist
    convertToolPath = os.path.join(client_dir,"CCB/IF/convert2polygonPlist")
    # convertToolPath = "/Users/mac/Documents/my_projects/cok/client/CCB/IF/convert2polygonPlist"
    subprocess.call([convertToolPath, "-p", os.path.abspath(plistFileName),"-i",source_dirs, "-s", str(tex_scale), "-m", "128"])

    # plist check, all readjust pos image should have vertex information, or we should reposition to backward
    if not checkonece[0]:
        checkonece[0] = True
        el = check_plist(plistFileName)
        if len(el) > 0:
            merge_allpngs(new_size,source_dirs,outptbasename,board_padding,shape_padding,tex_scale,tex_format,checkonece,el)

    a = 100

def remove_alltile(doc_tile):
    ys = doc_tile.findall("tile")
    for y in ys:
        doc_tile.remove(y)

def gen_onetile(gid, filename):
    tile = ET.Element('tile')
    tile.set("id", str(gid))
    properties = ET.SubElement(tile, 'properties')
    fn_property = ET.SubElement(properties, 'property')
    
    tile.tail = "\n "
    tile.text = "\n "
    properties.tail = "\n "
    properties.text = "\n "
    fn_property.tail = "\n "

    fn_property.set("name", "fn")
    fn_property.set("value", filename)

    return tile


def update_tiledxml(tmx_path, plist_path):

    plist_bn = os.path.basename(plist_path)

    plist_bn = file_without_extension(plist_bn)

    plistcontents = plistlib.readPlist(plist_path)
        
    frames_dict = plistcontents.get('frames')

    doc = ET.parse(tmx_path).getroot()

    tileSets = doc.findall("tileset")

    had_changed = False

    for x in tileSets:
        image_src = x.findall("image")

        src_bn = file_without_extension(image_src[0].attrib["source"])

        if src_bn == plist_bn:

            had_changed = True

            remove_alltile(x)

            t_cnt = 0
            for f, v in sorted(frames_dict.items()):
                tile1 = gen_onetile(t_cnt, f)
                x.append(tile1)
                t_cnt += 1
            break

    if had_changed:
        new_contents = ET.tostring(doc)
        with open(tmx_path, "w") as f:
            f.write(new_contents)

        z = 100

    a = 100

def main():
    
    global client_dir
    client_dir = os.getenv('ClientDir')

    if not client_dir or client_dir == "":
        print("please specify cok client dir as enviroment variable as ClientDir")
        return

    texture_formats = ["PNG","PVRTC2","PVRTC4","PVRTC2CCZ","PVRTC4CCZ","ETC1"]

    parser = argparse.ArgumentParser(description='Usage of mergepng.py.')

    parser.add_argument('-pngdirs','--pngdirs',help='specify raw png dir.')
    parser.add_argument('-o','--output',help='specify output name(no file extension).')
    parser.add_argument('-sw','--sheetwidth',help='texture sheet width defalut 2048pixel',default=2048,type=int)
    parser.add_argument('-sh','--sheetheight',help='texture sheet height defalut 2048pixel',default=2048,type=int)
    parser.add_argument('-sp','--shapepadding',help='shape padding default 2pixel',default=2,type=int)
    parser.add_argument('-bp','--boardpadding',help='board padding default 2pixel',default=2,type=int)
    parser.add_argument('-s','--scale',help='texture scale',default=1,type=float)
    parser.add_argument('-xml','--xmlfile',help='specify tmx file for auto add fn property')
    parser.add_argument('-plist','--plistfile',help='specify plist file for auto add fn property')
    parser.add_argument('-format','--format',help='specify output texture format',choices = texture_formats, default="PVRTC2")

    args = parser.parse_args()

    if args.xmlfile and args.plistfile:
        update_tiledxml(args.xmlfile, args.plistfile)
    elif args.pngdirs and args.output:
        checkonce = [False]
        merge_allpngs((args.sheetwidth, args.sheetheight), args.pngdirs, args.output, args.boardpadding, args.shapepadding, args.scale, args.format, checkonce)
    pass

if __name__ == "__main__":
    # example cmd for merge all png:
    # python mergepng.py -sw 2048 -sh 2048 -pngdirs /Users/mac/Downloads/111/World_1 -o eight_kingdom_map_1 -s 0.99 -format ETC1

    # example cmd for auto add fn properties:
    # python mergepng.py -xml /Users/mac/Downloads/111/eight_kingdom_map.tmx -plist /Users/mac/Downloads/111/eight_kingdom_map_1.plist

    # merge_allpngs((2048, 2048), "/Users/mac/Downloads/111/World_2","eight_kingdom_map_2",2,2,0.99,"PVRTC4")

    # check_plist("/Users/mac/Downloads/111/eight_kingdom_map_2.plist")
    main()