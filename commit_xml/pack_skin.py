# -*- coding: utf-8 -*

# readme
# 需要设置系统变量 'InnerDyRes','OuterDyRes','OuterDyRes75','ClientDir' 为指定路径
# InnerDyRes 	: http://svn.xinggeq.com/svn/if/trunk/docs/locale
# OuterDyRes 	: http://svn.xinggeq.com/svn/if/branches/production/docs/locale
# OuterDyRes75 	: http://yourname@svn.xinggeq.com/svn/if/branches75/production/docs/locale
# ClientDir 	: http://svn.xinggeq.com/svn/if/trunk/src/client/CCB

from __future__ import print_function
import sys,os,re
import os
import os.path
import shutil,json
import subprocess
from xml.dom import minidom
import Tkinter as tk_lib
from tkFileDialog import askopenfilename
# from PIL import Image
# from io import StringIO
import warnings
import numpy
from functools import partial

from cStringIO import StringIO

OldRes_notWith_face = ['goods','avatar_icon','ArtUseRes']


Re1 = re.compile(r'realtime_(.+)_version=(.+)')
TpWarningRe = re.compile(r'TexturePacker:: warning:.*-\s*\((\d+)x(\d+)\)')
Number_re = re.compile(r'([+-]?\d+(?:\.\d+)?)')

InputNotice = [u"请输入皮肤名字: ",u"请输入铭牌名字: ",u"请输入聊天气泡名字: "]

OutPostfix = None

def is_number(str):
    try:
        # 因为使用float有一个例外是'NaN'
        if str=='NaN':
            return False
        float(str)
        return True
    except ValueError:
        return False

def svn_update(dir):
	subprocess.call(['svn','update',dir])

def svn_commit(dir,msg='auto commit by script.'):
	if type(dir) is str:
		subprocess.call(['svn','ci',dir,'-m',msg])
	else:
		raise_error('no such dir {}'.format(dir))


def find_item_now_version(str,itemName):
	
	group = Re1.findall(str)
	if group and len(group) == 1 and len(group[0]) == 2 and group[0][0] == itemName:
		return group[0][1]

	return None

def isStringNil(str):
	return (not str) or str == ''

def add_version_code(res,delta=1):
	res_len = len(res)
	if res_len != 3:
		raise_error('version code must have 3 number')
	last_num = int(res[res_len-1])
	mid_num = int(res[res_len-2])
	first_num = int(res[res_len-3])

	last_num = last_num + delta
	if last_num >= 100:
		last_num = 0
		mid_num = mid_num + 1
		if mid_num >= 100:
			mid_num = 0
			first_num = first_num + 1

	res[res_len-1] = str(last_num)
	res[res_len-2] = str(mid_num)
	res[res_len-3] = str(first_num)
	return res


def try_upgrade_LUATXT(svnDir,itemName,prevSvnDir = None):
	subprocess.call(['svn','update',svnDir])

	filename = os.path.join(svnDir,'LUA.txt')
	lines = []

	prev_inner_ver = None
	prev_version_code = None
	if prevSvnDir:
		prev_file = os.path.join(prevSvnDir,'LUA.txt')
		with open(prev_file,'r') as f:
			for line in f.readlines():
				version_code = find_item_now_version(line,itemName)
				if version_code:
					prev_version_code = version_code
					res = version_code.split('.')
					lastIdx = len(res) - 1
					prev_inner_ver = int(res[lastIdx])
					
				

	ci_msg = None
	with open(filename,'r') as f:
		for line in f.readlines():
			version_code = find_item_now_version(line,itemName)
			if version_code:
				next_code = None
				if prev_version_code:
					next_code = prev_version_code
				else:
					res = version_code.split('.')
					add_version_code(res)
					# lastIdx = len(res) - 1
					# midIdx = lastIdx - 1
					# highIdx = lastIdx - 2

					# now_ver = int(res[lastIdx])
					# next_ver = now_ver + 1

					# if next_ver >= 100:
					# 	now_ver_mid = int(res[midIdx])

					# res[lastIdx] = str(next_ver)
					next_code = '.'.join(res)


				print('now version',version_code)
				print('next version',next_code)
				line = line.replace(version_code,next_code)
				ci_msg = "LUA.txt upgrade {} from {} to {}".format(itemName,version_code,next_code)
			
			lines.append(line)

	with open(filename,'w') as f:
		for line in lines:
			f.write(line)

	print(ci_msg)
	return ci_msg

def make_choice(choiceList,callback):
	print(u'请选择: \n')
	for k,v in enumerate(choiceList):
		flag = k == 0 or k == 6 or k == 12 or k == 14 or k == 16
		tab_n = 3 if flag else 4
		print(u'{}: {}{}'.format(0 if (k == len(choiceList) - 1) else k+1,v,'\t' * tab_n if (k%2 == 0) else '\n'*2),end='')
	# print('\n')
	if len(choiceList) % 2 == 1:
		print('\n')
	op = my_input('',True)
	opv = len(choiceList) - 1 if op == '0' else numInRange( int(op) - 1,0,len(choiceList) - 1)
	callback(op,choiceList[opv])

def find_file_in_dir(directory,file_ex='94'):

	png_ext = '.png'

	if file_extension(directory) == png_ext:
		return directory

	for root, dirs, files in os.walk(directory):
	    for file in files:
	    	print("file is ",file)
	        if file.count(file_ex) == 1 and file.count(png_ext) == 1:
				print("will return ",file,"in find_file_in_dir")
				return os.path.join(root,file)

	    for td in dirs:
	    	s1 = find_file_in_dir(td,file_ex)
	    	if s1:
	    		return s1

	# raise_error('cannot find icon res in {}'.format(directory))

def open_json_file(f):
	with open(f,'r') as load_f:
  		load_dict = json.load(load_f)
  		return load_dict

def raise_error(msg,iwWarnning=False):
	print("{}!!!!!!!!!".format('Warnning' if iwWarnning else 'Error & abort'),'(',msg,')')
	if not iwWarnning:
		sys.exit()
	

def table_is_empty(tb):
	return not tb or len(tb) == 0

def table_contains(tb,s):
	for x in tb:
		if x == s:
			return True
	return False

def file_extension(path): 
	return os.path.splitext(path)[1] 

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 

def table_contains_string(tb,s):
	for x in tb:
		# print('s in x ====',s,x ,s in x)
		if s in x:
			return True
	return False

def check_png_name_(f,onlyWarning = False):
	dot = '.'
	endKey = '_'
	bn = os.path.basename(f)
	if f.count('_') > 0 and f[find_ch_in_str(f,dot)-1] != endKey:
		raise_error('{} not end with {}'.format(f,endKey),onlyWarning)

def check_png_name(sourceDir,prevs = None,endKey = '_'):
	pngExt = '.png'
	dot = '.'
	res = []
	for f in os.listdir(sourceDir):
		# print(f,pngExt,file_extension(f))
		ft = file_extension(f)
		if ft.lower() == pngExt and ft != pngExt:
			raise_error('{} not name with lower case'.format(os.path.basename(f)))
		if pngExt == file_extension(f):
			# print(f[find_ch_in_str(f,dot)-1])
			check_png_name_(f)
			res.append(os.path.basename(f))
	return res

def copy_file(sourceDir, targetDir, defList, ensureLastCh = '', specFiles = None):
	for f in os.listdir(sourceDir):
		sourceF = os.path.join(sourceDir,f)
		targetF = os.path.join(targetDir,f)
		# if isStringNil(ensureLastCh):
		# 	targetF = os.path.join(targetDir,f)
		# else:
		# 	targetF = os.path.join(targetDir,f)

		if os.path.isfile(sourceF):
			ext = file_extension(sourceF)
			check_specfiles = not specFiles or table_contains(specFiles,file_without_extension(sourceF))
			if check_specfiles and (table_is_empty(defList) or table_contains(defList,ext)):
				do_copy_file(sourceF,targetF)
		if os.path.isdir(sourceF):
			try_create_dir(sourceF)
			copy_file(sourceF,TargetDir,defList,ensureLastCh,specFiles)

