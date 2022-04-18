# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils


Res_re_arr = [
    re.compile(r'loadGroupByGroupId\s*(.*?)\s*\[(\d+\.\d*)\]'),
    re.compile(r'Time Block.*?\[(.*)\] \[(\d+\.\d*)\]'),
    re.compile(r'Net Block \[(.*)\] \[(\d+\.\d*)\]')
]

def parse_logfile(log_file, mode=0):
    TR = Res_re_arr[mode]
    res = []
    with open(log_file,'r') as f:
        lines = f.readlines()
        for i, line in enumerate(lines):
            find_gp = TR.findall(line)
            if len(find_gp) == 1:
                res.append(find_gp[0])
            pass

    res.sort(key=lambda m : float(m[1]),reverse=True)

    for x in res:
        print('{0} {1}'.format(x[0], x[1]))


    a = 100

def main():
    # parse_logfile('/Users/mac/Documents/grouptime.txt')
    # parse_line('[10:16:42.626][13ddbdc0][ERR](DEF) TextureCache::addImage [48] (/Users/mac/Documents/my_projects/cok/client/IF/Resources/Imperial/Imperial_31.pvr)')
    if len(sys.argv) == 3:
        parse_logfile(sys.argv[1], int(sys.argv[2]))
    pass

if __name__ == "__main__":
    main()