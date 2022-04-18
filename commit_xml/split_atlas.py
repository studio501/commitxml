# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils
import shutil

import argparse,time

Num_re = re.compile(r'\d+')

def get_preve_name(png_name, dec):
    la = find_last_number(png_name)
    tlen = len(la)
    it = int(la)
    it -= dec
    ft = '{{:0{0}d}}'.format(tlen)
    it = ft.format(it)
    png2 = png_name.replace(la, it)
    return png2

def find_last_number(text):
    return re.search(r'\d+', text[::-1]).group()[::-1]

def find_beforelast_number(text):
    a = re.search(r'\d+', text[::-1])
    b = a.regs[0][1]
    c = text[::-1][b:][::-1]
    return c

def find_afterlast_number(text):
    a = re.search(r'\d+', text[::-1])
    b = a.regs[0][0]
    c = text[::-1][:b][::-1]
    return c

def get_number(str_num):
    res = Num_re.findall(str_num)
    if len(res) == 1:
        r = int(res[0])
        return r

def get_filebase_prefix(png_name):
    return png_name.split('_')[0]


def parse_block(line_arr):
    prefix = get_filebase_prefix(line_arr[0])
    return {
        "prefix": prefix,
        "lines": line_arr
    }

def parse_atlasfile(file_path):
    if os.path.isdir(file_path):
        all_atlas = []
        for f in os.listdir(file_path):
            sourceF = os.path.join(file_path,f)
            if f.endswith('.atlas'):
                all_atlas.append(sourceF)
        
        if len(all_atlas) == 1:
            # just convert one atlas file
            file_path = all_atlas[0]
        else:
            print('has multi atlas file and return.')
            return

    file_base = os.path.basename(file_path)
    prestr = find_beforelast_number(file_base)
    after_numberpost = find_afterlast_number(file_base)

    dir_name = os.path.dirname(file_path)
    lines = myutils.get_file_lines(file_path)

    head_len = 4
    block_len = 7

    head = lines[:head_len]

    cnt = 0
    temp = None
    all_blocks = {}
    shader_name = "yz"

    yz_block = None
    for i, line in enumerate(lines):
        if i < head_len:
            continue
        
        if not temp:
            temp = []
        
        temp.append(line)

        cnt += 1
        if cnt == block_len:
            t_block = parse_block(temp)
            prefix = t_block["prefix"]
            if not yz_block and prefix == shader_name:
                yz_block = t_block
            
            if not all_blocks.get(prefix):
                all_blocks[prefix] = []
                all_blocks[prefix].extend(head)
            
            all_blocks[prefix].extend(temp)
            temp = []
            cnt = 0
    
    # tl = len(all_blocks)

    for prefix in all_blocks:
        if prefix != shader_name:
            lines = all_blocks[prefix]
            lines.extend(yz_block["lines"])
            tf = os.path.join(dir_name, '{0}{1}{2}'.format(prestr,get_number(prefix),after_numberpost))
            myutils.write_file_lines(tf,lines)

    # sk_monster_yeren1_face
    a = 100

def decpng_fromjson(json_file, png_list, dec):
    pass
    json_data = myutils.get_jsonfrom_file(json_file)
    for i, e in enumerate(png_list):
        decpng_fromjson_(json_data, e[1], dec)
    
    myutils.write_dict_tofile(json_file,json_data)

def decpng_fromjson_(json_data, png_name, dec):

    # slots
    for i, e in enumerate(json_data['slots']):
        if e['name'] == png_name:
            json_data['slots'].pop(i)
            break
    
    # skins default
    default_skin = json_data['skins']['default']
    default_skin.pop(png_name, None)

    # animations
    for key in json_data['animations']:
        ani = json_data['animations'][key]
        ani_slots = ani['slots']
        if ani_slots.get(png_name):
            attachment = ani_slots[png_name]["attachment"]
            if len(attachment) > 1:
                prev_name = get_preve_name(png_name, dec)
                # transfer time to last frame
                ani_slots[prev_name]["attachment"][-1]["time"] = ani_slots[png_name]["attachment"][-1]["time"]

            ani_slots.pop(png_name, None)