def rename_file_bat(sourceDir, targetDir, defList, adjust = ''):
	for f in os.listdir(sourceDir):
		sourceF = os.path.join(sourceDir,f)
		targetF = os.path.join(targetDir,adjust + f)
		# if isStringNil(ensureLastCh):
		# 	targetF = os.path.join(targetDir,f)
		# else:
		# 	targetF = os.path.join(targetDir,f)

		if os.path.isfile(sourceF):
			ext = file_extension(sourceF)
			if table_is_empty(defList) or table_contains(defList,ext):
				do_copy_file(sourceF,targetF)
		if os.path.isdir(sourceF):
			try_create_dir(sourceF)
			copy_file(sourceF,TargetDir,defList)

def do_copy_file(src_file, dst):
	shutil.copy(src_file, dst)


def try_create_dir(dst):
	pass
	if not os.path.exists(dst):
		os.makedirs(dst)

def find_ch_in_str(s,ch):
	res = [i for i, ltr in enumerate(s) if ltr == ch]
	return table_is_empty(res) and -1 or res[0]

def write_to_file(f,str):
	# subprocess.run(["echo {} > {}".format(str,f)])
	f = open(f, "w")
	f.write(str)
	f.close()

def add_kv_to_str(str1,k,v):
	ext = str1 == '' and '{}={}'.format(k,v) or '\n{}={}'.format(k,v)
	str1 += ext
	return str1


def find_sk_json_file(src,json_ext='.json'):
	if not os.path.isdir(src):
		return None
	# json_ext = '.json'
	for f in os.listdir(src):
		if file_extension(f) == json_ext:
			return os.path.join(src,f)

	export_dir = os.path.join(src,'export')
	for f in os.listdir(export_dir):
		if file_extension(f) == json_ext:
			return os.path.join(export_dir,f)

	return None

def find_sk_atlas_file(src):
	return find_sk_json_file(src,'.atlas')

def find_plist_file(src):
	return find_sk_json_file(src,'.plist')

def crerate_config_file_march(skinparticle,dst,png_dir,anims,px=0,py=0):
	anma_ct = 1

	content=''
	content = add_kv_to_str(content,'skeletoncnt',anma_ct)
	content = add_kv_to_str(content,'skeleton{}'.format(1),'{},{},{},{}'.format(png_dir,px,py,1))

	pfix = '{}.config'.format(dst)
	fname = os.path.join(skinparticle,pfix)
	write_to_file(fname,content)


def crerate_config_file_wings(skinparticle,dst,png_dir,anims,px=0,py=0):
	anma_ct = 1

	content=''
	content = add_kv_to_str(content,'skeletoncnt',anma_ct)
	content = add_kv_to_str(content,'skeleton{}'.format(1),'{},{},{},{},{},{}'.format(dst,png_dir,anims,px,py,1))
	content = add_kv_to_str(content,'SkBeTop',1)

	pfix = '{}.config'.format(dst)
	fname = os.path.join(skinparticle,pfix)
	write_to_file(fname,content)


def crerate_config_file_sk_nameplate(skinparticle,dst,png_dir,anims,px=0,py=-40):
	anma_ct = 1

	content=''
	content = add_kv_to_str(content,'scalex',1)
	content = add_kv_to_str(content,'scaley',1)
	content = add_kv_to_str(content,'anchorptx',0.5)
	content = add_kv_to_str(content,'anchorpty',0.5)
	content = add_kv_to_str(content,'posx',10)
	content = add_kv_to_str(content,'posy',40)
	content = add_kv_to_str(content,'hidewangguan',1)
	content = add_kv_to_str(content,'skeletoncnt',anma_ct)
	content = add_kv_to_str(content,'skeleton{}'.format(1),'{},{},{},{},{},{}'.format(dst,png_dir,anims,px,py,1))

	pfix = '{}.config'.format(dst)
	fname = os.path.join(skinparticle,pfix)
	write_to_file(fname,content)

def crerate_config_file_castle(skinparticle,dst,png_dir,anims,px=0,py=0,jsName=None):
	jsFile = jsName if jsName else dst
	anma_ct = 1
	content=''
	content = add_kv_to_str(content,'cz_state',1)
	content = add_kv_to_str(content,'skeletoncnt',anma_ct)
	content = add_kv_to_str(content,'skeleton{}'.format(1),'{},{},{},{},{},{}'.format(jsFile,png_dir,anims,px,py,1))
	content = add_kv_to_str(content,'hideNative',1)

	pfix = '{}.config'.format(dst)
	fname = os.path.join(skinparticle,pfix)
	write_to_file(fname,content)


def crerate_config_file(skinparticle,dst,png_dir,anims,px=0,py=0,cfg_type=0,jsName=None):
	if cfg_type == 0:
		crerate_config_file_castle(skinparticle,dst,png_dir,anims,px,py,jsName)
	elif cfg_type == 1:
		crerate_config_file_wings(skinparticle,dst,png_dir,anims,px,py)
	elif cfg_type == 2:
		crerate_config_file_march(skinparticle,dst,png_dir,anims,px,py)
	elif cfg_type == 3:
		crerate_config_file_sk_nameplate(skinparticle,dst,png_dir,anims,px,py)

def crerate_config_file_for_png(skinparticle,dst,png_dir,anims,px=10,py=40):
	# anma_ct = len(anims)
	content=''
	content = add_kv_to_str(content,'scalex',1)
	content = add_kv_to_str(content,'scaley',1)
	content = add_kv_to_str(content,'anchorptx',0.5)
	content = add_kv_to_str(content,'anchorpty',0.5)
	content = add_kv_to_str(content,'posx',px)
	content = add_kv_to_str(content,'posy',py)
	content = add_kv_to_str(content,'hidewangguan',1)

	# for v in outPostfix:
	pfix = '{}.config'.format(dst)
	fname = os.path.join(skinparticle,pfix)
	write_to_file(fname,content)

def crerate_config_file_for_png1(skinparticle,dst,png_dir,anims,px=10,py=40):
	content=''
	content = add_kv_to_str(content,'leftGap',22)
	content = add_kv_to_str(content,'rightGap',22)
	content = add_kv_to_str(content,'topGap',33)
	content = add_kv_to_str(content,'bottomGap',30)
	content = add_kv_to_str(content,'anchorX',0.1)

	# for v in outPostfix:
	pfix = '{}.config'.format(dst)
	fname = os.path.join(skinparticle,pfix)
	write_to_file(fname,content)


	

def get_export_config(export_cfg):
	if export_cfg:
		json_data = open_json_file(export_cfg)
		return json_data
	else:
		json_dict = {'out':{'skeletoncnt':1,'act_name':'dj'}}
		return json.dumps(json_dict)

def numInRange(n,minNum,maxNum):
	return max(minNum,min(n,maxNum))

def gen_tps_file(dst,dst_full_path,fname,src_file):

	dst_file = os.path.join(dst_full_path,fname)
	if not os.path.exists(src_file):
		raise_error('need template tps in Documents')


	src_str = 'template' #'sk_template' if png_format else 'template'
	dst_str = dst

	do_copy_file(src_file,dst_file)


	fp = open(dst_file,"r")
	result = fp.read()
	fp.close()

	fp = open(dst_file,"w")
	use_multi_atlas = dst_str.count('{n}') == 1
	if use_multi_atlas:
		o_name = dst_str[:dst_str.find('{n}')]
		result = re.sub(src_str,o_name,result)
		# fp.seek(0,0)
		result = re.sub(o_name,dst_str,result,2)
		# fp.seek(0,0)

		result = re.sub('multiPack</key>\n        <false','multiPack</key>\n        <true',result)
	else:
		result = re.sub(src_str,dst_str,result)
	# max_count = 2 if dst_str.count('{n}') else 0
	# result = re.sub(src_str,dst_str,result,max_count)


	fp.seek(0,0)
	fp.write(result)
	fp.close()



def try_commit_svn(files,directory='.',ci_msg='auto commit by pack_skin',is_commit=False):
	old_dir = os.getcwd()
	os.chdir(directory)
	subprocess.call(['svn','update','.'])
	res = subprocess.check_output(['svn','status'])
	if res != '':
		# print('resss',res)
		is_ci = is_commit or my_input("do the commit(y/n)?")
		# print(is_ci)
		if is_ci == 'y':
			for k,v in enumerate(files):
				subprocess.call(['svn','add',v,'--force'])
			subprocess.call(['svn','ci','.','-m {}'.format(ci_msg)])

	os.chdir(old_dir)

