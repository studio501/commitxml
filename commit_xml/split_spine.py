# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils
import math
import shutil
import mygui
import psutil

from PIL import Image
import numpy as np

Custom_post_fix = "-_-GR-_-"

OneFrameTime = float(1/30.0)

def raise_error(msg):
    print(u'Error:', msg)

def idx2char(index):
    return '_%02d' % index

def get_packed_name(in_file_bn, act_name = None):
    bn = myutils.file_without_extension(os.path.basename(in_file_bn))
    if bn[-1] == '_':
        bn = bn[:-1]

    arr = bn.split('_')
    head = arr[:-1]
    tail = arr[-1:]
    no_ext = myutils.file_without_extension(tail[0])
    if no_ext[-1] != '_':
        no_ext += '_'
    
    prefix = act_name if act_name else ''.join(head)
    res = '{0}_{1}.png'.format(prefix,no_ext)

    return res

def find_last_number(text):
    return re.search(r'\d+', text[::-1]).group()[::-1]

def get_gridname(idx, file_name):
    pass
    # num_infile = find_last_number(file_name) or "00"
    # if (row + col > 2) and (row + col < 5):
    #     desc = None
    #     if row == 1 and col == 2:
    #         desc = ['LE','RI']
    #     elif row == 2 and col == 1:
    #         desc = ['UP','DO']
    #     else:
    #         desc = ['TL','TR','BL','BR']
        
    #     return '{0}_{1}_{2}_.png'.format(act_name, desc[idx], num_infile)
    # else:
    no_ext = myutils.file_without_extension(file_name)
    post_fix = Custom_post_fix
    return '{0}{1}{2}.png'.format(no_ext, post_fix, idx)

def insert_dr2name(file_name, dr):
    bn = myutils.file_without_extension(os.path.basename(file_name))
    if bn[-1] == '_':
        bn = bn[:-1]
    arr = bn.split('_')
    head = arr[:-1]
    head = ''.join(head) + "_" + dr
    return [get_packed_name(file_name, head), head]

def recalc_cenrter(rect1, rect2, center1):
    sx = center1[0]
    sy = center1[1]

    sxx = float(rect1[2] * sx - rect2[0]) / float(rect2[2])
    syy = float(rect1[3] * sy - rect2[1]) / float(rect2[3])
    return [sxx, syy]

def get_trim_size(in_file):
    im = Image.open(in_file)
    box_size = bbox(im)
    return im.crop(box_size).getbbox()[2:]

def get_trim_size_4grid(in_file):
    im = Image.open(in_file)
    bm = bbox(im)
    im2 = im.crop(bm)

    box_size = im2.size
    # box_size = [box_size[2] - box_size[0], box_size[3] - box_size[1]]

    row1 = int(math.ceil(box_size[1] / float(2.0)))
    col1 = int(math.ceil(box_size[0] / float(2.0)))

    t_size = 0
    split_cfg = [
        (0,0,col1,row1),
        (col1,0,box_size[0],row1),
        (0,row1,col1,box_size[1]),
        (col1,row1,box_size[0],box_size[1]),
    ]
    for x in split_cfg:
        im3 = im2.crop(x)
        im4 = im3.crop(bbox(im3))
        i3_1 = im4.size
        t_size += i3_1[0] * i3_1[1]

    return t_size

def trim_png_rowcol(in_file,out_file,split_config):
    b_name = os.path.basename(in_file)
    out_dir = os.path.dirname(out_file)

    im = Image.open(in_file)
    ori_size = im.size  # (364, 471)
    # box_size = bbox(im)  # (64, 89, 278, 267)
    # im2 = im.crop(bbox(im))

    im2 = im

    im2_size = im2.size  # (214, 178)

    row_height = split_config[0]
    col_width = split_config[1]

    row_num = int(math.ceil(im2_size[1] / float(row_height)))
    col_num = int(math.ceil(im2_size[0] / float(col_width)))
    
    for i in range(row_num):
        for j in range(col_num):
            #  (left, upper, right, lower)
            box = (j * col_width, i * row_height, min((j+1)*col_width, im2_size[0]), min((i + 1) * row_height, im2_size[1]))
            im3 = im2.crop(box)
            t_name = get_gridname(i * col_num + j,b_name)
            im3.save(os.path.join(out_dir,t_name))
    a = 100

