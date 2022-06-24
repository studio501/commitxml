# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess,codecs,json
import myutils

def main():
    pass

    if len(sys.argv) != 3:
        print("usage: python astctest.py in_dir out_dir")
    
    in_dir = sys.argv[1]
    out_dir = sys.argv[2]

    myutils.ensure_dir(out_dir)

    astcbin = "/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-client/node_modules/@hortor/cc-astc-patch/dist/texture-compress/ASTCTexTool/astcenc-avx2"

    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF) and myutils.file_extension(f) == ".png":
            no_extf = myutils.file_without_extension(f)
            subprocess.call([astcbin, "-cl", sourceF, os.path.join(out_dir, no_extf + ".astc"), "6x5", "-medium"])



if __name__ == "__main__":
    main()