def copy_just__(innerDyRes,outout_zips):
	dst_pts = []
	for v in outout_zips:
		dst_pt = os.path.join(innerDyRes,v)
		dst_pts.append(dst_pt)
		# shutil.move(v, dst_pt)
		do_copy_file(v,dst_pt)
	# try_commit_svn(outout_zips,innerDyRes,ci_msg)

def copy_just_nomove__(innerDyRes,outout_zips):
	for v in outout_zips:
		dst_pt = os.path.join(innerDyRes,os.path.basename(v))
		do_copy_file(v,dst_pt)

def copy_and_commit(innerDyRes,outout_zips,ci_msg):
	dst_pts = []
	for v in outout_zips:
		dst_pt = os.path.join(innerDyRes,v)
		dst_pts.append(dst_pt)
		shutil.move(v, dst_pt)
	try_commit_svn(outout_zips,innerDyRes,ci_msg)


def safe_get_arr(arr,index,default):
	if len(arr) >= index + 1:
		return arr[index]
	return '{}{}'.format(default,index)

def try_add_front_underline(str1):
	if isStringNil(str1) or str1 == 'in':
		return ""
	if str1[0] != '_':
		return '_'+str1
	return str1

def get_back_underline__(str1):
	strlen = len(str1)
	if str1[strlen -1] != '_':
		return str1 + '_',True
	return str1,False

def try_add_back_underline(str1):
	if isStringNil(str1):
		return ""
	
	if file_extension(str1) == '.png':
		sa = str1.split('.')
		fn = sa[len(sa) - 2]
		
		str2,add = get_back_underline__(fn)
		if add:
			return str2 + '.png'
		else:
			return str1
	
	return str1


def pack_head_frame():
	pass
	dst = my_input(InputNotice[0]).rstrip()
	if dst.count('HeadFrame') == 0:
		raise_error('must start with HeadFrame')

	try_clean_dst(dst)
	# 路径定义
	current_dir = os.getcwd()
	auto_pack_shell = './auto_packer_lz4.sh'
	resPath = os.path.join( current_dir,'../dynamicResource/')
	subprocess.call(['svn','update',resPath])

	dst_full_path = os.path.join(resPath,dst)

	no_need_modify_tps = my_input("是否跳过产生配置文件(y/n)? ").rstrip()
	if no_need_modify_tps == 'y':

		subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
		post_packer(dst,'auto commit '+ dst)
		return

	srcs = my_input(u'请拖入资源(.png) 可多个: ').rstrip()
	srcs = try_copy_icon(srcs,dst)
	# iconNames = my_input(u'请输入像框名 与资源一一对应: ').rstrip().split(' ')

	try_create_dir(dst_full_path)
	for i,src_file in enumerate(srcs):
		iconName = '{}_{}'.format(dst,i+1)
		dst_file = os.path.join(dst_full_path,'{}.png'.format(iconName))
		do_copy_file(src_file,dst_file)
	
	subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
	post_packer(os.path.basename(dst))

def pack_icon__(dist,file_ex='94'):
	try_clean_dst(dist)
	src = my_input(u'请拖入资源 可多个: ').rstrip().split(' ')
	iconNames = my_input(u'请输入图标名 与资源一一对应: ').rstrip().split(' ')

	current_dir = os.getcwd()
	dst_full_path = os.path.join( current_dir,'../dynamicResource/',dist)
	subprocess.call(['svn','update', dst_full_path])

	icon_png = []
	for s in src:
		icon_png.append(find_file_in_dir(s,file_ex))

	# print('icon_png',icon_png)
	png_dir = 'prop' if file_ex == '94' else 'avatar_icon'
	if len(icon_png) > 0:
		dst_pngs = []
		for i,src_file in enumerate(icon_png):
			# src_file = icon_png[0]
			iconName = iconNames[i]
			dst_file = os.path.join(dst_full_path,png_dir,'{}.png'.format(iconName))
			do_copy_file(src_file,dst_file)
			dst_pngs.append(dst_file)

		# print('dst_file is',dst_pngs)
		subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
		post_packer(os.path.basename(dist),'auto commit LUA.txt.')


		subprocess.call(['svn','add',' '.join(dst_pngs),'--force'])
		svn_commit(dst_full_path)


def pack_icon():
	dist = my_input(u'请输入要发布的goods名 例如:goods_01: ').rstrip()
	pack_icon__(dist,'94')
	
def pack_icon_with_file(json_cfg):
	subprocess.call(['svn','update',os.getenv('InnerDyRes')])

	if len(json_cfg.split()) == 0:
		print(u'打包图标并提交')
		dists = ['goods_03','avatar_icon','goods_02','goods_01','goods']
		current_dir = os.getcwd()

		for dist in dists:
			dst_full_path = os.path.join( current_dir,'../dynamicResource/',dist)
			modify_flag = subprocess.check_output(['svn','st',dst_full_path]) != ''
			if not modify_flag:
				continue
			
			print(u'更新并提交',dist)
			subprocess.call(['svn','update', dst_full_path])
			subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
			post_packer(os.path.basename(dist),'auto commit LUA.txt.')
			svn_add_and_commit(dst_full_path)
		return

	js_data = open_json_file(json_cfg)

	dists = []

	dist = js_data['dst']
	dists.append(dist)
	dist_avatar = js_data.get('dst_avatar')
	if dist_avatar:
		dists.append(dist_avatar)

	for dist in dists:
		iconKey = 'avatarName' if dist == 'avatar_icon' else 'iconName'
		srcKey = 'src_avatar' if dist == 'avatar_icon' else 'src'
		files = js_data['files']

		try_clean_dst(dist)

		current_dir = os.getcwd()
		dst_full_path = os.path.join( current_dir,'../dynamicResource/',dist)
		subprocess.call(['svn','update', dst_full_path])

		png_dir = 'avatar_icon' if dist == 'avatar_icon' else 'prop'
		dst_pngs = []
		for v in files:
			iconName = v.get(iconKey)
			src_file = v.get(srcKey)
			if iconName and src_file:
				dst_file = os.path.join(dst_full_path,png_dir,'{}.png'.format(iconName))

				do_copy_file(src_file,dst_file)
				dst_pngs.append(dst_file)
		if len(dst_pngs) > 0:
			subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
			post_packer(os.path.basename(dist),'auto commit LUA.txt.')

		svn_add_and_commit(dst_full_path)
		

def svn_add_and_commit(path,msg='auto commit pack res.'):
	subprocess.call(['svn','add', path, '--force'])
	subprocess.call(['svn','ci', path, '-m"{}"'.format(msg)])

def pack_multi_skin_and_commit(skins):
	pass
	current_dir = os.getcwd()
	dynamicResource = os.path.join( current_dir,'../dynamicResource/')

	msgs = []
	for dist in skins:
		try_clean_dst(dist)
		dst_full_path = os.path.join(dynamicResource,dist)
		subprocess.call(['svn','update', dst_full_path])

		subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
		msgs.append( post_packer(os.path.basename(dist),'','y','y'))

		if dist.count('goods_') == 1 or dist.count('avatar_icon') == 1:
			svn_add_and_commit(dst_full_path)

	# auto pack icon
	pack_icon_with_file('')

	print(msgs)

def pack_avatar_icon():
	dist = 'avatar_icon'
	pack_icon__(dist,'128')


