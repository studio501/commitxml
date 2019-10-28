# -*- coding: utf-8 -*

from __future__ import division
from __future__ import print_function
import sys,os,re
from os import listdir
from os.path import isfile, join
import json
import xml.etree.ElementTree as ET

import subprocess

import platform

if platform.system() == 'Windows':
	import win32clipboard

def file_extension(path): 
	return os.path.splitext(path)[1] 

def is_number(str):
    try:
        # 因为使用float有一个例外是'NaN'
        if str=='NaN':
            return False
        float(str)
        return True
    except ValueError:
        return False

# Iterative Binary Search Function 
# It returns location of x in given array arr if present, 
# else returns -1 
def binarySearch(arr, l, r, x): 
  	
	lastDirLow = True
	mid = None
	while l <= r: 

		mid	 = l + (r - l)/2
	      
		# Check if x is present at mid 
		if arr[mid][0] == x: 
			return arr[mid][1] 

		# If x is greater, ignore left half 
		elif arr[mid][0] < x: 
			l = mid + 1
			lastDirLow = True

		# If x is smaller, ignore right half 
		else: 
			r = mid - 1
			lastDirLow = False
	idx = mid if lastDirLow else mid - 1
	return arr[mid][1]

def svn_update(dir):
	subprocess.call(['svn','update',dir])

def svn_commit(dir,msg='auto commit by script.'):
	if type(dir) is str:
		subprocess.call(['svn','ci',dir,'-m',msg])
	else:
		raise_error('no such dir {}'.format(dir))

def table_is_empty(tb):
	return not tb or len(tb) == 0

def table_contains(tb,s):
	for x in tb:
		if x == s:
			return True
	return False

def indent_xml(elem, level=0):
    i = "\n" + level*"\t"
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = i + "\t"
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
        for elem in elem:
            indent_xml(elem, level+1)
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
    else:
        if level and (not elem.tail or not elem.tail.strip()):
            elem.tail = i

def open_json_file(f):
	with open(f,'r') as load_f:
  		load_dict = json.load(load_f)
  		return load_dict

def isStringNil(str):
	return (not str) or str == ''

def my_input(msg,needNumber = False):
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

			if be_number:
				return tmpStr
			else:
				print(u'输入有误,请重新输入')
		except KeyboardInterrupt:
			print("\nInterrupted by user")
			sys.exit()

def raise_error(msg,iwWarnning=False):
	print("{}!!!!!!!!!".format('Warnning' if iwWarnning else 'Error & abort'),'(',msg,')')
	if not iwWarnning:
		sys.exit()

def getClipBoardContent():
	if platform.system() == 'Windows':
		win32clipboard.OpenClipboard()
		data = win32clipboard.GetClipboardData()
		win32clipboard.CloseClipboard()
		return data.decode('utf-8')
	else:
		p = subprocess.Popen(['pbpaste'], stdout=subprocess.PIPE)
		retcode = p.wait()
		data = p.stdout.read()
		#这里的data为bytes类型，之后需要转成utf-8操作
		return data.decode('utf-8')

def checkClipContent(str_content,file_type='xml',beSecondCheck=False):
	# str_arr = str_content.split('\n')
	try:
		# for x in str_arr:
		if file_type == 'xml':
			if beSecondCheck:
				str_content = '<temp_group__>\n' + str_content + '\n</temp_group__>'

			res = ET.fromstring(str_content)
			if res.tag == "ItemSpec":
				str_content = '<temp_group__>\n' + str_content + '\n</temp_group__>'
				return ET.fromstring(str_content)
			return res
	except:
		if not beSecondCheck and file_type == 'xml':
			return checkClipContent(str_content,file_type,True)
		raise_error(u"粘贴内容格式错误,请重新粘贴正确格式数据")
	else:
		print(u'数据格式正确')

	return None

def add_version_code_mid(res,delta=1):
	res_len = len(res)
	if res_len != 3:
		raise_error('version code must have 3 number')
	last_num = int(res[res_len-1])
	mid_num = int(res[res_len-2])
	first_num = int(res[res_len-3])

	mid_num = mid_num + delta
	if mid_num >= 100:
		mid_num = 0
		first_num = first_num + 1

	res[res_len-1] = str(last_num)
	res[res_len-2] = str("%02d" % mid_num)
	res[res_len-3] = str(first_num)
	return res

