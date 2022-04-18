# -*- coding: utf-8 -*
from __future__ import print_function
import re
import datetime
from AppKit import NSPasteboard, NSStringPboardType

Thread_comp = re.compile(r'# ?(.*?\))')
Thread_comp2 = re.compile(r'#(\d+) (.*)')
Thread_comp3 = re.compile(r'#(\d+) pc (.*)')
# #1856 Queue

def getClipBoardContent():
    pb = NSPasteboard.generalPasteboard()
    pbstring = pb.stringForType_(NSStringPboardType)
    return pbstring.encode("utf-8")

def parse_contents():
    contents = getClipBoardContent()

    if len(contents) == 0:
        print(u'使用方式: 复制到剪切板后执行 python bugly_diag.py 即可')
        return

    lines = contents.split('\n')

    threads = []
    for i, line in enumerate(lines):
        if len(Thread_comp3.findall(line)) == 0:
            if len(Thread_comp.findall(line)) > 0:
                threads.append(Thread_comp.sub(r'\1)', line))
            elif len(Thread_comp2.findall(line)) > 0:
                if line.count('00035d1a') > 0:
                    a = 100
                threads.append(Thread_comp2.sub(r'\2(\1)', line))

    if len(threads) == 0:
        print(u'未检测到线程信息...')
        return

    threads.sort()

    print(u'========={} {}========='.format("start log",datetime.datetime.now()))
    for i, t in enumerate(threads):
        print(t)
    print(u'线程总数: {}'.format( len(threads)))


def main():
    parse_contents()

if __name__ == "__main__":
    main()