# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess,shutil

import split_spine_gui

def main():
    pass
    source_dir = '/Users/mac/Documents/my_projects/local_project/opengl_st/commit_xml'
    dst_dir = '/Users/mac/Documents/my_projects/cok/ccbDyRes/client_tools/split_spine'
    needed_pys = [
        "mygui.py",
        "myutils.py",
        "split_spine.py",
        "split_spine_gui.py"
    ]

    for x in needed_pys:
        shutil.copy(os.path.join(source_dir,x), os.path.join(dst_dir,x))
    
    pwd = os.getcwd()
    os.chdir(dst_dir)

    os.system('rm *.pyc')
    os.system('python -m compileall *.py')
    
    release_zip = u'安装包{}v{}.zip'.format(split_spine_gui.getToolName(), split_spine_gui.getToolVersion())
    zip_cmd = ['zip','-r9',release_zip]

    for f in os.listdir(dst_dir):
        if not f.endswith('.py') and not f.endswith('DS_Store') and not 'release_spinesplit' in f:
            zip_cmd.append(f)
    
    subprocess.call(zip_cmd)

if __name__ == "__main__":
    main()