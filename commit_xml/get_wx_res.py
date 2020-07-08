# -*- coding:utf-8 -*-

import subprocess
import os,sys

# /data/data/com.tencent.mm/MicroMsg/abc0f2f692770cfc94705a55df70316d/appbrand

def _get_res(dst_dir,out_put='dres'):
    res = subprocess.check_output(['adb','shell','ls',dst_dir]).split()
    for dirname in res:
        subprocess.call(['adb','pull',dst_dir+'/'+dirname,out_put+'/'+dirname])

def main():
    pass
    to_dir = sys.argv[1] if len(sys.argv) == 2 else None
    dst_dirs = [
        # '/data/media/0/tencent/MicroMsg/wxanewfiles',
        # '/storage/emulated/0/tencent/MicroMsg',
        # '/mnt/runtime/write/emulated/0/tencent/MicroMsg',
        # '/mnt/runtime/read/emulated/0/tencent/MicroMsg',
        # '/mnt/runtime/default/emulated/0/tencent/MicroMsg',
        # '/data/media/0/tencent/MicroMsg',
        # '/data/data/com.tencent.mm/MicroMsg',
        '/data/media/0/tencent/MicroMsg'
    ]

    for dst_dir in dst_dirs:
        _get_res(dst_dir,to_dir)

if __name__ == "__main__":
    main()    