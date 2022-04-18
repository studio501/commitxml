# -*- coding: utf-8 -*
import os
import sys, re
import struct
import plistlib

fournum_re = re.compile(r'\{\{(-?\d+\.?\d*),(-?\d+\.?\d*)\},\{(-?\d+\.?\d*),(-?\d+\.?\d*)\}\}')
twonum_re = re.compile(r'\{(-?\d+\.?\d*),(-?\d+\.?\d*)\}')

def next_divide_of_2(x):  
    # return 1 if x == 0 else 2**(x - 1).bit_length()
    return x if x % 2 == 0 else x + 1

def file_extension(path): 
	return os.path.splitext(path)[1] 

def get_num_arr(numre, numstr):
    tr = numre.findall(numstr)
    if len(tr) > 0:
        s = []
        for x in tr[0]:
            s.append(int(float(x)))
        return s

def getByte(len1):
	s = bytearray(len1)
	return bytes(s)


def gen_stringbytes(my_str, capacity=0):
    left = capacity - len(my_str)
    fill = b'\0' * left
    if type(my_str) == str:
        return str.encode(my_str) + fill
    elif type(my_str) == unicode:
        return my_str.encode('utf-8') + fill
        # chars = my_str.encode('utf-8')
        # # e5 88 
        # arr = [hex(ord(c)) for c in chars]
        # # arr = ['%x' % ord(c) for c in chars]
        # a = type(my_str)
        # f = 100


def gen_number_array(num_arr, numberBytes = 2, little_ending = True):
    tlen = len(num_arr)

    if tlen == 0:
        return b""
    result_arr = []
    fmt = "h"

    if numberBytes == 1:
        fmt = "b"
    elif numberBytes == 4:
        fmt = "i"
    
    #  little-ending only
    struct_fmt = "<" if little_ending else ">"

    struct_fmt += fmt + " "

    t_struct = struct.Struct(struct_fmt)

    for x in num_arr:
        result_arr.append(t_struct.pack(x))

    return b''.join(result_arr)

def get_short_num(num):
    return gen_number_array([num])


def parse_plist_path(plist_path):
    res = []
    try:
        
        plistcontents = plistlib.readPlist(plist_path)
        
        frames_dict = plistcontents.get('frames')

        if not frames_dict:
            return

        print("start convert",plist_path)
        
        frames_cnt = len(frames_dict)
        res.append(get_short_num(frames_cnt))

        meta_dict = plistcontents['metadata']
        textureFileName = meta_dict['textureFileName']
        # CCSpriteFrameCache.h 
        # 
        # struct sFileHead
        # {
        #     char texture[128];
        #     short w;
        #     short h;
        # };

        # 注: 此处是硬编码, 为了兼容原格式
        # 原 sizeof(texture) = 128
        # 使用 最后一个byte做为是否含有 vertices 信息的依据
        # 理论上一个128长的string 将会产生错误
        res.append(gen_stringbytes(textureFileName, 127))
        is_format4 = False
        for x in frames_dict:
            pf = frames_dict[x]
            if pf.get("vertices"):
                is_format4 = True
                break
        
        res.append(b'\1' if is_format4 else b'\0')

        sheet_size = get_num_arr(twonum_re, meta_dict['size'])
        res.append(gen_number_array(sheet_size, 2))

        for x in frames_dict:
            pf = frames_dict[x]
            short_arr = []

            # if x == "Effect_0192.png":
            #     a = 100

            frame = get_num_arr(fournum_re, pf['frame'])
            off = get_num_arr(twonum_re, pf['offset'])
            orisize = get_num_arr(twonum_re, pf['sourceSize'])

            short_arr.extend(frame)
            short_arr.extend(off)
            short_arr.extend(orisize)

            res.append(gen_number_array(short_arr, 2))
            rotate = pf['rotated']
            res.append(b'\1' if rotate else b'\0')
            res.append(gen_stringbytes(x, 64))
            # 以上只有81 bytes 无法补齐
            # sizeof(sPlistFileStruct) = 82
            # 所以补一个byte
            res.append(b'\x00')

            # 处理polygon vertices
            if pf.get("vertices"):
                pass

                # suppose vertices num is always the same with verticesUV num
                vertices = pf.get("vertices")
                verticesUV = pf.get("verticesUV")
                triangles = pf.get("triangles")

                v_num = next_divide_of_2(len(vertices))
                v_uv_num = next_divide_of_2(len(verticesUV))
                t_num = next_divide_of_2(len(triangles))

                res.append(gen_number_array([v_num], 2))
                res.append(gen_stringbytes(vertices, v_num))

                res.append(gen_number_array([v_uv_num], 2))
                res.append(gen_stringbytes(verticesUV, v_uv_num))

                res.append(gen_number_array([t_num], 2))
                res.append(gen_stringbytes(triangles, t_num))
            else:
                if is_format4:
                    # vertices, verticesUV, triangles num all 0
                    res.append(gen_number_array([0,0,0], 2))



        contents = b''.join(res)
        
        new_path = plist_path + "f"

        os.remove(plist_path)

        with open(new_path, "wb") as f:
            f.write(contents)
    except Exception as e:
        print("convert faild ", e, "failed file: "+plist_path)
    

def convert_dir(dir_path):
    pass
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.isfile(sourceF):
            if file_extension(f) == ".plist":
                parse_plist_path(sourceF)
        elif os.path.isdir(sourceF):
            convert_dir(sourceF)

def main():
    if len(sys.argv) == 2:
        t_path = sys.argv[1]
        if os.path.isdir(t_path):
            convert_dir(t_path)
        elif os.path.isfile(t_path):
            parse_plist_path(t_path)
    else:
        print(u"usage: python plisttobin.py [plistdir or plistfile]")

if __name__ == "__main__":
    # print(next_divide_of_2(9))
    # parse_plist_path('/Users/mac/Documents/my_projects/cok/client/Android_Resource/Common/Common_lose.plist')
    # a = 100
    main()
