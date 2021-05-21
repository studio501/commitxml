

# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess,codecs,json

MD5_re = re.compile(r'.*=\s+(\w+)\n')

def file_extension(path): 
	return os.path.splitext(path)[1]

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 


def get_file_lines(file_path, withoutSep = False):
    try:
        f = codecs.open(file_path, 'r', 'utf-8')
        lines = f.readlines()
        f.close()
        if withoutSep:
            for i,x in enumerate(lines):
                lines[i] = x.rstrip()

        return lines
    except Exception as e:
        print('can not open',file_path)
        return None

def write_file_lines(file_path, lines, line_eof=''):
	f = codecs.open(file_path, 'w', 'utf-8')
	for line in lines:
		f.write(line)
		f.write(line_eof)
	f.close()

def lines_contaion_words(lines,words):
	for i,line in enumerate(lines):
		if line.count(words) > 0:
			return i
	return None

def write_dict_tofile(file_path,tdict):
    json_str = json.dumps(tdict)
    f = codecs.open(file_path, 'w', 'utf-8')
    f.write(json_str)
    f.close()

def get_file_md5(file_path):
    if not os.path.exists(file_path):
        return ''
    md5 = subprocess.check_output(['md5',file_path])
    md5 = MD5_re.findall(md5)[0]
    return md5