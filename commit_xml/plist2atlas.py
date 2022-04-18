# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils
import plistlib

fournum_re = re.compile(r'\{\{(-?\d+),(-?\d+)\},\{(-?\d+),(-?\d+)\}\}')
twonum_re = re.compile(r'\{(-?\d+),(-?\d+)\}')

def get_num_arr(numre, numstr):
    tr = numre.findall(numstr)
    if len(tr) > 0:
        return tr[0]

def parse_plist(file_path):
    pl = plistlib.readPlist(file_path)
    lines = []
    lines.append(pl['metadata']['realTextureFileName'])
    lines.append('format: RGBA8888')
    lines.append('filter: Linear,Linear')
    lines.append('repeat: none')
    for k in pl['frames']:
        pf = pl['frames'][k]
        rotate = '  rotate: {0}'.format('-90' if pf['rotated'] else 'false')

        frame = get_num_arr(fournum_re, pf['frame'])
        orisize = get_num_arr(twonum_re, pf['sourceSize'])
        off = get_num_arr(twonum_re, pf['offset'])
        sourceRect = get_num_arr(fournum_re, pf['sourceColorRect'])

        xy = '  xy: {0}, {1}'.format(frame[0],frame[1])
        size = '  size: {0}, {1}'.format(frame[2],frame[3])
        orig = '  orig: {0}, {1}'.format(orisize[0],orisize[1])
        offset = '  offset: {0}, {1}'.format(sourceRect[0], int(orisize[1]) - int(frame[3]) - int(sourceRect[1]))
        index = '  index: -1'

        lines.append(myutils.file_without_extension(k))
        lines.append(rotate)
        lines.append(xy)
        lines.append(size)
        lines.append(orig)
        lines.append(offset)
        lines.append(index)

    dirname = os.path.dirname(file_path)
    noext = myutils.file_without_extension(file_path)
    atlas = os.path.join(dirname, noext + '.atlas')
    myutils.write_file_lines(atlas, lines, '\n')
    a = 100

def main():
    if len(sys.argv) == 2:
        parse_plist(sys.argv[1])
    else:
        print("usage: python plist2atlas.py sample.plist")
        print("this will output a sample.atlas file at same directory")
    # parse_plist('/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/DarkLord_diji_face/sk_DarkLord_diji_face_out_gongji.plist')
    pass

if __name__ == "__main__":
    main()