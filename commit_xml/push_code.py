# -*- coding: utf-8 -*
from __future__ import print_function
import zipfile
import sys,os,shutil,re
from os import listdir
from os.path import isfile, join
import subprocess

device_re = re.compile(r'(.*?)\s*device')

def isStringNil(str):
	return (not str) or str == ''

def is_number(str):
    try:
        # 因为使用float有一个例外是'NaN'
        if str=='NaN':
            return False
        float(str)
        return True
    except ValueError:
        return False

def my_input(msg,needNumber = None):
	while True:
		pass
		print(msg,end='')
		try:

			tmpStr = raw_input().rstrip()

			# handle number
			if not needNumber:
				return tmpStr

			splitStr = tmpStr.split(' ')
			lenStr = len(splitStr)

			be_number = True
			if lenStr > 1:
				for v in splitStr:
					be_number = be_number and (is_number(v) or isStringNil(tmpStr))
					if not be_number:
						break
			else:
				be_number = be_number and (is_number(tmpStr) or isStringNil(tmpStr))

			if be_number and tmpStr in needNumber:
				return tmpStr
			else:
				print(u'输入有误,请重新输入')
		except KeyboardInterrupt:
			print("\nInterrupted by user")
			sys.exit()

def main():
    pass
    if len(sys.argv) != 2:
        print(u'使用方法: 传入zip文件')
        return
    zip_file = sys.argv[1]

    all_simulators = get_devices()
    if len(all_simulators) == 0:
        try_restart_adb()
        all_simulators = get_devices()

    if len(all_simulators) == 0:
        print(u'!!!没有找到可用模拟器请重启下模拟器再试...')
        return
    

    which_pack = my_input(u'请选择测试包 内网(1)  beta75(2) cn1(3): ',['1','2','3'])

    pack_sign = None
    if which_pack == '1':
        pack_sign = 'com.clash.of.kings.inner'
    elif which_pack == '2':
        pack_sign = 'com.hcg.cok.beta'
    else:
        pack_sign = 'com.hcg.cok.cn1'


    dst_adb_path = '/data/data/{0}/files/hotres'.format(pack_sign)

    filename_noext = os.path.splitext(os.path.basename(zip_file))[0]
    zip_dir = os.path.dirname(zip_file)


    dst_path = os.path.join(zip_dir,filename_noext)
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        zip_ref.extractall(dst_path)

    need_copys = ['lua_static','ccbi']

    for f in os.listdir(dst_path):
        print(f)
        if f in need_copys:

            for simulator in all_simulators:
                subprocess.call(['adb','-s',simulator,'push',os.path.join(dst_path,f),dst_adb_path])

    
    # subprocess.call(['rm','-rf',dst_path])
    os.remove(zip_file)
    shutil.rmtree(dst_path)

def get_devices():
    in_str = subprocess.check_output(['adb','devices'])
    str_list = in_str.split('\n')
    res = []
    for line in str_list:
        if len(device_re.findall(line)) == 1 and line.count('List') == 0 and line.count('attached') == 0:
            res.append(device_re.sub(r'\1',line))

    return res

def try_restart_adb():
    subprocess.call(['adb','kill-server'])
    subprocess.call(['adb','start-server'])

def test():
    pass
    try_restart_adb()

if __name__ == "__main__":
    main()