def post_packer(dst,ci_msg='',is_ci=False,is_commit=False):
	show_msg_box("pack dynamic resource complete" if ci_msg == '' else ci_msg)
	# 计算md5值
	outout_zips = ['dr_{}_android.zip'.format(dst),'dr_{}_ios.zip'.format(dst)]
	print(outout_zips)
	if ci_msg == '':
		md5_output = []
		for v in outout_zips:
			if os.path.exists(v):
				res = subprocess.check_output(['md5',v])
				md5_output.append(res.rstrip())

		if OutPostfix:
			for x in OutPostfix:
				md5_output.append('anima: {0}'.format(x))
		ci_msg = str(md5_output)
	
	ci_msg = ci_msg or "auto commit by pack_skin script."
	print(ci_msg)
	# 拷贝和提交
	publis_dirs = ['InnerDyRes']
	for k,v in enumerate(publis_dirs):
		is_ci = is_ci or my_input('copy and commit {} (y/n)?'.format(v))
		if is_ci == 'y':
			svn_dir = os.getenv(v)
			copy_just__(svn_dir,outout_zips)

			
			if ci_msg == 'auto commit LUA.txt.':
				is_upgrade = my_input('upgrade LUA.txt (y/n)?')
				if is_upgrade == 'y':
					ci_msg = try_upgrade_LUATXT(svn_dir,dst) or "auto commit by pack_skin script."
					outout_zips.append('LUA.txt')
					try_commit_svn(outout_zips,svn_dir,ci_msg)
			else:
				try_commit_svn(outout_zips,svn_dir,ci_msg,is_commit)

	return ci_msg

def post_packer_inner(ci_msg=''):
	outout_zips = my_input(u'请拖入资源').split()
	for i,v in enumerate(outout_zips):
		outout_zips[i] = os.path.basename(v)
	# 计算md5值
	# outout_zips = ['dr_{}_android.zip'.format(dst),'dr_{}_ios.zip'.format(dst)]
	# print(outout_zips)
	if ci_msg == '':
		md5_output = []
		for v in outout_zips:
			if os.path.exists(v):
				res = subprocess.check_output(['md5',v])
				md5_output.append(res.rstrip())
		ci_msg = str(md5_output)
	
	ci_msg = ci_msg or "auto commit by pack_skin script."
	print(ci_msg)
	# 拷贝和提交
	publis_dirs = ['InnerDyRes']
	for k,v in enumerate(publis_dirs):
		is_ci = my_input('copy and commit {} (y/n)?'.format(v))
		if is_ci == 'y':
			svn_dir = os.getenv(v)
			copy_just__(svn_dir,outout_zips)
			try_commit_svn(outout_zips,svn_dir,ci_msg)

def try_clean_dst(dst):
	dsts = ['dr_{}_android.zip'.format(dst),'dr_{}_ios.zip'.format(dst),'temp']
	for v in dsts:
		if os.path.exists(v):
			subprocess.call(['rm','-rf',v])

def fill_with_zero(pos):
	if table_is_empty(pos):
		for i in range(10):
			pos.append('0')
	elif pos[0] == '':
		pos[0] = '0'
		for i in range(9):
			pos.append('0')

def get_image_dir(src):
	imgs = ['images','image','Images','Image']
	for dir_ in imgs:
		p = os.path.join(src,dir_)
		if os.path.exists(p):
			return p
	raise_error('cannot find any image dir in' + src)

def pack_dynamic_res():
	pass
	dst = my_input(u"请输入动态资源包名字: ").rstrip()
	srcs = my_input(u"请拖入资源: ").rstrip()
	srcs = try_copy_icon(srcs,dst)
	# skinName
	# my_input("enter skin name: ").rstrip()
	try_clean_dst(dst)
	# 路径定义
	current_dir = os.getcwd()
	# auto_pack_shell = './auto_packer_lz4.sh'
	resPath = os.path.join( current_dir,'../dynamicResource/')
	subprocess.call(['svn','update',resPath])

	dst_full_path = os.path.join(resPath,dst)

	tmp_tps_file_default = './pack_skin_template/_alpha_template.tps'

	subprocess.call(['rm','-rf',dst_full_path])

	try_create_dir(dst_full_path)

	one_dir = len(srcs) == 1
	cache_pngs = []
	for idx,src in enumerate(srcs):
		img_dir = src #get_image_dir(src)
		bs = os.path.basename(src)
		sk_name = dst if one_dir else bs #+ ('' if len(srcs) == 1 else try_add_front_underline(safe_get_arr(outPostfix,idx,'out')))
		atlas_name = sk_name
		pd = dst if one_dir else bs
		png_dir = os.path.join(dst_full_path,pd) 
		print('png_dir is ',png_dir)
		try_create_dir(png_dir)

		# 拷贝小图
		copy_file(img_dir,png_dir,['.png'])


		# 创建tps文件
		tps_name = '_alpha_{}.tps'.format(sk_name)
		tmp_tps_file = tmp_tps_file_default
		gen_tps_file(sk_name,dst_full_path,tps_name,tmp_tps_file)

def change_file_ext(file_path,new_ext):
	return os.path.join(os.path.dirname(file_path),os.path.splitext(os.path.basename(file_path))[0] + new_ext )

def get_animation_names(json_file):
	json_data = open_json_file(json_file)
	anims = []
	for k in json_data['animations']:
		anims.append(k)
	return anims

def check_all_animas(srcs):
	for idx,src in enumerate(srcs):
		json_file = find_sk_json_file(src)
		if json_file:
			json_data = open_json_file(json_file)
			anims = []
			for k in json_data['animations']:
				anims.append(k)
			print(os.path.basename(json_file), u'所有动画名:',anims)

def pack_skin_with_animation(skinName,srcs,outPostfix,pos,noClean=False,cfg_type=0):
	pass
	dst = skinName
	# my_input("enter skin name: ").rstrip()
	try_clean_dst(dst)
	# 路径定义
	current_dir = os.getcwd()
	auto_pack_shell = './auto_packer_lz4.sh'
	resPath = os.path.join( current_dir,'../dynamicResource/')
	subprocess.call(['svn','update',resPath])

	dst_full_path = os.path.join(resPath,dst)

	without_gen_config = my_input(u"不产生 config 文件(y/n)? ").rstrip() == 'y'

	# 是否使用多atlas
	use_multi_atlas = False #my_input(u"是否合并多个atlas (y/n)? ").rstrip() == 'y'

	# if no_need_modify_tps == 'y':
	# 	print('pack & copy & commit')

	# 	if os.path.exists(dst_full_path):
	# 		subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
	# 		post_packer(dst)
	# 	else:
	# 		print(u'{} 不存在'.format(dst_full_path))
	# 	return


	tmp_tps_file_default = './pack_skin_template/_alpha_sk_template.tps'

	if not noClean:
		subprocess.call(['rm','-rf',dst_full_path])
	try_create_dir(dst_full_path)

	skinparticle = os.path.join(dst_full_path,'skinparticle')
	try_create_dir(skinparticle)

	cache_pngs = []
	tps_files = []
	for idx,src in enumerate(srcs):
		img_dir = get_image_dir(src)
		# 检查美术给的图片命名是否正确
		allpngs = check_png_name(img_dir,cache_pngs)
		cache_pngs.append(allpngs)

		sk_name = dst + try_add_front_underline(safe_get_arr(outPostfix,idx,'out'))
		atlas_name = 'sk_' + sk_name

		png_dir = os.path.join(dst_full_path,atlas_name)
		try_create_dir(png_dir)

		post_ext = '{n}' if use_multi_atlas else ''
		# 拷贝小图
		# copy_file(os.path.join(src,'images'),png_dir,['.png'])
		copy_file(img_dir,png_dir,['.png'])

		# 创建tps文件
		tps_name = '_alpha_sk_{}.tps'.format(sk_name)
		tmp_tps_file = tmp_tps_file_default
		tps_file = os.path.join(dst_full_path,tps_name)
		# tps_files.append(tps_file)
		gen_tps_file(sk_name + post_ext,dst_full_path,tps_name,tmp_tps_file)

		# 粒子文件
		plist_file = find_plist_file(src)
		if plist_file:
			print(u'该皮肤含有粒子',plist_file)
			# png_file = change_file_ext(plist_file,'.png')
			# do_copy_file(plist_file,os.path.join(skinparticle,os.path.basename(plist_file)))
			# do_copy_file(png_file,os.path.join(skinparticle,os.path.basename(png_file)))

		js_name = atlas_name if (cfg_type == 2) else sk_name
		# 处理骨骼动画
		sk_json_file = os.path.join(skinparticle,js_name + '.json')
		# print('find_sk_json_file ',find_sk_json_file(src),sk_json_file)
		do_copy_file(find_sk_json_file(src),sk_json_file)

		json_data = open_json_file(sk_json_file)

		anims = []
		for k in json_data['animations']:
			anims.append(k)
		ti = idx * 2
		tj = idx * 2 + 1
		px = pos[ti]
		py = pos[tj]

		if not without_gen_config:
			cfgs_names = adjust_config_postfix(srcs,outPostfix,anims,sk_name,dst)
			for j,tv in enumerate(cfgs_names):
				# 创建config文件
				# crerate_config_file(skinparticle,sk_name,atlas_name,anims,px,py)
				crerate_config_file(skinparticle,tv,atlas_name,anims[j],px,py,cfg_type,js_name)
		# # 创建tps文件
		# tps_name = '_alpha_sk_{}.tps'.format(sk_name)
		# tmp_tps_file = tmp_tps_file_default
		# tps_file = os.path.join(dst_full_path,tps_name)
		# tps_files.append(tps_file)
		# gen_tps_file(sk_name,dst_full_path,tps_name,tmp_tps_file)

	for x in tps_files:
		adjust_tps_file_scale(x)

	is_modify_tps = my_input(u"是否需要修改 tps 文件 (y/n)?")
	if is_modify_tps == 'y':
		return

	# 调用 auto_packer_lz4 脚本ss
	# subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
	subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])


	# 打包之后的处理
	post_packer(dst)

