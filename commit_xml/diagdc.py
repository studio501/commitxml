# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils
import operator

Text_re = re.compile(r'setFragmentTexture:(.*) atIndex:')

def parse_commands(file_path):
    lines = myutils.get_file_lines(file_path)
    tm = {}
    cnt = 0
    for i, line in enumerate(lines):
        tg = Text_re.findall(line)
        if len(tg) > 0:
            key = tg[0]
            if tm.get(key):
                tm[key] += 1
            else:
                tm[key] = 1
            
            cnt += 1

            z = 10
    tm = sorted(tm.items(), key=operator.itemgetter(1),reverse=True)
    print('texture draw times:')
    print(tm)

    print('total draw call:',cnt)
    a = 100

def main():
    parse_commands('/Users/mac/Documents/gpu_trace/龙裔/commands')
    pass

if __name__ == "__main__":
    main()