def add_version_code_last(res,delta=1):
	res_len = len(res)
	if res_len != 3:
		raise_error('version code must have 3 number')
	last_num = int(res[res_len-1])
	mid_num = int(res[res_len-2])
	first_num = int(res[res_len-3])

	last_num = last_num + delta

	res[res_len-1] = str(last_num)
	res[res_len-2] = str(mid_num)
	res[res_len-3] = str(first_num)
	return res

def get_ver_range(ver_str):
	s1 = ver_str.split('~')
	if len(s1) == 2:
		min1 = s1[0]
		max1 = s1[1]

		tmp_arr = min1.split('.')

		res = [min1]
		if min1 != max1:
			for i in range(100):
				tmp_arr = add_version_code_mid(tmp_arr)
				next_ver = '.'.join(tmp_arr)
				res.append(next_ver)

				if next_ver == max1:
					break
		return res

def _find_first_last_group(t_arr):
	i_head = 0
	i_tail = 0
	for i,line in enumerate(t_arr):
		if line.find('Group') != -1:
			i_head = i
			break

	for i in range(len(t_arr)-1, -1, -1):
		if t_arr[i].find('Group') != -1:
			i_tail = i
			break

	return [i_head,i_tail]


def append_by_table(tb1,tb2,tsep=''):
	for x in tb2:
		tb1.append(x + tsep)

def replace_head_tail(src_headtail,src_middle):
	arr1 = _find_first_last_group(src_headtail)
	head = src_headtail[:arr1[0]]
	tail = src_headtail[arr1[1]+1:]

	arr2 = _find_first_last_group(src_middle)
	middle = src_middle[arr2[0]:arr2[1]+1]

	append_by_table(head,middle,'\n')
	append_by_table(head,tail)

	return head

def is_spec_ele_(rt,key):
	return rt.tag == key

def is_group_ele(rt):
	# return len(rt) > 0 and len(rt[0]) > 0
	return is_spec_ele_(rt,'Group')

def is_temp_ele(rt):
	return is_spec_ele_(rt,'temp_group__')

def modify_file_xml(copy_xml,filename,group_name):
	tree = ET.parse(filename)
	root = tree.getroot()

	group_ele = None
	# group_ele = root.find(group_name)
	for elem in root:
		if elem.attrib.get('id') == group_name:
			group_ele = elem
			break
	    # for subelem in elem:
	    #     print(subelem.attrib)

	ci_msg = None
	if group_ele is not None:
		delete_list = []
		udpate_list = []
		add_list = []
		for elem in group_ele:
			pass
			# next(ifilter(predicate, seq), None)
			for elem_cp in copy_xml:
				if elem_cp.attrib.get('dd') == '1':
					delete_list.append(int(elem_cp.attrib.get('id')))
				else:
					if elem.attrib.get('id') == elem_cp.attrib.get('id'):
						udpate_list.append([elem,elem_cp])

		for elem_cp in copy_xml:
			add_flag = True
			for elem in udpate_list:
				if elem[1].attrib.get('id') == elem_cp.attrib.get('id'):
					add_flag = False
					break
			if add_flag:
				add_list.append(elem_cp)

		u_arr = []
		for x in udpate_list:
			old_xml = x[0]
			new_xml = x[1]
			# old_xml = new_xml
			old_xml[:] = [item[-1] for item in new_xml]
			u_arr.append(new_xml.attrib.get('id'))
		a_arr = []
		for x in add_list:
			# x.tail = '\n\t'
			group_ele.append(x)
			a_arr.append(x.attrib.get('id'))

		# sort
		data = []
		for elem in group_ele:
		    key = int(elem.attrib.get('id'))
		    if not table_contains(delete_list,key):
		    	data.append((key, elem))

		data.sort()
		group_ele[:] = [item[-1] for item in data]
		ci_msg = u'{0}表作如下修改:\n'.format(group_name)
		if not table_is_empty(u_arr):
			ci_msg += u'更新: ' + ','.join(u_arr)

		ci_msg += '\n'
		if not table_is_empty(a_arr):
			ci_msg += u'新增: ' + ','.join(a_arr)

		ci_msg += '\n'
		if not table_is_empty(delete_list):
			ci_msg += u'删除: ' + ','.join(delete_list)
	else:
		be_group = is_temp_ele(copy_xml) and is_group_ele(copy_xml[0])

		group_arr = []
		if be_group:
			for x in copy_xml:
				root.append(x)
				group_arr.append(x.attrib.get('id'))
		else:
			copy_xml.tag = "Group"
			copy_xml.attrib = {"id" : group_name}
			# copy_xml.tail = '\n'
			root.append(copy_xml)
			group_arr.append(group_name)
		# attrib = {}
		# element = root.makeelement(group_name,attrib)
		ci_msg = u'新增表' + ','.join(group_arr)
	indent_xml(root)

	mydata = ET.tostring(root)
	# ET.tostring(root,pretty_print=True)
	mydata_str = mydata.split('\n')
	# print(mydata_str[0])
	# print(mydata_str[1])

	tr = _find_first_last_group(mydata_str)

	mydata_str_2 = None
	with open(filename,'r') as f:
		mydata_str_2 = f.readlines()
	after_rep = replace_head_tail(mydata_str_2,mydata_str)

	with open(filename,'w') as f:
		for line in after_rep:
			f.write(line)

	return ci_msg or 'auto commit.'

