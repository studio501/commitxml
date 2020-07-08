import subprocess
import os,sys,shutil
import imghdr,json,zipfile,plistlib,biplist

fc = [
    "_cover",
    "_enable",
    "vuserpic",
    "th_",
    "snst_",
    "snsu_",
]

def file_extension(path): 
	return os.path.splitext(path)[1] 

def is_filter_extension(f):
    pass
    for x in fc:
        if x in f:
            return True
    return False

def is_json_file(f):
    try:
        with open(f,'r') as load_f:
            load_dict = json.load(load_f)
    except Exception as e:
        return False
    else:
        return True

def is_zip_file(f):
    return zipfile.is_zipfile(f)

def is_plist_file(f):
    try:
        pl=plistlib.readPlist(f)
    except Exception as e:
        return False
    else:
        return True

def is_biplist_file(f):
    try:
        pl=biplist.readPlist(f)
    except Exception as e:
        return False
    else:
        return True

def find_png(sourceDir,outer_arr,zipfiles):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir,f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(sourceF)
            if is_filter_extension(bf):
                continue
            what_type = imghdr.what(sourceF)
            if what_type == 'png' or what_type == 'jpg' or what_type == 'jpeg':
                ext = file_extension(sourceF)
                if ext == '.'+what_type:
                    outer_arr.append([sourceF,bf])
                else:
                    outer_arr.append([sourceF,bf + '.' +what_type ])
            else:
                if what_type == None:
                    # print('what_type here',what_type)
                    if False and is_json_file(sourceF):
                        outer_arr.append([sourceF,bf + '' if file_extension(sourceF) == '.json' else '.json'])
                    elif is_zip_file(sourceF):
                        zipfiles.append(sourceF)
                    elif is_plist_file(sourceF) or is_biplist_file(sourceF):
                        outer_arr.append([sourceF,bf + '' if file_extension(sourceF) == '.plist' else '.plist' ])
        elif os.path.isdir(sourceF):
            find_png(sourceF,outer_arr,zipfiles)

def try_create_dir(dst):
	pass
	if not os.path.exists(dst):
		os.makedirs(dst)

def unzip_to(zf,dst_dir):
    try_create_dir(dst_dir)
    with zipfile.ZipFile(zf, 'r') as zip_ref:
        zip_ref.extractall(dst_dir)
    
def main():
    if len(sys.argv) == 3:
        all_pngs = []
        zipfiles = []
        find_png(sys.argv[1],all_pngs,zipfiles)
        dst = sys.argv[2]
        try_create_dir(dst)
        for file in all_pngs:
            shutil.copy(file[0], os.path.join(dst,file[1]))

        for file in zipfiles:
            unzip_to(file, os.path.join(dst,file))


if __name__ == "__main__":
    main()   