def adjust_config_postfix(srcs,outPostfix,anims,sk_name,dst):
	len_srcs = len(srcs)
	len_out = len(outPostfix)
	len_anims = len(anims)

	delta = len_out - len_srcs
	if delta > 0 and len_out == len_anims:
		res = [sk_name]
		for i in range(delta):
			res.append(dst + try_add_front_underline(safe_get_arr(outPostfix,i+1,'out')))
		return res

	return [sk_name]


def publish_outernet():
	subprocess.call(['svn','update',os.getenv('InnerDyRes')])

	publis_dirs = ['OuterDyRes','OuterDyRes75']

	outout_zips_before = None
	has_luatxt_before = None
	for k,v in enumerate(publis_dirs):
		is_ci = my_input('copy and commit {} (y/n)?'.format(v))
		if is_ci == 'y':
			svn_dir = os.getenv(v)
			if not svn_dir:
				raise_error('no svn dir')

			subprocess.call(['svn','update',svn_dir])

			outout_zips = outout_zips_before or my_input('input copy files split with blank: ').rstrip().split(' ')
			has_luatxt = has_luatxt_before or my_input('upgrade LUA.txt item eg:goods_01: ').rstrip().split(' ')
			outout_zips_before = outout_zips[:]
			has_luatxt_before = has_luatxt

			copy_just_nomove__(svn_dir,outout_zips)
			for i,v in enumerate(outout_zips):
				outout_zips[i] = os.path.basename(v)

			ci_msg = ""
			if not table_is_empty(has_luatxt) and has_luatxt[0] != '':
				inner_dir = os.getenv('InnerDyRes')
				for i,hv in enumerate( has_luatxt):
					ci_msg += (try_upgrade_LUATXT(svn_dir,hv,inner_dir) or "auto commit by pack_skin script." + ('' if i == (len(has_luatxt) - 1) else ';' ))
				outout_zips.append('LUA.txt')
			else:
				ci_msg = "auto commit by pack_skin script."

			# print(ci_msg)
			print(outout_zips,ci_msg)
			try_commit_svn(outout_zips,svn_dir,ci_msg)

def add_particle_png():
	pass

	png_names = my_input("请输入粒子图片路径(可多个): ").split()
	client_dir = os.getenv('ClientDir')
	dist_dir = os.path.join(client_dir,'CCB/IF')
	svn_update(dist_dir)

	output_dir = os.path.join(client_dir,'IF/Resources/World')
	svn_update(output_dir)

	par_dir = os.path.join(dist_dir,'Particle')
	world_dir = os.path.join(dist_dir,'World')

	png_base_names = []
	for v in png_names:
		bn = os.path.basename(v)
		png_base_names.append(bn)
		do_copy_file(v,os.path.join(par_dir,bn))

	tps_name = os.path.join(world_dir,'_alpha_Particle.tps')
	subprocess.call(['TexturePacker',tps_name])


	ci_dirs = [par_dir,world_dir,output_dir]
	svn_commit(' '.join(ci_dirs),'modify world particle add {}'.format(','.join(png_base_names)))

def add_png_to_package(skinName,dist_full_path,file_path):
	pdir = os.path.join(dist_full_path,skinName)
	try_create_dir(pdir)

	# tpsName = os.path.join(dist_full_path,'{}.tps'.format(skinName))
	gen_tps_file(skinName,dist_full_path,'_alpha_{}.tps'.format(skinName),'./pack_skin_template/_alpha_template.tps')
	do_copy_file(file_path,os.path.join(pdir,'{}.png'.format(skinName)))

def add_blank_png_for_inner_castle(skinName,dist_full_path):
	add_png_to_package(skinName,dist_full_path,'./pack_skin_template/template.png')


def pack_skin_with_png(dst,srcs,outPostfix,pos,pt):
	# dst = my_input("enter skin name: ").rstrip()
	try_clean_dst(dst)
	# 路径定义
	current_dir = os.getcwd()
	auto_pack_shell = './auto_packer_lz4.sh'
	resPath = os.path.join( current_dir,'../dynamicResource/')
	svn_update(resPath)

	dst_full_path = os.path.join(resPath,dst)

	no_need_modify_tps = my_input(u"是否跳过产生配置文件(y/n)? ").rstrip()
	if no_need_modify_tps == 'y':
		subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
		post_packer(dst)
		return

	fill_with_zero(pos)

	tmp_tps_file_default = './pack_skin_template/_alpha_template.tps'

	subprocess.call(['rm','-rf',dst_full_path])
	try_create_dir(dst_full_path)

	skinparticle = os.path.join(dst_full_path,'skinparticle')
	try_create_dir(skinparticle)

	cache_pngs = []
	for idx,src in enumerate(srcs):
		# 检查美术给的图片命名是否正确

		# check_png_name_(src,True)

		sk_name = dst # + try_add_front_underline(safe_get_arr(outPostfix,idx,'out'))
		atlas_name = sk_name
		png_dir = os.path.join(dst_full_path,atlas_name) 
		try_create_dir(png_dir)
		# print(png_dir)

		# 拷贝小图

		# pc = try_add_back_underline(os.path.basename(src))

		do_copy_file(src,os.path.join(png_dir, atlas_name+'.png'))


		ti = idx * 2;
		tj = idx * 2 + 1;
		px = pos[ti]
		py = pos[tj]

		if pt == 0:
			# 创建config文件
			crerate_config_file_for_png(skinparticle,sk_name,atlas_name,None,px,py)
		elif pt == 1:
			crerate_config_file_for_png1(skinparticle,sk_name,atlas_name,None,px,py)
		# 创建tps文件
		tps_name = '_alpha_{}.tps'.format(sk_name)
		tmp_tps_file = tmp_tps_file_default
		# print('use tmp_tps_file',tmp_tps_file)
		gen_tps_file(sk_name,dst_full_path,tps_name,tmp_tps_file)

	is_modify_tps = my_input(u"是否需要修改 tps 文件 (y/n)?")
	if is_modify_tps == 'y':
		return

	# 调用 auto_packer_lz4 脚本ss
	subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])

	# 打包之后的处理
	post_packer(dst)

def rename_png_bat():
	pc = my_input("enter src directory: ").rstrip()
	pd = my_input("enter dist directory: ").rstrip()
	try_create_dir(pd)
	adjustKey = my_input("enter adjustKey: ").rstrip()
	adjustKey = 'a1' if adjustKey == '' else adjustKey
	rename_file_bat(pc,pd,['.png'],adjustKey)





def show_msg_box(msg):
	str1 = 'Tell application "System Events" to display dialog "{}" with title "Pack complete"'.format(msg)
	subprocess.call(['osascript','-e',str1])


