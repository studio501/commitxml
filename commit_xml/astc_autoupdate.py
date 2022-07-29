# -*- coding: utf-8 -*
from __future__ import print_function
import shutil
import sys,os,re,subprocess,codecs,json
import myutils
import collections
import argparse, time

from datetime import datetime as dt

minigame_config = json.loads('''
{
    "formats": [
        {
            "name": "pvrtc_4bits_rgb",
            "quality": "best"
        },
        {
            "name": "png",
            "quality": 80
        }
    ]
}
''')

exclude_list = [
"dbba3980-f454-4e54-ab49-2b463db3cff4",
"cf5b2beb-4776-4545-89b2-6ece9922f416",
"bdc8affc-9f06-44b0-b95a-f3e45a97bc04",
"380ba840-e405-4028-9da1-bfb78ff15040",
"3952afe5-9621-4ab8-b2b4-20084e4d4474",
"933101fb-3358-4edc-ba05-8c86dae62dde",
"bad88b89-aa4d-4ef1-8445-228c992f3151",
"65bf74bb-d3b0-41b4-8366-e5bb935061f9",
"79dd34d0-2f9d-4687-aa50-2bb8549cca41",
"5a2ef622-548b-4d60-8088-130fa7796818",
"8a1953b1-16bc-4a74-8803-05df2171b196",
"2a23fc42-263a-4085-ad00-bd7be370a301",
"1cf55600-5bc0-40a4-b59b-8aab9ed3a017"
]

def is_inexcludelist(uuid):
    return uuid in exclude_list

def setMetafile(meta_file):
    print('start set astc config of {0} ...'.format(meta_file))

    json_data = None
    with open(meta_file,'r') as load_f:
        json_data = json.load(load_f, object_pairs_hook=collections.OrderedDict)
    
    json_data["platformSettings"]["minigame"] = minigame_config
    json_data["platformSettings"]["ios"] = minigame_config

    ts = json.dumps(json_data, encoding="utf-8", indent=2)

    lines_old = ts.split('\n')
    lines_new = []
    for i, line in enumerate(lines_old):
        lines_new.append(line.rstrip())

    content = '\n'.join(lines_new)

    with open(meta_file, "w") as f:
        f.write(content)

    print('set astc config of {0} successful'.format(meta_file))

def resolve_dir(in_dir):
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF):
            if f.count(".png.meta") == 1 and myutils.file_extension(f) == ".meta":
                setMetafile(sourceF)
        elif os.path.isdir(sourceF):
            resolve_dir(sourceF)

def remove_pngofdir(in_dir, back_up, ext=".png"):
    pass
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF):
            if sourceF.count('assets/internal') == 1:
                continue

            if myutils.file_extension(f) == ext:
                shutil.copy(sourceF, os.path.join(back_up, f))
                os.remove(sourceF)
                print('remove file {0} successful.'.format(sourceF))
        elif os.path.isdir(sourceF):
            remove_pngofdir(sourceF, back_up, ext)

def remove_pngbyfile(file_path):
    lines = myutils.get_file_lines(file_path)
    base_dir = os.getenv('TK_REMOTE')

    for i, line in enumerate(lines):
        if line.count(".png") == 1:
            fp = os.path.join(base_dir, line.rstrip())

            os.remove(fp)

            print('remove file {} successful.'.format(fp))

def get_uuid_ofmeta(meta_file):
    json_data = myutils.get_jsonfrom_file(meta_file)
    return json_data["uuid"]

def unset_astc(file_path):
    pass

    print("should revert",file_path)
    subprocess.call(['git','checkout','--',file_path])

def unset_astc_dir(in_dir):
    for f in os.listdir(in_dir):
        sourceF = os.path.join(in_dir,f)
        if os.path.isfile(sourceF):
            if f.count(".png.meta") == 1 and myutils.file_extension(f) == ".meta":
                uuid = get_uuid_ofmeta(sourceF)
                if is_inexcludelist(uuid):
                    unset_astc(sourceF)
        elif os.path.isdir(sourceF):
            unset_astc_dir(sourceF)

def main():
    parser = argparse.ArgumentParser(description='Usage of astc_autoupdate.py.')

    parser.add_argument('-s','--setastc',help='set astc of specify dir.')
    parser.add_argument('-r','--removepng',help='remove png of specify dir.')
    parser.add_argument('-ra','--removeastc',help='remove astc of specify dir.')
    parser.add_argument('-un','--unsetastc',help='unset astc of specify dir.')
    parser.add_argument('-f','--removepngbyfile',help='remove png of specify file.')

    args = parser.parse_args()

    if args.setastc:
        resolve_dir(args.setastc)
    elif args.unsetastc:
        pwd = os.getenv("TK_CLIENT")
        os.chdir(pwd)
        print("chdir ", pwd)
        unset_astc_dir(args.unsetastc)
    elif args.removepng:
        back_up = os.path.basename(args.removepng) + '_backup' + gettimestamp()
        myutils.ensure_dir(back_up, True)
        remove_pngofdir(args.removepng, back_up)

    elif args.removeastc:
        back_up = os.path.basename(args.removeastc) + '_backup' + gettimestamp()
        myutils.ensure_dir(back_up, True)
        remove_pngofdir(args.removeastc, back_up, ".pvr")
    elif args.removepngbyfile:
        remove_pngbyfile(args.removepngbyfile)

def gettimestamp():
    return dt.now().strftime(r'%m-%d-%H-%M-%S')

if __name__ == "__main__":
    main()