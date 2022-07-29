# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils

Pvr_re = re.compile(r'parse astc file of (.*?)\n')

def main():
    file_path = '/Users/hcm-b0208/Downloads/astclog'
    lines = myutils.get_file_lines(file_path)
    res = {}
    for i, line in enumerate(lines):
        gp = Pvr_re.findall(line)
        if len(gp) > 0:
            file = gp[0]
            if res.get(file):
                res[file] += 1
            else:
                res[file] = 1
    
    dup = []
    for x in res:
        if res[x] > 1:
            dup.append(res[x])

    print(dup)

    pass

if __name__ == "__main__":
    main()