def get_group_name():
	# return "effect_pool"
	return my_input(u'请输入表名')

def upgrade_ver(filename):
	vers = None
	with open(filename,'r') as f:
		vers = f.readlines()


	ver_line = vers[0].rstrip()
	ver = ver_line.split('|')
	if len(ver) == 2:
		res = add_version_code_last(ver[1].split('.'))
		ver[1] = '.'.join(res)
		ver_str = '|'.join(ver)
		with open(filename,'w') as f:
			f.write(ver_str + '\n')

		return u'提升版本号从{0}到{1}'.format(ver_line,ver_str)
	else:
		raise_error(u'当前版本信息有误 ' + filename)

	return ''

def get_safe_ver(ver):
	t_arr = ver.split('.')
	if len(t_arr) == 2:
		t = [0,0,0]
		t[0] = t_arr[0]
		t[1] = "%02d" % int(t_arr[1])
		t[2] = '0'
		return '.'.join(t)
	elif len(t_arr) == 3:
		t = [0,0,0]
		t[0] = t_arr[0]
		t[1] = "%02d" % int(t_arr[1])
		t[2] = t_arr[2]
		return '.'.join(t)

	raise_error(u'无法识别的版本号 ' + ver)

def get_lang_arr(isAll=False):
	return [
	"text_ar.ini",
	"text_de.ini",
	"text_en.ini",
	"text_es.ini",
	"text_fa.ini",
	"text_fr.ini",
	"text_id.ini",
	"text_it.ini",
	"text_ja.ini",
	"text_ko.ini",
	"text_nl.ini",
	"text_no.ini",
	"text_pl.ini",
	"text_pt.ini",
	"text_ro.ini",
	"text_ru.ini",
	"text_th.ini",
	"text_tr.ini",
	"text_uk.ini",
	"text_zh_CN.ini",
	"text_zh_TW.ini"
	] if isAll else ["text_zh_CN.ini"]

def find_txt_by_id(file_contents,id):
	return next(ifilter(lambda x: x.count(id+'=') == 1, file_contents), None)

def get_txt_map(txt_arr):
	dic1 = {}
	for x in txt_arr:
		t_arr = x.split('=')
		if len(t_arr) == 2:
			dic1[t_arr[0]] = t_arr[1]

	return dic1

def get_dialog_id(dialog):
	dialog_arr = dialog.split('=')
	if len(dialog_arr) == 2:
		return dialog_arr[0]

	return None

def insert_one_(file_contents,copy_line):
	copy_id = get_dialog_id(copy_line)
	if not copy_id:
		raise_error(u'格式不正确 ' + copy_line)
	for i,line in enumerate(file_contents):
		txt_id = get_dialog_id(line)
		if txt_id:
			pass


def insert_into_file(file_contents,copy_contents):
	pass
	fc = []

	for i,line in enumerate(file_contents):
		txt_id = get_dialog_id(line)
		if txt_id:
			fc.append([txt_id,i])

def save_ini_file(dst_file,file_keys_order):
	pass

def reCompLine(txt_id,txt_content):
	print(txt_id)
	print(txt_content)
	return u'='.join((txt_id, txt_content)).encode('utf-8').strip() + '\n'
	# return u''+ txt_id + u'=' + txt_content + u'\n'