def try_copy_icon(srcs,dst):
	srcs = srcs.split(' ')
	res = []
	icons = []
	for i,v in enumerate(srcs):
		if v.count('94.png') == 1:
			icons.append(['icon',v,'goods_03'])
		elif v.count('128.png') == 1:
			icons.append(['avatar_icon',v,'avatar_icon'])
		else:
			res.append(v)
	if not table_is_empty(icons):
		current_dir = os.getcwd()
		for x in icons:
			dst_full_path = os.path.join( current_dir,'../dynamicResource/',x[2])
			subprocess.call(['svn','update', dst_full_path])

			dist = x[0]
			png_dir = 'avatar_icon' if dist == 'avatar_icon' else 'prop'
			iconName = 'avatar_zhanshi_{0}'.format(dst) if dist == 'avatar_icon' else 'icon_{0}'.format(dst)
			src_file = x[1]
			dst_file = os.path.join(dst_full_path,png_dir,'{}.png'.format(iconName))
			do_copy_file(src_file,dst_file)

	return res

def pack_inner_castle():
	dst = my_input(InputNotice[0]).rstrip()
	try_clean_dst(dst)
	# 路径定义
	current_dir = os.getcwd()
	auto_pack_shell = './auto_packer_lz4.sh'
	resPath = os.path.join( current_dir,'../dynamicResource/')
	subprocess.call(['svn','update',resPath])

	dst_full_path = os.path.join(resPath,dst)

	no_need_modify_tps = my_input("是否跳过产生配置文件(y/n)? ").rstrip()
	if no_need_modify_tps == 'y':

		subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
		post_packer(dst)
		return

	srcs = my_input("请拖入资源(可多个): ").rstrip()
	srcs = try_copy_icon(srcs,dst)
	check_all_animas(srcs)

	outPostfix = my_input("请输入文件后缀名,例:_out 多个用空格隔开: ").rstrip()
	# 输出文件后缀名
	outPostfix = outPostfix.split(' ')

	pos = my_input("请输入位置,按照顺序 x y x y: 内城位置参考 230 75 外城位置参考 120 45: ",True).rstrip().split(' ')
	fill_with_zero(pos)

	try_create_dir(dst_full_path)

	add_blank_png_for_inner_castle(dst,dst_full_path)
	pack_skin_with_animation(dst,srcs,outPostfix,pos,True)

def pack_without_face(cfg_type = 0):
	pack_outer_castle(cfg_type,True)

def pack_outer_castle(cfg_type = 0,skip_face=False):

	dst = my_input(InputNotice[0],None,skip_face).rstrip()
	try_clean_dst(dst)
	# 路径定义
	current_dir = os.getcwd()
	auto_pack_shell = './auto_packer_lz4.sh'
	resPath = os.path.join( current_dir,'../dynamicResource/')
	subprocess.call(['svn','update',resPath])

	dst_full_path = os.path.join(resPath,dst)

	no_need_modify_tps = my_input("是否跳过产生配置文件(y/n)? ").rstrip()
	if no_need_modify_tps == 'y':

		subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
		post_packer(dst)
		return

	srcs = my_input("请拖入资源(可多个): ").rstrip()
	srcs = try_copy_icon(srcs,dst)
	print('srcs here',srcs)
	check_all_animas(srcs)

	outPostfix = my_input("请输入文件后缀名,例:_out 多个用空格隔开: ").rstrip()
	# 输出文件后缀名
	outPostfix = outPostfix.split(' ')
	if not table_is_empty(outPostfix) and not isStringNil(outPostfix[0]):
		global OutPostfix
		OutPostfix = outPostfix

	pos = my_input("请输入位置,按照顺序 x y x y: 外城位置参考 120 45: ",True).rstrip().split(' ')
	fill_with_zero(pos)

	pack_skin_with_animation(dst,srcs,outPostfix,pos,False,cfg_type)

def pack_inner_outer_castle():
	pack_inner_castle()

def pack_nameplate_png(pt=0):
	iidx = 1 if pt == 0 else 2
	dst = my_input(InputNotice[iidx]).rstrip()
	try_clean_dst(dst)
	# 路径定义
	current_dir = os.getcwd()
	auto_pack_shell = './auto_packer_lz4.sh'
	resPath = os.path.join( current_dir,'../dynamicResource/')
	subprocess.call(['svn','update',resPath])

	dst_full_path = os.path.join(resPath,dst)

	no_need_modify_tps = my_input("是否跳过产生配置文件(y/n)? ").rstrip()
	if no_need_modify_tps == 'y':

		subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
		post_packer(dst)
		return

	srcs = my_input("请拖入资源: ").rstrip()
	srcs = try_copy_icon(srcs,dst)

	pos = my_input("请输入位置,按照顺序 x y : 外城位置参考 120 45: ",True).rstrip().split(' ')
	fill_with_zero(pos)

	pack_skin_with_png(dst,srcs,'',pos,pt)

def pack_nameplate_png_sk(noticeIdx = 1):
	dst = my_input(InputNotice[noticeIdx]).rstrip()
	try_clean_dst(dst)
	# 路径定义
	current_dir = os.getcwd()
	auto_pack_shell = './auto_packer_lz4.sh'
	resPath = os.path.join( current_dir,'../dynamicResource/')
	subprocess.call(['svn','update',resPath])

	dst_full_path = os.path.join(resPath,dst)

	no_need_modify_tps = my_input("是否跳过产生配置文件(y/n)? ").rstrip()
	if no_need_modify_tps == 'y':

		subprocess.check_call(['sh','./auto_packer_lz4.sh',dst_full_path])
		post_packer(dst)
		return

	srcs = my_input("请拖入单图 动画: ").rstrip()
	srcs = try_copy_icon(srcs,dst)
	check_all_animas(srcs)

	outPostfix = []
	for i in range(10):
		outPostfix.append('')

	pos = my_input("请输入位置,按照顺序 x y: ",True).rstrip().split(' ')
	fill_with_zero(pos)

	try_create_dir(dst_full_path)
	add_png_to_package(dst,dst_full_path,srcs[0])
	pack_skin_with_animation(dst,[srcs[1]],outPostfix,pos,True,3)

def pack_namplate(choice):
	if choice == '1':
		pack_nameplate_png()
	elif choice == '2':
		pack_nameplate_png_sk(1)

	print(u'测试铭牌请替换pvr,plist,config,且plist文件图片名字改掉,并重新启动游戏')
def pack_bubble(choice):
	if choice == '1':
		pack_nameplate_png()
	elif choice == '2':
		pack_nameplate_png_sk(2)

def is_dir_exist_non_case_sensible(dst_root,dir_name):
	dir_name_lower = dir_name.lower()
	for root, dirs, files in os.walk(dst_root):
		for x in dirs:
			if x.lower() == dir_name_lower:
				return True
		return False
	return False

