# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re

FileName_re = re.compile(r'--- a(.*)')

def main():
    file_path = "/Users/mac/Documents/my_projects/cok/client/5_1.txt"
    with open(file_path,"r") as f:
        # lines = f.readlines()
        content = f.read()
        res = FileName_re.findall(content)
        r = []
        for x in res:
            if not x in r:
                r.append(x)
        a = 100


if __name__ == "__main__":
    main()