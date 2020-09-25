# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,json,re,subprocess
import codecs

uni_re = re.compile( r'\"\\u(.*?)\"')

def fix_one_file(file_path):
    print('start fix {} ...'.format(os.path.basename(file_path)))
    def replace_func(p1):
        return p1.group().decode('unicode_escape').replace(u'\n',u'\\n')

    contents = None
    fix_ok = False
    with open(file_path,"r") as f:
        contents = f.read()
        try:
            contents = uni_re.sub(replace_func,contents)
            fix_ok = True
        except Exception as e:
            pass
    
    if fix_ok:
        try:
            fp = codecs.open(file_path, 'w', 'utf-8')
            fp.write(contents)
            fp.close()

            print('fix {} successful'.format(os.path.basename(file_path)))
        except Exception as e:
            print('fix {} failed: {}'.format(os.path.basename(file_path),e))
            pass
    else:
        print('fix {} failed pls fix it manual'.format(os.path.basename(file_path)))

def fix_dir(sourceDir):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir, f)
        if os.path.isfile(sourceF):
            fix_one_file(sourceF)
        elif os.path.isdir(sourceF):
            fix_dir(sourceF)

def main():
    if len(sys.argv) == 2:
        sourceDir = sys.argv[1]
        fix_dir(sourceDir)

if __name__ == "__main__":
    main()