def get_png_center(in_file):
    im = Image.open(in_file)
    ori_size = im.size

    box_size = bbox(im)

    tw = (box_size[0] + (box_size[2] - float(box_size[0])) / 2.0 ) / float(ori_size[0])
    th = (box_size[1] + (box_size[3] - float(box_size[1])) / 2.0 ) / float(ori_size[1])
    return (tw, th)

def direction2_vec2(direction):
    if direction == 'UL':
        return [-1, 1]
    elif direction == 'UR':
        return [1, 1]
    elif direction == 'DL':
        return [-1, -1]
    elif direction == 'DR':
        return [1, -1]
    elif direction == 'Center':
        return [-1, -1]

def write_2json_(ret_dict, name, size, direction, bone, idx ,lastone=False, dec_frame=0):
    if ret_dict['bones'] is None:
        return
    if ret_dict['slots'] is None:
        return
    if ret_dict['skins'] is None or ret_dict['skins']['default'] is None:
        return

    slots = ret_dict['slots']
    skins = ret_dict['skins']['default']
    animation = ret_dict['animations']['animation']

    find_l = [x for x in slots if x["name"]  == bone][:1]
    # prev_slot = next(x for x in slots if x["name"]  == bone)

    if len(find_l) == 0:
        ret_dict['bones'].append({
            "name": bone,
            "parent": "ctr"
        })

        slots.append({
            "name": bone,
            "bone": bone
        })

        skins[bone] = {}

        animation["slots"][bone] = {
            "attachment": []
        }

    hw = round(size[0] / float(2.0), 1)
    hh = round(size[1] / float(2.0), 1)
    vec2 = direction2_vec2(direction)

    # slot = {
    #     'name' : name,
    #     'bone' : 'root',
    #     'attachment' : 'name'
    # }

    skin = {
        'x': hw * vec2[0],
        'y': hh * vec2[1],
        'width': size[0],
        'height': size[1],
    }

    # slots.append(slot)
    skins[bone][name] = skin

    ss = idx * OneFrameTime
    animation["slots"][bone]["attachment"].append({"time":idx * OneFrameTime,"name":name})
    if lastone:
        animation["slots"][bone]["attachment"].append({"time":(idx + (dec_frame + 1)) * OneFrameTime,"name":None})

def trim_png_withcenter(in_file,center,idx=0,deleteOld=False,out_dict=None,lastone=False,dec_frame=0):
    b_name = os.path.basename(in_file)
    out_dir = os.path.dirname(in_file)

    tw = center[0]
    th = center[1]

    im = Image.open(in_file)
    ori_size = im.size  # (364, 471)

    row1 = int(math.ceil(ori_size[1] * th))
    col1 = int(math.ceil(ori_size[0] * tw))

    split_arr = [
        [[0,     0,      col1,       row1],'UL'],
        [[col1,  0,      ori_size[0],row1],'UR'],
        [[0,     row1,   col1,       ori_size[1]],'DL'],
        [[col1,  row1,   ori_size[0],ori_size[1]],'DR'],
    ]

    for x in split_arr:
        im2 = im.crop(x[0])
        t_name_res = insert_dr2name(b_name,x[1])
        t_name = t_name_res[0]
        t_bone = t_name_res[1] + '_'
        im2.save(os.path.join(out_dir,t_name))
        if out_dict:
            noext_name = myutils.file_without_extension(t_name)
            write_2json_(out_dict,noext_name,im2.size,x[1],t_bone,idx,lastone,dec_frame)
    
    if deleteOld:
        os.remove(in_file)
    a = 100

