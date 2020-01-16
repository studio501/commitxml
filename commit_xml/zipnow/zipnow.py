# -*- coding: utf-8 -*

import os,time
import subprocess

def try_create_dir(dst):
	pass
	if not os.path.exists(dst):
		os.makedirs(dst)

def main():
	pass
	root_dir = '/Users/mac/Documents/my_projects/cok/client/IF/Resources'
	localtime = time.localtime(time.time())

	mdir = '{0}/../zip_code'.format(root_dir)

	subprocess.call(['rm','-rf',mdir])
	try_create_dir(mdir)
	dst_zip = '{6}/client_{0}_{1}_{2}_{3}_{4}_{5}.zip'.format(localtime.tm_year,localtime.tm_mon,
		localtime.tm_mday,localtime.tm_hour,localtime.tm_min,localtime.tm_sec,mdir)
	os.chdir(root_dir)
	subprocess.call(['pwd'])
	subprocess.call(['zip','-r',dst_zip,'ccbi','lua_static'])
	subprocess.call(['open',mdir])

if __name__ == '__main__':
	main()
