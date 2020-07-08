# -*- coding:utf-8 -*-

import subprocess
import os,sys,shutil

def file_extension(path): 
	return os.path.splitext(path)[1] 

def dir_has_png(sourceDir):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            ext = file_extension(sourceF)
            if ext == '.png':
                return True
        elif os.path.isdir(sourceF):
            return dir_has_png(sourceF)



def main():
    pass
    if len(sys.argv) == 2:
        dist_dir = sys.argv[1]
        non_png_dir = []
        has_png_dir = []
        for f in os.listdir(dist_dir):
            tmpDir = os.path.join(dist_dir,f)
            if not dir_has_png(tmpDir):
                non_png_dir.append(tmpDir)
            else:
                has_png_dir.append(tmpDir)

        for tmpDir in non_png_dir:
            shutil.rmtree(tmpDir)

        a = 100

if __name__ == "__main__":
    main()    