def resize_png(in_file, scale, out_path):
    if scale == 1.0:
        return
    im = Image.open(in_file)
    ori_size = im.size

    im = im.resize((int( ori_size[0] * scale), int(ori_size[1] * scale)),Image.ANTIALIAS)

    # out_dir = out_dir if out_dir else os.path.dirname(in_file)
    bn = os.path.basename(in_file)
    noext = myutils.file_without_extension(bn)

    im.save(out_path)


def trim_png_(in_file,out_file,split_config):
    b_name = os.path.basename(in_file)
    out_dir = os.path.dirname(out_file)

    im = Image.open(in_file)
    # ori_size = im.size  # (364, 471)
    box_size = bbox(im)  # (64, 89, 278, 267)
    im2 = im.crop(box_size)

    im2_size = im2.size  # (214, 178)

    row_height = split_config[0]

    row_num = int(math.ceil(im2_size[1] / float(row_height)))
    
    for i in range(row_num):
        #  (left, upper, right, lower)
        box = (0, i * row_height, im2_size[0], min((i + 1) * row_height, im2_size[1]))
        im3 = im2.crop(box)
        if False:
            box2 = bbox(im3)
            im3 = im3.crop(box2)
        t_name = get_gridname(i,b_name)
        im3.save(os.path.join(out_dir,t_name))
    a = 100

def trim_png(in_file,out_file,split_config):
    if len(split_config) == 1:
        trim_png_(in_file,out_file,split_config)
    elif len(split_config) == 2:
        trim_png_rowcol(in_file,out_file,split_config)

def trim_png_dir(in_dir, out_dir, center):
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        out_path = os.path.join(out_dir,f)
        if os.path.isfile(sourceF) and f.endswith('.png'):
            trim_png(sourceF, out_path, center)
        elif os.path.isdir(sourceF):
            if not os.path.exists(out_path):
                os.mkdir(out_path)
            trim_png_dir(sourceF, out_path, center)

def atlas_reader(atlas_file):
    lines = myutils.get_file_lines(atlas_file)
    region_start = False
    Head_over = False

    new_lines = []

    regions = {}

    line_group = None
    line_cnt = 0
    for i, line in enumerate(lines):
        if not Head_over and line.count('repeat: none') == 1:
            region_start = True
            Head_over = True
            new_lines.append(line.rstrip())
            continue
        elif not Head_over:
            new_lines.append(line.rstrip())


        if region_start and line.count(':') == 0:
            r_key_arr = line.lstrip().rstrip().split(Custom_post_fix)
            if len(r_key_arr) == 2:
                t_name = r_key_arr[0]
                t_idx = r_key_arr[1]
                if not regions.get(t_name):
                    regions[t_name] = []
                    # {"idx":t_idx,"lines":[]}
                line_group = {"idx":t_idx,"lines":[]}
                regions[t_name].append(line_group)

            continue
        
        if line_group:
            line_group["lines"].append(line.rstrip())
            line_cnt += 1
            if line_cnt == 6:
                line_cnt = 0
                line_group = None

    # sort & append
    for k in regions:
        v = regions[k]
        v.sort(key=lambda x: int(x['idx']))
        new_lines.append(k)
        new_lines.append(u'  regincnt: {}'.format(len(v)))
        for z in v:
            new_lines.extend(z['lines'])
    
    myutils.write_file_lines(atlas_file+'.out',new_lines,'\n')
    a = 100

def trim_png_dirlist(in_pnglist,rowheight):
    for x in in_pnglist:
        out = x + '_res'
        myutils.ensure_dir(out, True)
        trim_png_dir(x,out,rowheight)

        myutils.force_rename_dir(out, x, x + '_backup')
        dir_name = os.path.dirname(x)
        bn_name = os.path.basename(x)
        subprocess.call(['TexturePacker',os.path.join(dir_name,'_alpha_{0}.tps'.format(bn_name))])
        atlas_reader(x + ".atlas")

