# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

def rename_check(dir_path, new_prefix = '发票'):
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(f)
            bf_arr = bf.split('_')
            dstF = os.path.join(dir_path,new_prefix+'_'+bf_arr[1])

            os.rename(sourceF, dstF)
def main():
    pass

    if len(sys.argv) < 2:
        return
    dir_path = sys.argv[1]

    if len(sys.argv) == 3:
        rename_check(dir_path, sys.argv[2])

    res = []
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(f)
            t = float(re.search(r'[-+]?\d*\.\d+|\d+', bf).group())
            res.append(t)

    money = sum(res)

    print('总金额是: ',money)



if __name__ == "__main__":
    main()