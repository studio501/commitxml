# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

def compress_file(file_path, rate):
    rate = int(rate)
    subprocess.call(['pngquant', '--force', '--quality={0}-{1}'.format(rate-10, rate),'--output='+file_path,file_path])

def compress_dir(in_dir, rate):
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF) and f.endswith('.png'):
            compress_file(sourceF, rate)
        elif os.path.isdir(sourceF):
            compress_dir(sourceF, rate)

def main():
    if len(sys.argv) < 2:
        print('python pngcompress.py dir')
        return

    rate = 70
    if len(sys.argv) == 3:
        rate = sys.argv[2]

    print('compress rate is',rate)

    if os.path.isdir(sys.argv[1]):
        compress_dir(sys.argv[1], rate)
    else:
        compress_file(sys.argv[1], rate)
    pass

if __name__ == "__main__":
    main()