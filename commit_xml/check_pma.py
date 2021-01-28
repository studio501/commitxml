# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils

def check_dir(dir_path,res):
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.isfile(sourceF):
            if myutils.file_extension(sourceF) == ".tps":
                bn = os.path.basename(sourceF)
                if not bn in res:
                    lines = myutils.get_file_lines(sourceF)
                    idx = myutils.lines_contaion_words(lines,"premultiplyAlpha")
                    if idx:
                        if lines[idx+1].count('false') > 0:
                            res.append(bn)
        elif os.path.isdir(sourceF):
            check_dir(sourceF,res)

def main():
    dirs = [os.getenv('ClientDir')+'/CCB/IF',os.getenv('CcbDyRes')+'/dynamicResource']
    res = []
    for x in dirs:
        check_dir(x,res)

    myutils.write_file_lines('pma.txt',res)

if __name__ == "__main__":
    main()