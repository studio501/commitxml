# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

def text2binary(file_path):
    # read textfile into string 
    with open(file_path, 'r') as txtfile:
        mytextstring = txtfile.read()

    # change text into a binary array
    # binarray = ' '.join(format(ch, 'b') for ch in bytearray(mytextstring))
    binarray = ''.join(format(ch, 'x') for ch in bytearray(mytextstring))
    # binarray = str.encode(mytextstring ,'utf-8')

    # save the file
    with open(file_path+'.bin', 'wb') as binfile:
        binfile.write(binarray)

def main():
    pass
    if len(sys.argv) == 2:
        text2binary(sys.argv[1])

if __name__ == "__main__":
    main()