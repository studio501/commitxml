import subprocess
import os,sys,shutil,re
import imghdr,json,zipfile,plistlib,biplist
from PIL import Image
import urllib2

size_re = re.compile(r'size:\s* (\d+)\s*,\s*(\d+)')

fc = [
]

def get_png_size(file_name):
    im = Image.open(file_name)
    return im.size

def file_extension(path): 
	return os.path.splitext(path)[1]

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 

def is_json_file(f):
    try:
        with open(f,'r') as load_f:
            load_dict = json.load(load_f,"utf-8")
            return load_dict
    except Exception as e:
        return False
    else:
        return False


def is_num_equal(num1,num2):
    return abs(num2 - num1) < 2

def is_size_equal(size1,size2):
    return is_num_equal(int(size1[0]),int(size2[0])) and is_num_equal(int(size1[1]),int(size2[1]))



def try_create_dir(dst):
	pass
	if not os.path.exists(dst):
		os.makedirs(dst)

def unzip_to(zf,dst_dir):
    try_create_dir(dst_dir)
    with zipfile.ZipFile(zf, 'r') as zip_ref:
        zip_ref.extractall(dst_dir)

def test():
    
    abcd = 100

def save_one_file(data,base_dir,base_url):
    url = data["url"]
    bn = os.path.basename(url)
    dirn = os.path.dirname(url)

    relative_dir = os.path.join(base_dir,dirn)
    if not os.path.isdir(relative_dir):
        os.makedirs(relative_dir)

    try:
        contents = urllib2.urlopen("{0}{1}".format(base_url,url)).read()
        dst_file = os.path.join(relative_dir,bn)
        file_mode = 'w' if data["type"] == u"json" else 'wb'
        with open(dst_file, file_mode) as f:
            f.write(contents)
    except Exception as e:
        pass



    
def main():
    if len(sys.argv) == 4:
        src_json = sys.argv[1]
        dst_dir = sys.argv[2]
        base_url = sys.argv[3]

        js_data = is_json_file(src_json)

        all_dt = js_data["resources"]
        for i,x in enumerate( all_dt):
            save_one_file(x,dst_dir,base_url)

        a = 100


if __name__ == "__main__":
    main()   
    # test()