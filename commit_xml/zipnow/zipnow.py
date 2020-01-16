# -*- coding: utf-8 -*

import os,time,sys
import subprocess,shutil

def try_create_dir(dst):
	pass
	if not os.path.exists(dst):
		os.makedirs(dst)

def copy_a_file(file_path,start_dir,dst_path):
	fp_arr = file_path.split('/')

	pt = False
	for dir1 in fp_arr[:-1]:
		if dir1 == start_dir:
			pt = dst_path

		if pt:
			pt = os.path.join(pt,dir1)
			try_create_dir(pt)

	shutil.copy(file_path, os.path.join(pt,os.path.basename(file_path)))

def main():
	pass
	client_dir = os.getenv('ClientDir')
	os.chdir(client_dir)

	show_cmd = ['git','show','--name-only']
	if len(sys.argv) > 1:
		for x in sys.argv[1:]:
			print(x)
			show_cmd.append(x)
	
	copy_files = []
	show_res = subprocess.check_output(show_cmd)
	for line in show_res.split('\n'):
		if line.count('IF/Resources') > 0 and not line in copy_files:
			copy_files.append(line)

	print(copy_files)

	client_temp__ = 'client_temp__'
	try_create_dir(client_temp__)

	src_dirs = []
	need_copys = ['lua_static','ccbi']
	for f in copy_files:
		copy_a_file(f,'Resources',client_temp__)
		for hd_dir in need_copys:
			if f.count(hd_dir) > 0 and not (hd_dir in src_dirs):
				src_dirs.append(hd_dir)


	root_dir = os.path.join(client_temp__,'Resources')
	localtime = time.localtime(time.time())

	mdir = os.path.join(client_dir, 'zip_code')

	subprocess.call(['rm','-rf',mdir])
	try_create_dir(mdir)
	dst_zip = '{6}/client_{0}_{1}_{2}_{3}_{4}_{5}.zip'.format(localtime.tm_year,localtime.tm_mon,
		localtime.tm_mday,localtime.tm_hour,localtime.tm_min,localtime.tm_sec,mdir)
	os.chdir(root_dir)
	subprocess.call(['pwd'])
	cmd_la = ['zip','-r',dst_zip]
	for dir1 in src_dirs:
		cmd_la.append(dir1)
	subprocess.call(cmd_la)
	subprocess.call(['open',mdir])
	os.chdir(client_dir)
	subprocess.call(['rm','-rf',client_temp__])

def test():
	la = [1,2,3,4]
	for x in la[:-1]:
		print(x)

if __name__ == '__main__':
	main()