def test():

    atlas_list = [
        "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out.atlas",
        "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out1.atlas",
        # "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out2.atlas",
        "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out3.atlas",
    ]
    for x in atlas_list:
        atlas_reader(x)
    in_png_list = [
        "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out",
        "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out1",
        "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out3",
        "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out4",
        "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out5",
        "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out6"
        ]
    trim_png_dirlist(in_png_list, [32])
    # atlas_reader("/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out2.atlas")

    in_png = '/Users/mac/Downloads/spine_split/orignal/spine1/idle_origin'
    out_png = '/Users/mac/Downloads/spine_split/orignal/spine1/idle_out'

    in_png = '/Users/mac/Downloads/spine_split/afterAdjust/待机休闲Spine/images'
    out_png = '/Users/mac/Downloads/spine_split/afterAdjust/待机休闲Spine/images_out'

    # in_png = '/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out2'
    # out_png = '/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/MaChao_face/sk_MaChao_face_out2_res'

    # in_png = '/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/VipDukeSys_face/sk_VipDukeSys_face'
    # out_png = '/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/VipDukeSys_face/sk_VipDukeSys_face2'

    center = [float(333/873.0), float(504/878.0), 20, 20]
    
    myutils.ensure_dir(out_png, True)

    # a = find_last_number('待12机休33闲特效合成_00.png')

    # res = recalc_cenrter([0,0,2000,2000],[100,200,1200,1600],[0.2,0.4])
    # trim_png_dir(in_png, out_png)
    # trim_png(in_png+'/待机休闲特效合成_56.png',out_png+'/待机休闲特效合成_56.png',center)
    trim_png_dir(in_png,out_png,[32, 32])
    pass

def resize_dir(in_dir, scale=1.0):
    if scale == 1.0:
        return in_dir
    out_dir = in_dir + u'_resize'
    ok = myutils.ensure_dir(out_dir, True)
    if not ok:
        return False
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF) and f.endswith('.png'):
            out_path = os.path.join(out_dir,f)
            resize_png(sourceF,scale,out_path)

    return out_dir
