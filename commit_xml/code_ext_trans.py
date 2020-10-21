# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re,subprocess

def main(file_path):
    with open(file_path,'r') as f:
        lines = f.readlines()
        for line in lines:
            cmd_arr = line.rstrip().split(' ')
            subprocess.call(cmd_arr)

if __name__ == "__main__":
    if len(sys.argv) == 2:
        main(sys.argv[1])
    # main('/Users/mac/Documents/code.txt')