def modify_file_ini(copy_txt,dst_file,pb):
	file_contents = None
	with open(dst_file,'r') as f:
		file_contents = f.readlines()

	# copy_txt = None
	# if pub_file_len == 1:
	# 	my_input(u'请将要复制的内容拷贝到剪贴板后回车')
	# 	copy_txt = getClipBoardContent().rstrip().split('\n')
	# else:
	# 	all_lang_file = my_input(u'请拖入全语言文件').rstrip()
	# 	js_data = open_json_file(all_lang_file)
	# 	copy_txt = js_data[pb]

	file_keys = get_txt_map(file_contents)
	copy_keys = get_txt_map(copy_txt)
	has_same = False
	for x in copy_keys:
		if file_keys.get(x):
			print('Exist id={0}'.format(x))
			# print('Exist id={0} Origin{1} Replace{2}'.format(x,file_keys[x],copy_keys[x]))
			# print('已经存在id='+x+' '+ '原始值'+file_keys[x]+' '+'替换值'+copy_keys[x])
			has_same = True
	if has_same:
		is_replace = my_input(u'是否要替换已有多语言 (y/n)?').rstrip() == 'y'
		if not is_replace:
			sys.exit()


	add_list = []
	udpate_list = []
	delete_list = []
	for x in copy_keys:
		if not file_keys.get(x):
			add_list.append(x)
		else:
			cv = copy_keys[x]
			if cv.count('@dd') == 1:
				delete_list.append(x)
			else:
				udpate_list.append(x)

	# print("add_list",add_list)
	# print("udpate_list",udpate_list)
	# print("delete_list",delete_list)

	for x in udpate_list:
		for i,line in enumerate(file_contents):
			txt_id = get_dialog_id(line)
			if txt_id and txt_id == x:
				file_contents[i] = reCompLine(x,copy_keys[x])

	file_contents_len = len(file_contents)
	file_max_idx = file_contents_len - 1
	for x in add_list:
		print('is_number',is_number(x))
		if is_number(x):
			for i,line in enumerate(file_contents):
				txt_id = get_dialog_id(line)
				if txt_id:
					next_id = None
					counter = 0
					while True:
						counter += 1
						next_id = get_dialog_id(file_contents[min(file_max_idx,i+counter)])
						if next_id:
							break
					if next_id and (txt_id != next_id) and is_number(txt_id) and is_number(next_id):
						if int(x) > int(txt_id) and int(x) < int(next_id):
							file_contents.insert(i+1,reCompLine(x,copy_keys[x]))
							break

	with open(dst_file,'w') as f:
		for line in file_contents:
			f.write(line)

	ci_msg = ''
	if len(add_list) > 0:
		ci_msg += 'add: ' + str(add_list) + '\n'

	if len(udpate_list) > 0:
		ci_msg += 'update: ' + str(udpate_list) + '\n'

	if len(delete_list) > 0:
		ci_msg += 'delete: ' + str(delete_list)

	return ci_msg

def get_files_in_dir(sourceDir):
	file_list = []
	xml_Ext = '.xml'
	for f in os.listdir(sourceDir):
		sourceF = os.path.join(sourceDir,f)
		if os.path.isfile(sourceF) and xml_Ext == file_extension(f):
			file_list.append(os.path.basename(f))


	return file_list

def get_blank_xml(fileName):
	with open(fileName,'w') as f:
		f.write('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<tns:database xmlns:tns="http://www.iw.com/sns/platform/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n</tns:database>\n')

