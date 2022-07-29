# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess,codecs,json
import shutil,time
import urllib2
import platform

from distutils.dir_util import copy_tree
# from AppKit import NSPasteboard, NSStringPboardType

MD5_re = re.compile(r'.*=\s+(\w+)\n')

def copy_dir(src, dst):
    copy_tree(src, dst)

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

def get_url_contents(url):
    contents = urllib2.urlopen(url).read()
    return contents

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

def get_jsonfrom_file(f):
    if not os.path.exists(f):
        return None

    with open(f,'r') as load_f:
        load_dict = json.load(load_f)
        return load_dict
    return None

def get_file_md5(file_path):
    if not os.path.exists(file_path):
        return ''
    md5 = subprocess.check_output(['md5',file_path])
    md5 = MD5_re.findall(md5)[0]
    return md5

def ensure_dir(dir_path, cleanPrevious=False):
    try:
        if cleanPrevious:
            if os.path.exists(dir_path):
                shutil.rmtree(dir_path, ignore_errors=True)

        if not os.path.exists(dir_path):
            os.mkdir(dir_path)
    except OSError as e:
        return False

    return True

def force_rename_dir(src_path, dst_path, back_path=None):
    if os.path.exists(dst_path):
        if back_path:
            os.rename(dst_path, back_path)
        else:
            shutil.rmtree(dst_path, ignore_errors=True)
    os.rename(src_path, dst_path)

def is_number(str):
    try:
        if str=='NaN':
            return False
        float(str)
        return True
    except ValueError:
        return False

def file_isinprocessing(f):
    if os.path.exists(f):
        try:
            os.rename(f, f)
            return False
        except OSError as e:
            return True
    return False

def progressBar(iterable, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█', printEnd = "\r"):
    """
    Call in a loop to create terminal progress bar
    @params:
        iterable    - Required  : iterable object (Iterable)
        prefix      - Optional  : prefix string (Str)
        suffix      - Optional  : suffix string (Str)
        decimals    - Optional  : positive number of decimals in percent complete (Int)
        length      - Optional  : character length of bar (Int)
        fill        - Optional  : bar fill character (Str)
        printEnd    - Optional  : end character (e.g. "\r", "\r\n") (Str)
    """
    total = len(iterable)
    # Progress Bar Printing Function
    def printProgressBar (iteration):
        percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
        filledLength = int(length * iteration // total)
        bar = fill * filledLength + '-' * (length - filledLength)
        print('\r%s |%s| %s%% %s' % (prefix, bar, percent, suffix), end = printEnd)
    # Initial Call
    printProgressBar(0)
    # Update Progress Bar
    for i, item in enumerate(iterable):
        yield item
        printProgressBar(i + 1)
    # Print New Line on Complete
    print()

# usage of progress console
# # A List of Items
# items = list(range(0, 57))

# # A Nicer, Single-Call Usage
# for item in progressBar(items, prefix = 'Progress:', suffix = 'Complete', length = 50):
#     # Do stuff...
#     time.sleep(0.1)

def change_filename(filepath, postname):
    dir_path = os.path.dirname(filepath)
    base_n = os.path.basename(filepath)
    noext = file_without_extension(base_n)
    ext = file_extension(base_n)
    return os.path.join(dir_path,noext + postname + ext)

# def getClipBoardContent():
# 	if platform.system() == 'Windows':
# 		win32clipboard.OpenClipboard()
# 		data = win32clipboard.GetClipboardData()
# 		win32clipboard.CloseClipboard()
# 		td = data.decode('utf-8')
# 		# print('getClipBoardContent ', td)
# 		return td
# 	else:
# 		pb = NSPasteboard.generalPasteboard()
# 		pbstring = pb.stringForType_(NSStringPboardType)
#         return pbstring.encode("utf-8")