def dec_bynum(arr, dec):
    arr_len = len(arr)

    trave_idx = 0
    temp = []
    for i in range(0, arr_len, 1 + dec):
        trave_idx = i
        temp.append(i)
    
    if trave_idx != arr_len - 1:
        temp.append(arr_len - 1)

    del_elements = []
    for i, e in enumerate(arr):
        if not i in temp:
            del_elements.append(e)
    
    return del_elements

def dec_frame(in_dir, json_file, prefix, dec = 1):
    pass
    all_pngs = []
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF) and f.endswith('.png') and f.count(prefix) == 1:
            bf = myutils.file_without_extension(f)
            all_pngs.append([int(find_last_number(bf)), bf])

    all_pngs.sort(key=lambda x: x[0])

    deleted_pngs = dec_bynum(all_pngs, dec)

    # json_data = myutils.get_jsonfrom_file(json_file)
    decpng_fromjson(json_file, deleted_pngs, dec)

    # delete png
    for i, e in enumerate(deleted_pngs):
        dst_f = os.path.join(in_dir, e[1] + '.png')
        os.remove(dst_f)

    a = 100

def delete_yz(in_dir, yz_file="yz_0_.png"):
    had_keep_one = False
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isdir(sourceF):
            for f1 in os.listdir(sourceF):
                sourceF1 = os.path.join(sourceF,f1)
                if os.path.isfile(sourceF1) and sourceF1.endswith('.png') and f1 == "yz_0_.png":
                    if not had_keep_one:
                        had_keep_one = True
                    else:
                        # just delte the file
                        os.remove(sourceF1)

def main():
    parser = argparse.ArgumentParser(description='Usage of split_atlas.py.')

    parser.add_argument('-jf','--jsonfile',help='specify one json file.')
    parser.add_argument('-af','--atlasfile',help='specify one atlas file.')
    parser.add_argument('-dir','--pngdir',help='specify png dir.')
    parser.add_argument('-dec','--decframe',help='specify frame num to dec.',default=1,type=int)
    parser.add_argument('-pngprefix','--pngprefixname',help='specify dec prefix of png name.')
    parser.add_argument('-t','--test',help='test sample.',default=True,type=bool)
    parser.add_argument('-delfile','--deletefile',help='delete same file.')
    parser.add_argument('-deltardir','--deletetargetdir',help='delete same file in the dir.')
    
    parser.add_argument('-dfb','--decframebatch',help='dec frame batch.')
    parser.add_argument('-n','--number',help='dec frame batch.')
    parser.add_argument('-imgstr','--imagestr',help='dec frame batch.')
    parser.add_argument('-jstr','--jsonstr',help='dec frame batch.')
    parser.add_argument('-pstr','--pngprestr',help='dec frame batch.')
    parser.add_argument('-ak','--animakeys',help='dec frame batch.')

    args = parser.parse_args()
    if args.jsonfile:
        dec_frame(args.pngdir,args.jsonfile,args.pngprefixname,args.decframe)
    if args.decframebatch:
        dec_frame_batch(args.decframebatch,args.imagestr,args.jsonstr,args.pngprestr,args.number,args.decframe, args.animakeys)
    elif args.atlasfile:
        parse_atlasfile(args.atlasfile)
    elif args.deletetargetdir:
        delete_yz(args.deletetargetdir,args.deletefile)
    elif args.test:
        test()
    pass

def dec_frame_batch(dir_path, imagestr, jsonstr, pngprestr, num, dec, animakeys=''):
    if animakeys == '':
        return
    images = dir_path +  '/' + imagestr + '{0}'
    jsons = dir_path + '/' + jsonstr + '{0}.json'

    pngpre = pngprestr + '{0}_{1}'
    tg = animakeys.split(' ')
    for i in range(int(num)):
        for k, ke in enumerate(tg):
            dec_frame(images.format(i+1),jsons.format(i+1),pngpre.format(i+1, ke),dec)
            time.sleep(0.1)


def test():
    pass
if __name__ == "__main__":
    main()