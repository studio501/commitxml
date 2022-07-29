# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess, shutil

from PIL import Image
import numpy as np
import argparse
import myutils


def detec_file(file_path, rate=0.43, thres=0.2):
    im = Image.open(file_path)
    im = im.convert('RGBA')
    a = np.array(im)
    pixel = 0
    alpha = 0

    value = 255 * 0.2
    for i, row in enumerate(a):
        for j, p in enumerate(row):
            if len(p) < 4:
                return False
            
            if p[3] > 0:
                pixel += 1
                if p[3] <= value:
                    alpha += 1
    if pixel == 0:
        return False

    res = float(alpha) / float(pixel)
    return res >= rate

def detech_dir(in_dir,rate=0.43, thres=0.2, res = []):
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF) and f.endswith('.png'):
            if detec_file(sourceF, rate, thres):
                res.append(sourceF)
                if f.count('sqhd_img9_dutiaotou.png') == 1:
                    a = 100
        elif os.path.isdir(sourceF):
            detech_dir(sourceF, rate, thres, res)

def scale_file(file_path, rate=2, tw=8, th = 8):
    im = Image.open(file_path)
    im = im.convert('RGBA')
    im_size = im.size
    
    if im_size[0] == tw and im_size[1] == th:
        scale_size = (tw * rate, th * rate)
        im = im.resize(scale_size, Image.ANTIALIAS)
        im.save(file_path, "PNG")
        return True
    return False

def scale_dir(in_dir,rate=2, tw=8, th = 8, res = []):
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF) and f.endswith('.png'):
            if scale_file(sourceF, rate, tw, th):
                res.append(sourceF)
                if f.count('sqhd_img9_dutiaotou.png') == 1:
                    a = 100
        elif os.path.isdir(sourceF):
            scale_dir(sourceF, rate, tw, th, res)

def test():
    res = []
    detech_dir('/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-fairygui/assets/ui_ativityFestival', 0.43, 0.2, res)
    print(res)

def main():
    parser = argparse.ArgumentParser(description='Usage of detec_transparent.py.')
    parser.add_argument('-pngdirs','--pngdirs',help='specify raw png dir.')
    parser.add_argument('-rate','--rate',help='specify transparent pixel rate (default 0.43).', default=0.43,type=float)
    parser.add_argument('-alpha','--alphathres',help='specify alpha threshold (default 0.2).', default=0.2, type=float)
    
    args = parser.parse_args()

    res = []
    detech_dir(args.pngdirs, args.rate, args.alphathres, res)
    print(res)
    dst_dir = '/Users/hcm-b0208/Documents/backup/res_alpha'
    myutils.ensure_dir(dst_dir, True)
    
    for x in res:
        shutil.copy(x, os.path.join(dst_dir, os.path.basename(x)))

    # file_path = '/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-fairygui/assets/ui_ativityFestival/textures/summer2022/sqhd_img9_dutiaotou.png'
    # im = Image.open(file_path)
    # a = np.array(im)
    # pixel = 0
    # alpha = 0
    # thres = 0.2

    # value = 255 * 0.2
    # for i, row in enumerate(a):
    #     for j, p in enumerate(row):
    #         pixel += 1
    #         if p[3] <= value:
    #             alpha += 1

    # rate = float(alpha) / float(pixel)

    b = 100

    pass

def tell_png_mode(png_path):
    pass
    im = Image.open(png_path)
    print('png_path', im.mode, im.info, im.format, im.format_description)
def test3():
    # res = []
    # scale_dir('/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-fairygui/assets/ui_common',2,8,8,res)
    # print(res)
    scale_file('/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-fairygui/assets/ui_common/gyzy_img9_dangqian.png',2,8,8)


def test2():
    img1 = "/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-fairygui/assets/ui_common/gyzy_img9_list2.png"
    img2 = "/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-fairygui/assets/ui_common/phb_img9_list.png"
    tell_png_mode(img1)
    tell_png_mode(img2)

if __name__ == "__main__":
    # test()
    # main()
    # test2()
    test3()
    # detec_file('/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-fairygui/assets/ui_ativityFestival/textures/summer2022/sqhd_img9_dutiaotou.png')