def main():
	pass

	file_type = my_input(u'(1) 提交xml表、 (2) 提交多语言: ').rstrip()
	file_is_xml = file_type == '1'
	file_is_lang = file_type == '2'

	if file_type != '1' and file_type != '2':
		raise_error(u'无法处理的文件类型 '+ file_type)
	pub_file_name = None
	group_name = None
	copy_xml = None
	if file_is_xml:
		pub_file_name = ['database.local.xml']
		group_name = get_group_name()
		ready = my_input(u'请将要复制的内容拷贝到剪贴板后回车')
		copy_xml = checkClipContent(getClipBoardContent(),'xml')

	elif file_is_lang:
		is_all = my_input(u'是否发布全语言 (y/n)?') == 'y'
		pub_file_name = get_lang_arr(is_all)

	# print(getClipBoardContent())
	
	pub_file_len = len(pub_file_name)
	all_lang_json = None
	if pub_file_len > 1:
		all_lang_file = my_input(u'请拖入全语言文件: ').rstrip()
		all_lang_json = open_json_file(all_lang_file)

	js_data = open_json_file("config.json")

	for info in js_data['destination']:
		ci_flag = my_input(u'是否提交 ' + info['nickname'] + ' (y/n)?') == 'y'
		if ci_flag:
			fen_biao_flag = info.get('fen_biao') == True
			ver_to_publish = info.get('range')
			ver_to_publish = ['.'] if table_is_empty(ver_to_publish) else ver_to_publish
			# my_input(u'请输入发布版本 x~y 或 x,y,z: ').rstrip()
			if not table_is_empty(ver_to_publish):
				# ver_range = None
				# if ver_to_publish.count('~') == 1:
				# 	ver_range = get_ver_range(ver_to_publish)
				# else:
				# 	ver_range = ver_to_publish.split(',')

				# print('ver_range',ver_range)
				# if ver_range:
				for ver in ver_to_publish:
					ver = get_safe_ver(ver)
					pt = os.path.join(info['path'],ver)
					if os.path.exists(pt):
						svn_update(pt)

						ci_msg = ''

						if file_is_xml:
							dst_file = None
							if fen_biao_flag:
								pass
								
								dst_file = os.path.join(pt,group_name + '.xml')
								all_xml = get_files_in_dir(pt)
								if not table_contains(all_xml,group_name):
									get_blank_xml(dst_file)	
							else:
								dst_file = os.path.join(pt,'database.local.xml')


							if os.path.exists(dst_file):
								ci_msg1 = None
								ci_msg1 = modify_file_xml(copy_xml,dst_file,group_name)




						for pb in pub_file_name:
							safe_check = file_type == '1' or all_lang_json.get(pb)
							if safe_check:
								dst_file = os.path.join(pt,pb)
								if os.path.exists(dst_file):
									ci_msg1 = None
									if file_type == '1':
										ci_msg1 = modify_file_xml(copy_xml,dst_file,group_name,fen_biao_flag)
									elif file_type == '2':
										copy_txt = None

										if pub_file_len == 1:
											my_input(u'请将要复制的内容拷贝到剪贴板后回车')
											copy_txt = getClipBoardContent().rstrip().split('\n')

											# copy_txt = get_copy_txt(pub_file_len,dst_file,pb)
											
										else:
											# copy_txt = get_copy_txt(pub_file_len,dst_file,pb)
											copy_txt = all_lang_json[pb]
										
										if copy_txt:
											ci_msg1 = modify_file_ini(copy_txt,dst_file,pb)
									
									ci_msg2 = upgrade_ver(os.path.join(pt,'VERSION.txt'))
									if isStringNil(ci_msg):
										ci_msg = ci_msg1 + '\n' + ci_msg2
								else:
									raise_error(u'找不到对应文件 '+ pb,True)
						svn_commit(str(pt),ci_msg)
					else:
						raise_error(u'找不到此版本目录 '+ ver,True)


def test():
	pass

	dict1 = {'a':100}

	if dict1.get('a'):
		print('yews')
		pass
	# print (get_safe_ver('5.5'))
	# la = [1,2,3,4,5]
	# for i,x in enumerate(la):
	# 	print('i,x',i,x)
	# 	if x == 2:
	# 		la.insert(i+1,999)

	# all_lang_json = open_json_file('all_lang.json')
	# modify_file_ini(all_lang_json['text_ar.ini'],'/Users/mac/Documents/my_projects/cok/innerDyRes/5.05.0/text_ar.ini',None)
	# print(type([]))
	# svn_commit('/Users/mac/Documents/my_projects/cok/innerDyRes/5.00.0','msg')
	# upgrade_ver('/Users/mac/Documents/my_projects/cok/innerDyRes/5.05.0/VERSION.txt')
	# s1 = u'{0}表作如下修改'.format('group_name')
	# print(s1)
	# print( get_ver_range('5.01.0~5.22.0'))
	# print('5.01.0'.split(','))
	
	# a = my_input(u"plase copy")
	# print(checkClipContent(getClipBoardContent(),'xml'))
	# modify_file_xml(checkClipContent(getClipBoardContent(),'xml'),"database.local.xml","five_red_envolope_rank")
	# str_arr = checkClipContent(getClipBoardContent(),'xml')
	# print(len(str_arr))
	# str_arr.tag = "mybet"
	# str_arr.attrib = {"id":"abcd"}
	# print(str_arr.attrib)
	# print(str_arr[1].tag)
	# for x in str_arr:
	# 	print(x.text)
	# for e in str_arr.attrib:
	# 	print(e.attrib)

if __name__ == '__main__':
	if len(sys.argv) == 1:
		if False:
			test()
		else:
			main()
	else:
		print('@param1: src file')
		print('@param2: config json')

	pass