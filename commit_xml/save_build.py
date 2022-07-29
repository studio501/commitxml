# -*- coding: utf-8 -*
from __future__ import print_function
import shutil
import sys,os,re,subprocess
import myutils

def apply():
    pass

def save():
    save_path = '/Users/hcm-b0208/Documents/backup'
    to_dir = 'jsb-default'

    src_path = '/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-client/build/jsb-default'
    dst_path = os.path.join(save_path, to_dir)

    myutils.ensure_dir(dst_path, True)

    myutils.copy_dir(src_path, dst_path)

    print("save build successful.")

def main():
    pass
    save()
    if len(sys.argv) == 2:
        if sys.argv[1] == 's':
            save()
        elif sys.argv[1] == 'a':
            apply()

if __name__ == "__main__":
    main()