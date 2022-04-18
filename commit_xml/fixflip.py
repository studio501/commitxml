# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re

Flip_re = re.compile(r'"flip[XY]"',re.MULTILINE)

Replace_re = re.compile(r'"(flip[XY])":\s*\[.*\n?.*\{\s*"time":\s*\d+\.?\d*\s*(?:(?:(\}))|(?:,\s*"([xy]"\s*:\s*true)\s*\})).*?\n?.*\]',re.MULTILINE)

def file_extension(path): 
	return os.path.splitext(path)[1] 

def has_flip(file_path):
    with open(file_path, 'r') as f:
        contents = f.read()
        return len(Flip_re.findall(contents)) > 0


def fix_flip_dir(dir_path):
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.isfile(sourceF):
            if file_extension(sourceF) == '.json':
                fix_flip(sourceF)
        elif os.path.isdir(sourceF):
            fix_flip_dir(sourceF)

def fix_flip(file_path):
    if has_flip(file_path):
        with open(file_path, "r+") as f:
            contents = f.read()
            contents = Replace_re.sub(lambda m : _repl_func(m), contents)
            f.seek(0)
            f.write(contents)
            f.truncate()

            print("fix flip of", file_path, "successful...")

def _repl_func(m):
    pass
    r = m.regs[0]

    start_p = r[0]

    ori_str = m.string[r[0]:r[1]]

    is_flipX = m.group(1) == "flipX"
    do_flip = m.group(2) == None

    ti = 0
    for x in reversed(m.regs[1:]):
        sp = x[0]
        ep = x[1]
        if sp != -1 and ep != -1:
            sp -= start_p
            ep -= start_p
            if ti == 0:
                ts = ori_str[sp:ep]
                new_ts = ts.replace("true", "-1")
                ori_str = ori_str[:sp] + new_ts + ori_str[ep+1:]
                pass
            elif ti == 1:
                new_ts = ', "x": 1 }\n' if is_flipX else ', "y": 1 }\n'
                ori_str = ori_str[:sp] + new_ts + ori_str[ep+1:]
            elif ti == 2:
                new_ts = 'scale"'
                ori_str = ori_str[:sp] + new_ts + ori_str[ep+1:]
        else:
            pass

        ti += 1
    
    return ori_str

def test():
    pass
    s = """ "flipY": [
					{ "time": 0, "x": true }
				]

        "flipY": [
                            { "time": 0 }
                        ]"""


    q = Replace_re.sub(lambda m : _repl_func(m), s)

    a = 100


def main():
    if len(sys.argv) != 2:
        print("usage: python fixflip.py [file|dir]")
        return

    pt = sys.argv[1]

    if os.path.isdir(pt):
        fix_flip_dir(pt)
    elif os.path.isfile(pt):
        fix_flip(pt)

    pass

if __name__ == "__main__":
    main()