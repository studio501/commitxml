# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils

import base64

Char_re = re.compile(r'\[\d+\]\s+=\s+\'(.*)\'')

def read_charfile(file_path):
    pass
    lines = myutils.get_file_lines(file_path)
    for i, line in enumerate(lines):
        gp = Char_re.findall(line)
        if len(gp) > 0:
            x = gp[0]
            a = 100


def main():
    read_charfile('/Users/mac/Documents/my_projects/cok/outerDyRes75/dresource 28/skinparticle/temp_txt')

    # newjpgtxt = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAy0lEQVR42u3VwRGAIAxFwfTftDagowOE0WRfBfzNgTj0ukAACxYsWLBgIYAFCxYsWLAQwIIFC1bac6+C9QB0V1+sGKojVszVBSsWVR9rYP82r39gzSiXxZpf2wVr1c48r4JYeV5RT6od1tf0i2OlHADWz7CyPq8OWHnBggULFizBggULFixYggULFixYsAQLFixYsGAJFixYsGDBEixYsGDBgiVYsGDBggVLsGDBggULlmDBggULFizBggULFixYggULFixYsAQL1r5OrwBF4bSyQPMAAAAASUVORK5CY4I="
    # g = open("out.png", "w")
    # g.write(base64.decodestring(newjpgtxt))
    # g.close()
    pass

if __name__ == "__main__":
    main()