def runProcess(exe):    
    p = subprocess.Popen(exe, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    while(True):
        # returns None while subprocess is running
        retcode = p.poll() 
        line = p.stdout.readline()
        yield line
        if retcode is not None:
            break

def check_tps_file(tpath):
	lines = []
	for line in runProcess(['TexturePacker',tpath]):
		lines.append(line)

	for x in lines:
		if x.count('Not all sprites could be packed into the texture') == 1:
			return False

	return True

def set_tps_file_scale(tpath,t_scale):
	lines = None
	with open(tpath,'r') as f:
		lines = f.readlines()
		for i,line in enumerate(lines):
			if line.count('<struct type="SpriteSettings">') == 1:
				scale_line = lines[i+2]
				lines[i+2] = Number_re.sub(str(t_scale),scale_line)
				break

	if not table_is_empty(lines):
		with open(tpath,'w') as f:
			for line in lines:
				f.write(line)

def try_tps_scale(tpath,tscale):
	max_scale = 1.0
	avg_scale = round((tscale + max_scale) / 2,2)

	for ts in numpy.arange(avg_scale,tscale - 0.01,-0.01):
		set_tps_file_scale(tpath,ts)
		if check_tps_file(tpath):
			break


def adjust_tps_file_scale(tpath):
	lines = []
	for line in runProcess(['TexturePacker',tpath]):
		lines.append(line)

	outer_size = []
	for x in lines:
		if len(TpWarningRe.findall(x)) == 1:
			outer_size.append(TpWarningRe.sub(r'\1,\2',x).split())

	outer_size_total = 0
	for x in outer_size:
		w_h = x[0].split(',')
		w = int(w_h[0])
		h = int(w_h[1])
		outer_size_total += w * h

	if outer_size_total > 0:
		max_size = float(2048 * 2048)
		t_s = float(max_size / (max_size + outer_size_total))
		t_s = round(t_s,2)

		try_tps_scale(tpath,t_s)
	

def my_input(msg,needNumber = False,skipCheckFace = False):
	face_flag = isinstance(msg,unicode) and table_contains(InputNotice,msg) and (not skipCheckFace)
	while True:
		pass
		print(msg,end='')
		try:

			tmpStr = raw_input().rstrip()

			#handle _face
			if face_flag:
				if tmpStr.find('_face') == -1 and tmpStr.find('face_') == -1 and (not table_contains_string(OldRes_notWith_face,tmpStr)):
					print(u'该皮肤名必须包含_face 或 face_,否则服务器检索不到')
					continue

			if face_flag:
				current_dir = os.getcwd()
				dst_full_path = os.path.join( current_dir,'../dynamicResource/')
				if is_dir_exist_non_case_sensible(dst_full_path,tmpStr):
					print(u'Warnning!!! 已经存在该命名皮肤')
					# continue


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

			if be_number:
				return tmpStr
			else:
				print(u'输入有误,请重新输入')
		except KeyboardInterrupt:
			print("\nInterrupted by user")
			sys.exit()

def choice_1(ch,chv):

	if chv == u'打包通用骨骼动画':
		pack_outer_castle()
		return

	if chv == u'打包城堡':
		choice = my_input(u'1: 内城+外城\n2: 外城\n3: 内城\n',True).rstrip()
		if choice == '1':
			pack_inner_outer_castle()
		elif choice == '2':
			pack_outer_castle()
		elif choice == '3':
			pack_inner_castle()
		return

	if chv == u'打包翅膀':
		pack_outer_castle(1)
		return

	if chv == u'打包铭牌':
		choice = my_input(u'1: 单图\n2: 动画\n',True).rstrip()
		pack_namplate(choice)
		return

	if chv == u'打包图标':
		pack_icon()
		return
	if chv == u'打包 avatar 图标':
		pack_avatar_icon()
		return

	if chv == u'添加粒子':
		add_particle_png()
		return

	if chv == u'打包行军队列':
		print(u'测试行军动画请同时替换config, json,config中第一个参数是资源名称,json按config名取')
		pack_outer_castle(2)
		return

	if chv == u'发布外网':
		publish_outernet()
		return

	if chv == u'发布内网':
		post_packer_inner()
		return

	if chv == u'批量重命名图片':
		rename_png_bat()
		return

	if chv == u'打包聊天气泡':
		pack_nameplate_png(1)
		return

	if chv == u'生成动态资源包':
		pack_dynamic_res()
		return

	if chv == u'打包头像框':
		pack_head_frame()
		return

	if chv == u'打包图标json':
		pth = my_input(u'请拖入配置 json文件')
		pack_icon_with_file(pth)
		return

	if chv == u'打包多个并提交':
		pth = my_input(u'请输入多个皮肤名').split(' ')
		pack_multi_skin_and_commit(pth)
		return

	if chv == u'打包光环或特效':
		print(u'请使用1: 打包通用骨骼动画 并手动改配置文件,并保证皮肤名与config命名相同')
		return

	if chv == u'打包通用骨骼动画(不需包含 face)':
		pack_without_face()
		return
def main():
	global OutPostfix
	OutPostfix = None
	make_choice([	u'打包通用骨骼动画',		\
					u'打包城堡',			\
					u'打包翅膀',		\
					u'打包铭牌',			\
					u'打包行军队列',			\
					u'打包图标',				\
					u'打包 avatar 图标',			\
					u'打包聊天气泡',			\
					u'添加粒子',			\
					u'发布外网',			\
					u'发布内网',			\
					u'批量重命名图片',			\
					u'生成动态资源包',			\
					u'打包头像框',			\
					u'打包图标json',			\
					u'打包多个并提交',			\
					u'打包光环或特效',			\
					u'打包通用骨骼动画(不需包含 face)',			\
					u'退出'],choice_1)

# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys

driver = None

def get_split_png_group(atlas_file):
	# atlas_file = '/Users/mac/Downloads/kpi_skin/spine_test.zip/export/gongji.atlas'
	temp_pngs = []
	png_start_idx = 0
	with open(atlas_file,'r') as f:
		all_lines = f.readlines()
		all_lines_len = len(all_lines)
		temp_arr = None
		for i,line in enumerate(all_lines):
			if line.count('.png') == 1:
				png_start_idx = i + 5
				temp_arr = []
			if png_start_idx > 0 and i == png_start_idx:
				pass
				if len(line.split()) > 0:
					temp_arr.append(line.rstrip())

				png_start_idx = png_start_idx + 7

				if png_start_idx >= all_lines_len - 1 or len(all_lines[png_start_idx].split()) == 0 :
					png_start_idx = 0
					temp_pngs.append(temp_arr)

	return temp_pngs

class GenZipGUI():
	def __init__(self):
		self.m_res = {}
		self.m_curRow = 0
		self.m_pack_types = [u'外城',u'翅膀']
		self.m_json_tabs = []
		self.m_json_files = []
		self.m_animaOpv = []
		self.m_actOpv = []
		self.m_positionField = []
		self.m_json_start_raw = 4

	def getPackTypeByName(typeName):
		return self.m_pack_types.index(typeName)

	def show(self):
		res = {}
		self.m_res = res

		window = tk_lib.Tk()
		self.m_window = window

		window.geometry('900x300+100+100')

		# 标题
		window.title(u"生成打包资源")

		# hello label
		lbl = tk_lib.Label(window, text="Hello")
		lbl.grid(column=0, row=0)
		self.m_lbl1 = lbl

		# 皮肤名 label
		lbl = tk_lib.Label(window, text="皮肤名:")
		lbl.grid(column=0, row=1)

		skin_name_field = tk_lib.Entry(window)
		skin_name_field.grid(row=1, column=1,sticky="W")

		# 皮肤类型 label
		lbl = tk_lib.Label(window, text="皮肤类型:")
		lbl.grid( row=2, column=0)
		skin_type,pack_type_v = self.make_option(self.select_skin_type,[u'外城',u'翅膀'])
		# pack_type_v = tk_lib.StringVar(window)
		# pack_type_v.set(u'请选择')
		# pack_type_v.trace('w',self.select_skin_type)
		self.m_pack_type_v = pack_type_v
		# pack_types = [u'外城',u'翅膀']
		# skin_type = tk_lib.OptionMenu(window, pack_type_v, *pack_types)

		# skin_type.pack()
		skin_type.grid(row=2, column=1,sticky="W")

		# json 文件数量
		lbl = tk_lib.Label(window, text="json文件数量:")
		lbl.grid( row=3, column=0)
		la = []
		for i in range(1,10):
			la.append(i)
		json_num,json_num_v = self.make_option(self.select_json_num,la)
		json_num.grid(row=3, column=1,sticky="W")
		self.m_json_num_v = json_num_v

		# 选择文件
		# self.chooseFileLabel = tk_lib.LabelFrame(window, text = "Open File")
		# self.chooseFileLabel.grid(column = 0, row = 3)

		# self.chooseFileButton = tk_lib.Button(self.chooseFileLabel, text = "Browse A File",command = self.fileDialog)
		# self.chooseFileButton.grid(column = 1, row = 3)

		def click():
			pass

			res['skin_name'] = skin_name_field.get()
			res['skin_type'] = pack_type_v.get()


			window.withdraw()
			window.quit()
		btn = tk_lib.Button(window, text="确定", bg="orange", fg="red",command=click)
		btn.grid(column=20, row=20)

		window.mainloop()

		if res['skin_type'] == u'外城':
			a = 100

		return res

	def make_option(self,trace_func,pack_types,parentNode=None):
		window = parentNode if parentNode else self.m_window
		pack_type_v = tk_lib.StringVar(window)
		pack_type_v.set(u'请选择')
		pack_type_v.trace('w',trace_func)
		# self.m_pack_type_v = pack_type_v
		# pack_types = [u'外城',u'翅膀']
		skin_type = tk_lib.OptionMenu(window, pack_type_v, *pack_types)
		# skin_type.pack()
		return skin_type,pack_type_v

	def reset_option(self):
		pass

	def select_skin_type(self,*args):
		self.m_selectTypeName = self.m_pack_type_v.get()
		self.m_selectType = self.getPackTypeByName(self.m_selectTypeName)
		pass
		# if self.m_pack_type_v.get() == u'外城':
		# 	self.m_lbl1.grid_remove()
		# else:
		# 	self.m_lbl1.grid()

	def select_json_num(self,*args):
		pass
		# print(self.m_json_num_v.get())
		self.create_json_tab(int(self.m_json_num_v.get()))

	def select_spine(self):
		pass

	def create_json_tab(self,t_num):
		prev_len = len(self.m_json_tabs)
		if t_num == prev_len:
			return

		if t_num < prev_len:
			for i in range(t_num,prev_len):
				for y in self.m_json_tabs[i]:
					y.grid_remove()

			self.m_json_tabs = self.m_json_tabs[:t_num]
			self.m_json_files = self.m_json_files[:t_num]
			self.m_animaOpv = self.m_animaOpv[:t_num]
			self.m_actOpv = self.m_actOpv[:t_num]
			self.m_positionField = self.m_positionField[:t_num]

			return

		# self.m_json_tabs = []
		# self.m_json_files = []
		# self.m_animaOpv = []

		start_row = self.m_json_start_raw
		window = self.m_window
		for i in range(prev_len,t_num):
			self.m_json_files.append('')

			row_num = start_row + i

			# json file x:
			t_label0 = tk_lib.Label(window, text = "json file {0}:".format(i+1))
			t_label0.grid(column = 0, row = row_num,sticky="W")

			# open file
			t_label = tk_lib.LabelFrame(window, text = "Open File")
			t_label.grid(column = 1, row = row_num,sticky="W")

			# bowse file btn
			t_btn = tk_lib.Button(t_label, text = "Browse A File",command = partial(self.fileDialog,i))
			t_btn.grid(column = 2, row = row_num,sticky="W")
			
			# file name text
			t_label1 = tk_lib.Label(t_label, text = "")
			t_label1.grid(column = 3, row = row_num,sticky="W")

			# select animation opt
			op,opv = self.make_option(partial(self.chooseAnima,i),[''],t_label)
			op.grid(column = 4, row = row_num)
			op.grid_remove()
			self.m_animaOpv.append(opv)

			# position
			pos_label = tk_lib.LabelFrame(t_label, text = "position:x,y")
			pos_label.grid(column = 5, row = row_num,sticky="W")
			pos_label.grid_remove()
			pos_arr = []
			for pos_i in range(2):
				t_field = tk_lib.Entry(master=pos_label,width=5)
				t_field.grid(row=0, column=pos_i)
				t_field.insert(tk_lib.END,'0')
				pos_arr.append(t_field)
			self.m_positionField.append(pos_arr)

			# select 动作
			opAct,opActv = self.make_option(partial(self.chooseAct,i),[''],t_label)
			opAct.grid(column = 6, row = row_num)
			opAct.grid_remove()
			self.m_actOpv.append(opActv)

			self.m_json_tabs.append([
			t_label, #0
			t_btn, #1
			t_label1, #2
			op, #3
			t_label0, #4
			pos_label, #5
			opAct #6
			])

	def chooseAct(self,index,*args):
		pass
		print('chooseAct,,,,',index)		

	def chooseAnima(self,index,*args):
		pass
		print('chooseAnima,,,,',index)

		# tv = self.m_animaOpv[index]
		# print(tv.get())

	def fileDialog(self,index):
		tab = self.m_json_tabs[index]
		file_path = askopenfilename(initialdir =  "/", title = "Select A File" )
		if file_path == '' or file_extension(file_path) != '.json':
			return
		self.m_json_files[index] = file_path
		tab[2].configure(text = os.path.basename(self.m_json_files[index]))

		# op
		op,opv = tab[3],self.m_animaOpv[index]
		op.grid()
		opv.set(u'请选择')
		op['menu'].delete(0,'end')
		animas = get_animation_names(self.m_json_files[index])
		for choice in animas:
			op['menu'].add_command(label=choice, command=tk_lib._setit(opv, choice))
		
		# pos
		pos_label = tab[5]
		pos_label.grid()

		# 外城
		is_outer_castle = self.m_pack_type_v.get() == u'外城'
		if is_outer_castle:
			opAct,opActv = tab[6],self.m_actOpv[index]
			opAct.grid()
			opActv.set(u'待机')
			opAct['menu'].delete(0,'end')
			animas = [u'待机',u'攻击']
			for choice in animas:
				opAct['menu'].add_command(label=choice, command=tk_lib._setit(opActv, choice))

def gen_pack_zip_file():
	pass

def yes_no_dialog(msg):
	the_answer = []

	tw = 450
	th = 100
	size_cfg = [str(tw),str(th)]
	window = tk_lib.Tk()

	window.geometry('x'.join(size_cfg) + '+100+100')
	window.title("提示")
	lbl = tk_lib.Label(window, text=msg)
	lbl.grid(column=0, row=0)
	
	def clickYes():
		the_answer.append('y')
		window.withdraw()
		window.quit()
		return 'y'
	
	btn = tk_lib.Button(window, text="Yes", bg="orange", fg="red",command=clickYes)
	btn.grid(column=0, row=2)

	def clickNo():
		the_answer.append('n')
		window.withdraw()
		window.quit()
	btn = tk_lib.Button(window, text="Cancel", bg="orange", fg="red",command=clickNo)
	btn.grid(column=1, row=2)

	window.mainloop()
	return the_answer

def gui_gen_zip():

	res = []
	while True:
		wd = GenZipGUI()

		r = wd.show()
		res.append(r)
		continue_flag = yes_no_dialog(u'是否继续?')[0] == 'y'

		if not continue_flag:
			break
	
	return res


def test(a = 'abcd'):
	pass

	la = [1,2,3,4]
	lb = la[:3]
	lc = la[2:]
	print(lb)
	print(lc)


	# global driver
	# # driver = webdriver.Firefox()
	# driver = webdriver.Chrome()
	# driver.get("http://gm.cok.elexapp.com/ifadmin/admin/admincp.php?mod=server&act=activityres")
	# # assert "Python" in driver.title
	# elem = driver.find_element_by_name("user")
	# elem.clear()
	# elem.send_keys("tangwen")

	# elem = driver.find_element_by_xpath('//*[@id="password"]')
	# elem.clear()
	# elem.send_keys("Inryygy@08077355")

	# # /html/body/div/form/button
	# elem = driver.find_element_by_xpath("html/body/div/form/button")
	# elem.click()


	# elem.send_keys(Keys.RETURN)
	# assert "No results found." not in driver.page_source
	# driver.close()

	# res = ['1','99','99']
	# add_version_code(res,10)
	# print(res)
	# sn_add_and_commit('/Users/tangwen/Documents/my_projects/cok/ccbDyRes/dynamicResource')

	# is_ci = None

	# is_ci = is_ci or 'abc'
	# print(is_ci)
	# a = []
	# a.append(None)
	# print(len(a))
	# b = {'c':1}
	# print(b.get('d'))
	# p = '/Users/tangwen/Documents/my_projects/cok/ccbDyRes/dynamicResource/Aphrodite_face/_alpha_sk_Aphrodite_face_out.tps'
	# check_tps_file(p)
	# a = '/Users/tangwen/Downloads/iceAndFire/ice2/b'
	# b = find_plist_file(a)
	# print(b)

	# a = '/Users/tangwen/Documents/my_projects/cok/client/IF/Resources/lua_static/game/tournament/abc.plist'
	# b = change_file_ext(a,'.png')
	# print(b)
	# print('a'*10)
	# print(is_dir_exist_non_case_sensible('.','abcd'))


if __name__ == '__main__':
	use_test = False
	use_gui = True
	if use_test:
		test()
	elif use_gui:
		gui_gen_zip()
	else:
		main()
	# main()
	# test()