def calculate_pngcount(in_dir, scale=1.0, dec_frame=0, act_name=None, v3_method=False):
    has_medium = False
    origin_in_dir = in_dir
    resize_dir_temp = in_dir + u'_resize'
    try:
        if os.path.exists(resize_dir_temp):
            shutil.rmtree(resize_dir_temp, ignore_errors=True)
    except OSError as e:
        mygui.show_msg_box(u'目录' + os.path.basename(resize_dir_temp) +u'被占用')
        return
    
    if scale < 1.0 or scale > 1.0:
        has_medium = True
        in_dir = resize_dir(in_dir, scale)
        if not in_dir:
            mygui.show_msg_box(u'目录' + os.path.basename(resize_dir_temp) +u'被占用')
            return
    all_group = []
    png_group = []
    png_size_cnt = 0
    max_size = 2048 * 2048
    dec_count = 0

    png_num = 0
    png_withorders = []
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF) and f.endswith('.png'):
            png_num += 1
            ln = find_last_number(f)
            if not ln:
                raise_error(u'图片序号错误' + f)
                return
            png_withorders.append([int(find_last_number(f)), sourceF])

    if dec_frame > 0:
        png_num = int( (png_num - 1) / (dec_frame + 1) ) * (dec_frame + 1) + 1
    png_withorders.sort(key=lambda m : m[0])
    access_cnt = 0

    scale_factor = float(1.1)
    png_size_arr = []
    total_size = 0
    for x in png_withorders:
        sourceF = x[1]
        f = os.path.basename(x[1])
        if os.path.isfile(sourceF) and f.endswith('.png'):
            access_cnt += 1
            if dec_frame > 0 and access_cnt < png_num:
                dec_count += 1
                if dec_count > 1:
                    if dec_count == dec_frame + 1:
                        dec_count = 0
                    continue
            

            
            # ts = get_trim_size(sourceF)
            # png_size_cnt += ts[0] * ts[1]
            ts = get_trim_size_4grid(sourceF) * scale_factor
            png_size_cnt += ts 
            total_size += ts
            png_size_arr.append([sourceF, ts])
            # png_group.append(sourceF)
            # print('access_cnt',access_cnt)

            # if png_size_cnt > max_size or access_cnt == png_num:
            #     png_size_cnt = 0
            #     all_group.append(png_group)
            #     png_group = []
    
    png_round_num = max(1.0, round(total_size / float(max_size)))
    png_per_size = total_size / float(png_round_num)

    size_iter = 0
    temp_group = []
    arr_len = len(png_size_arr)
    for i, x in enumerate(png_size_arr):
        p2 = size_iter + x[1]
        delta_p2 = p2 - png_per_size
        last_one = i == arr_len - 1
        if delta_p2 > 0 or last_one:
            size_iter = 0
            if delta_p2 < x[1] / float(2.0) or last_one:
                # in
                temp_group.append(x[0])
                all_group.append(temp_group)
                temp_group = []
            else:
                # out
                all_group.append(temp_group)
                temp_group = []
                temp_group.append(x[0])
        else:
            temp_group.append(x[0])
            size_iter = p2

    group_dir = origin_in_dir + '_group'
    base_dirname = os.path.basename(in_dir)

    myutils.ensure_dir(group_dir, True)
    out_dirs = []
    for i, x in enumerate(all_group):
        to_dir = (act_name if act_name else base_dirname) + idx2char(i + 1)
        to_dir = os.path.join(group_dir,to_dir)
        myutils.ensure_dir(to_dir)
        if not to_dir in out_dirs:
            out_dirs.append(to_dir)
        for y in x:
            y_bn = os.path.basename(y)
            y_bn = get_packed_name(y_bn,act_name)
            shutil.copy(y,os.path.join(to_dir, y_bn))
    # 0—18，21-36，39--54，57-72，75-87，90-105，108-126，129-147，150-162
    a = 100
    if has_medium:
        shutil.rmtree(in_dir, ignore_errors=True)

    if True:
        center_p = None
        idx_rec = {
            'frames': 0,
            'dec_frame': dec_frame
        }
        for x in out_dirs:
            bn_x = os.path.basename(x)
            out_dict = {
                'skeleton' : {'images':bn_x},
                'bones' : [{"name":"root"},{ "name": "ctr", "parent": "root", "scaleX": 1.0, "scaleY": 1.0 }],
                'slots' : [],
                'skins' : {'default':{}},
                'animations':{"animation":{'slots':{},'bones':{'ctr':{'translate':[{ "time": 0, "x": 0, "y": 0 }]}}}}
            }
            temp_list = []
            for f in os.listdir(x):
                sourceF = os.path.join(x,f)
                if os.path.isfile(sourceF) and f.endswith('.png'):
                    temp_list.append([int(find_last_number(f)), sourceF])
            temp_list.sort(key=lambda m : m[0])

            ll = len(temp_list)

            for idx, cfg in enumerate(temp_list):
                sourceF = cfg[1]
                f = os.path.basename(sourceF)
                fidx = idx * (dec_frame + 1) + idx_rec['frames']
                last_one = idx == ll - 1
                if v3_method:
                    if not center_p:
                        center_p = get_png_center(sourceF)
                    trim_png_withcenter(sourceF, center_p, fidx, True, out_dict, last_one, dec_frame)
                else:
                    noext_name = myutils.file_without_extension(f)
                    im2 = Image.open(sourceF)
                    write_2json_(out_dict,noext_name,im2.size,'Center',"ctr",fidx,last_one, dec_frame)

            idx_rec['frames'] += ll * (dec_frame + 1)
            json_file = os.path.join(group_dir,bn_x + '.json')
            myutils.write_dict_tofile(json_file,out_dict)
        
def main():

    # atlas_reader("/Users/mac/Documents/my_projects/cok/ccbDyRes/dynAutoPacker/dresource 16/sk_VipDukeSys_face.atlas")

    in_png = '/Users/mac/Documents/my_projects/cok/client/CCB/IF/Imperial'
    # out_png = '/Users/mac/Downloads/spine_split/orignal/spine1/idle_test_out'
    out_png_rc = '/Users/mac/Documents/my_projects/cok/client/CCB/IF/Imperial_rc'
    myutils.ensure_dir(out_png_rc, True)
    # myutils.ensure_dir(out_png, True)
    # trim_png_dir(in_png,out_png_rc,[1000, 1000])
    trim_png_dir(in_png,out_png_rc,[64])
    # trim_png_dir(out_png_rc,out_png,[32])
    pass

