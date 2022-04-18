# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils

Res_re_arr = [
    re.compile(r'TextureCache::addImage\s*.*?\(.*(Resources|dresource)/(.*)\)'),
    re.compile(r'SpriteFrameCache::ParseFile_PlistNormal\s*.*?\(.*(Resources|dresource)/(.*)\)')
]

def parse_logfile(log_file, mode=0):
    res = []
    TR = Res_re_arr[mode]
    with open(log_file,'r') as f:
        lines = f.readlines()
        for i, line in enumerate(lines):
            find_gp = TR.findall(line)
            if len(find_gp) == 1:
                if len(filter(lambda x : x[1] == find_gp[0][1], res)) == 0:
                    res.append(find_gp[0])
            pass

    
    res.sort(key=lambda x: (x[0], x[1]))

    out_struct = []

    out_struct.append('{')
    for i, x in enumerate(res):
        out_struct.append('{{ {0}, "{1}" }}{2}'.format('true' if x[0] == 'dresource' else 'false', x[1], '' if i == len(res) - 1 else ','))
    out_struct.append('}')

    
    out_file = log_file + '.out'
    myutils.write_file_lines(out_file, out_struct, '\n')

    print('out count is',len(res))

    print('\n'.join(out_struct))
    a = 100

def main():
    # parse_line('[10:16:42.626][13ddbdc0][ERR](DEF) TextureCache::addImage [48] (/Users/mac/Documents/my_projects/cok/client/IF/Resources/Imperial/Imperial_31.pvr)')
    if len(sys.argv) == 3:
        parse_logfile(sys.argv[1], int(sys.argv[2]))
    pass

if __name__ == "__main__":
    main()