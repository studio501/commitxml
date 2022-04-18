# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

import myutils

findReg = re.compile(r'getSkeletonData \((.*),(.*)\)')

def replace_(file_path):
    out_path = file_path + '.out'
    lines = myutils.get_file_lines(file_path)
    specs = []
    for i, line in enumerate(lines):
        tr = findReg.findall(line)
        if len(tr) == 1:
            specs.append('{{"{0}","{1}"}},'.format(tr[0][0],tr[0][1]))

            a = 100
    myutils.write_file_lines(out_path,specs,'\n')
    z = 1

def main():
    replace_('/Users/mac/Documents/my_projects/cok/client/1.txt')
    pass

if __name__ == "__main__":
    main()