def test_calculate():
    calculate_pngcount(u'/Users/mac/Downloads/gpu_texs/nampe1/S4世界杯头像框',1, 2, 'idle', False)

def bbox(im):
    a = np.array(im)  # keep RGB only
    a[:,:,[0,1,2]] = 255
    m = np.any(a != [255, 255, 255, 0], axis=2)
    coords = np.argwhere(m)
    z1 = np.min(coords, axis=0)
    z2 = np.max(coords, axis=0)
    y0, x0, y1, x1 = z1[0], z1[1], z2[0], z2[1]
    res1 = (x0, y0, x1+1, y1+1)
    res2 = im.getbbox()

    t_width1 = res1[2] - res1[0]
    t_height1 = res1[3] - res1[1]

    t_width2 = res2[2] - res2[0]
    t_height2 = res2[3] - res2[1]

    if t_width1 < t_width2 or t_height1 < t_height2:
        return res1
    return res2

def test_center():
    file_name = '/Users/mac/Downloads/wings/original/变身翅膀特效序列/翅膀变身特效合成_00.png'
    center = get_png_center(file_name)
    trim_png_withcenter(file_name,0,center)
    a = 100

if __name__ == "__main__":
    # for i in range(10):
    #     print(idx2char(i+1))
    # png_path = "/Users/mac/Downloads/spine_split/orignal/spine1/idle_origin/待机休闲特效合成_00.png"

    # out_dir = '/Users/mac/Downloads/spine_split/orignal/spine1/idle_origin_resize'
    # myutils.ensure_dir(out_dir, True)
    # resize_png(png_path, 0.7, out_dir)
    # z = get_packed_name('翅膀_变身_特效__合成_135.png')
    # calculate_pngcount('/Users/mac/Downloads/wings/original/变身翅膀特效序列',0.93, 0, 'idle')
    # replace_force = mygui.yes_no_dialog(u"是否覆盖已存在id")[0] == 'y'
    # aa = insert_dr2name('idle_16_.png','DR')
    # b = 100
    # test_center()
    # get_trim_size_4grid('/Users/mac/Downloads/wings/original/变身翅膀特效序列/翅膀变身特效合成_00.png')
    # test_calculate()

    # s = r'{abcdef}'
    # a = s[1:-1]
    # z = 100

    # png_file = "/Users/mac/Downloads/gongji2/攻击特效合成/攻击特效合成_00.png"
    # png_file1 = "/Users/mac/Downloads/gongji2/攻击特效合成/攻击特效合成_00_out.png"

    # im = Image.open(png_file)
    # print(bbox(im))  # (33, 12, 223, 80)
    # im2 = im.crop(bbox(im))
    # im2.save(png_file1)
    # main()
    # extrat_file('/Users/mac/Documents/my_projects/cok/ccbDyRes/client_tools/split_spine/TkinterDnD2/tkdnd2.8-win32-x86_64.tar.gz')
    # dest = [255,255,255,1]
    # # np_array = np.array([[255,255,255,0],[255,255,255,1],[255,255,255,2]])
    # np_array = np.array([[1,1,2],[3,1,4],[5,1,6],[1,1,1],[9,1,9],[-1,1,-20],[2,1,678]])
    # np_array[:, [0,1,2]] = 255
    # t_min = np.min(np_array,axis=0)
    # t_max = np.max(np_array,axis=0)
    # # q = np_array > dest

    # tp = "/Users/mac/Downloads/gongji2/攻击特效合成/攻击特效合成_00.png"
    # tp1 = "/Users/mac/Downloads/gongji2/攻击特效合成/攻击特效合成_12.png"
    # # tz = get_trim_size_4grid(tp)
    # tz1 = get_trim_size_4grid(tp1)
    # test_calculate()
    for idx in range(9):
        print(0.1 * (idx + 1) / 3)
    print('nothing happened')
    pass