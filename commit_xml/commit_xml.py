# -*- coding: utf-8 -*

from __future__ import division
from __future__ import print_function
import sys,os,re
from os import listdir
from os.path import isfile, join
import json
import xml.etree.ElementTree as ET_Check
from lxml import etree as ET
import copy

import subprocess

import platform

from Tkinter import *

if platform.system() == 'Windows':
	import win32clipboard

# =======================================================================
# Monkey patch ElementTree
# import xml.etree.ElementTree as ET

# def _serialize_xml(write, elem, encoding, qnames, namespaces):
#     tag = elem.tag
#     text = elem.text
#     if tag is ET.Comment:
#         write("<!--%s-->" % ET._encode(text, encoding))
#     elif tag is ET.ProcessingInstruction:
#         write("<?%s?>" % ET._encode(text, encoding))
#     else:
#         tag = qnames[tag]
#         if tag is None:
#             if text:
#                 write(ET._escape_cdata(text, encoding))
#             for e in elem:
#                 _serialize_xml(write, e, encoding, qnames, None)
#         else:
#             write("<" + tag)
#             items = elem.items()
#             if items or namespaces:
#                 if namespaces:
#                     for v, k in sorted(namespaces.items(),
#                                     key=lambda x: x[1]):  # sort on prefix
#                         if k:
#                             k = ":" + k
#                         write(" xmlns%s=\"%s\"" % (
#                             k.encode(encoding),
#                             ET._escape_attrib(v, encoding)
#                             ))
#                 #for k, v in sorted(items):  # lexical order
#                 for k, v in items: # Monkey patch
#                     if isinstance(k, ET.QName):
#                         k = k.text
#                     if isinstance(v, ET.QName):
#                         v = qnames[v.text]
#                     else:
#                         v = ET._escape_attrib(v, encoding)
#                     write(" %s=\"%s\"" % (qnames[k], v))
#             if text or len(elem):
#                 write(">")
#                 if text:
#                     write(ET._escape_cdata(text, encoding))
#                 for e in elem:
#                     _serialize_xml(write, e, encoding, qnames, None)
#                 write("</" + tag + ">")
#             else:
#                 write(" />")
#     if elem.tail:
#         write(ET._escape_cdata(elem.tail, encoding))

# ET._serialize_xml = _serialize_xml

# from collections import OrderedDict

# class OrderedXMLTreeBuilder(ET.XMLTreeBuilder):
#     def _start_list(self, tag, attrib_in):
#         fixname = self._fixname
#         tag = fixname(tag)
#         attrib = OrderedDict()
#         if attrib_in:
#             for i in range(0, len(attrib_in), 2):
#                 attrib[fixname(attrib_in[i])] = self._fixtext(attrib_in[i+1])
#         return self._target.start(tag, attrib)

# =======================================================================

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
		# subprocess.call(['svn','ci',dir,'-m',msg])
		if platform.system() == 'Windows':
			# TortoiseProc.exe /command:commit
   #               /path:"c:\svn_wc\file1.txt*c:\svn_wc\file2.txt"
   #               /logmsg:"test log message" /closeonend:0

   			subprocess.call(['TortoiseProc.exe','/command:commit','/path:{}'.format(dir),
   				'/logmsg:"{}"'.format(msg),'/closeonend:0'])

		else:
			print('svn','ci',dir,'-m',msg)
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
		td = data.decode('utf-8')
		# print('getClipBoardContent ', td)
		return td
	else:
		p = subprocess.Popen(['pbpaste'], stdout=subprocess.PIPE)
		retcode = p.wait()
		data = p.stdout.read()
		#这里的data为bytes类型，之后需要转成utf-8操作
		return data.decode('utf-8')

def checkClipContent(str_content,file_type='xml',beSecondCheck=False):
	# str_arr = str_content.split('\n')
	# print('str_content here',str_content,beSecondCheck)
	str_content = str_content.lstrip().rstrip()
	try:
		# for x in str_arr:
		if file_type == 'xml':
			if beSecondCheck:
				str_arr = str_content.split('\n')
				res2 = []
				for x in str_arr:
					if len(x.split()) != 0:
						res2.append(x)
				str_arr = res2

				for x in str_arr:
					ET_Check.fromstring(x)
				str_content = '<temp_group__>\n' + str_content + '\n</temp_group__>'

			# print(str_content)
			if not beSecondCheck:
				ET_Check.fromstring(str_content)
			res = ET.fromstring(str_content)


			if res.tag == "ItemSpec":
				str_content = '<temp_group__>\n' + str_content + '\n</temp_group__>'
				ET_Check.fromstring(str_content)
				return ET.fromstring(str_content)
			return res
	except Exception as e:
		if not beSecondCheck and file_type == 'xml':
			return checkClipContent(str_content,file_type,True)

		print(e)
		if str(e).count("'ascii' codec can't encode character") > 0:
			print(u"中文error")
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

def get_help(object):
	object_methods = [method_name for method_name in dir(object) if callable(getattr(object, method_name))]

	return object_methods

def modify_file_xml(copy_xml,filename,group_name,is_blank_xml):
	tree = ET.parse(filename)
	root = tree.getroot()

	group_ele = None
	# group_ele = root.find(group_name)
	first_Check_No_Group = False
	No_Group = False
	for elem in root:
		if not first_Check_No_Group:
			first_Check_No_Group = True
			No_Group = elem.tag != 'Group'

		if elem.attrib.get('id') == group_name:
			group_ele = elem
			break
	    # for subelem in elem:
	    #     print(subelem.attrib)

	if No_Group:
		group_ele = root

	id_len_before = len(group_ele)

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
					i_id = int(elem_cp.attrib.get('id'))
					if not table_contains(delete_list,i_id):
						delete_list.append(i_id)
				else:
					if elem.attrib.get('id') == elem_cp.attrib.get('id'):
						udpate_list.append([elem,elem_cp])

		for elem_cp in copy_xml:
			add_flag = elem_cp.attrib.get('dd') != '1'
			# print(get_help(elem_cp))
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

			old_xml.attrib.clear()
			for x in new_xml.attrib:
				old_xml.attrib[x] = new_xml.attrib.get(x)

			u_arr.append(new_xml.attrib.get('id'))

		a_arr = []



		for x in add_list:
			group_ele.append(x)
			a_arr.append(x.attrib.get('id'))

		Be_number = False
		# sort
		data = []
		tk = 0
		for elem in group_ele:
			t_id = elem.attrib.get('id')
			tk += 1
			key = int(t_id) if is_number(t_id) else tk
			if not table_contains(delete_list,key):
				data.append((key, elem))

		data.sort()

		group_ele[:] = [item[-1] for item in data]

		ci_msg = '{0} modify:\n'.format(group_name)
		if not table_is_empty(u_arr):
			ci_msg += 'update: ' + ','.join(u_arr)

		if not table_is_empty(a_arr):
			ci_msg += '\n'
			ci_msg += 'add: ' + ','.join(a_arr)

		if not table_is_empty(delete_list):
			ci_msg += '\n'
			ci_msg += 'delete: ' + ','.join(str(x) for x in delete_list)
	else:
		be_group = is_temp_ele(copy_xml) and is_group_ele(copy_xml[0])

		group_arr = []
		if be_group:
			for x in copy_xml:
				root.append(x)
				group_arr.append(x.attrib.get('id'))
		else:
			copy_xml.tag = "Group"
			copy_xml.attrib['id'] = group_name
			root.append(copy_xml)
			group_arr.append(group_name)
		ci_msg = 'new add: ' + ','.join(group_arr)
	indent_xml(root)

	id_len_after = len(group_ele)

	mydata = ET.tostring(root)
	mydata_str = mydata.split('\n')
	# print(mydata_str[0])
	# print(mydata_str)

	after_rep = None
	if is_blank_xml or No_Group:
		mydata_str.insert(0,'<?xml version="1.0" encoding="UTF-8" standalone="no"?>')
		after_rep = mydata_str

		for i,x in enumerate(after_rep):
			after_rep[i] += '\n'
	else:
		tr = _find_first_last_group(mydata_str)

		mydata_str_2 = None
		with open(filename,'r') as f:
			mydata_str_2 = f.readlines()
		after_rep = replace_head_tail(mydata_str_2,mydata_str)

	with open(filename,'w') as f:
		for line in after_rep:
			f.write(line)

	print(ci_msg)
	return [ci_msg or 'auto commit.',[id_len_before,id_len_after]]

def get_group_name():
	# return "effect_pool"
	return my_input(u'请输入表名')

def upgrade_ver(filename):
	if not os.path.exists(filename):
		return ''
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

		return 'upgrade verstion.txt from{0} to {1}'.format(ver_line,ver_str)
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

	print(ci_msg)
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

def show_menu(js_data):
	pass

	if not js_data.get('destination'):
		raise_error(u'配置文件应该含有 destination')
		return

	for i,v in enumerate(js_data['destination']):
		print(str(i+1) + ": " + v['nickname'])

def has_choose(info):
	for x in info.get('checks'):
		if x.get() == True:
			return True
	return False

def get_id_change_desc(id_change):
	if table_is_empty(id_change):
		return u''
	if len(id_change) == 2:
		return u'\nid count before: ' + str(id_change[0]) + ', id count after: ' + str(id_change[1])
	return u''

def main():
	pass

	js_data = None
	try:
		js_data = open_json_file("config.json")
	except Exception as e:
		raise_error(u'config.json 配置有误,请检查')

	file_type = my_input(u'(1) 提交xml表、 (2) 提交多语言: ', True).rstrip()
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

	pub_file_len = len(pub_file_name)
	all_lang_json = None
	if pub_file_len > 1:
		all_lang_file = my_input(u'请拖入全语言文件: ').rstrip()
		all_lang_json = open_json_file(all_lang_file)
	
	choose_version(js_data['destination'])

	for info in js_data['destination']:
		ci_flag = None
		if file_is_lang:
			ci_flag = my_input(u'是否复制到 ' + info['nickname'] + ' (y/n)?') == 'y'
		else:
			ci_flag = has_choose(info)
		
		if ci_flag:
			fen_biao_flag = info.get('fen_biao') == True
			ver_to_publish = None
			if file_is_xml:
				ver_to_publish = info.get('range')
				if table_is_empty(ver_to_publish):
					ver_to_publish = ['.']
				else:
					vp = []
					for i,x in enumerate(info.get('checks')):
						if x.get():
							vp.append(ver_to_publish[i])
					ver_to_publish = vp

				# ver_to_publish = ['.'] if table_is_empty(ver_to_publish) else ver_to_publish
			elif file_is_lang:
				ver_to_publish = my_input(u'请输入发布版本 x~y 或 x,y,z: ').rstrip()
				if ver_to_publish.count('~') == 1:
					ver_to_publish = get_ver_range(ver_to_publish)
				else:
					ver_to_publish = ver_to_publish.split(',')

				for i,v in enumerate(ver_to_publish):
					ver_to_publish[i] = get_safe_ver(v)

			if not table_is_empty(ver_to_publish):
				for ver in ver_to_publish:
					pt = os.path.join(info['path'],ver)
					id_change = None
					if os.path.exists(pt):
						svn_update(pt)

						ci_msg = ''
						ci_msg1 = None

						blank_xml = False
						if file_is_xml:
							dst_file = None
							if fen_biao_flag:
								pass
								
								dst_file = os.path.join(pt,group_name + '.xml')
								all_xml = get_files_in_dir(pt)
								if not table_contains(all_xml,group_name+'.xml'):
									blank_xml = True
									get_blank_xml(dst_file)
									subprocess.call(['svn','add',dst_file,'--force'])
							else:
								dst_file = os.path.join(pt,'database.local.xml')


							if os.path.exists(dst_file):
								modify_res = modify_file_xml(copy.deepcopy(copy_xml),dst_file,group_name,blank_xml)
								ci_msg1 = modify_res[0]
								id_change = modify_res[1]
						elif file_is_lang:
							for pb in pub_file_name:
								dst_file = os.path.join(pt,pb)
								if os.path.exists(dst_file):
									copy_txt = None

									if pub_file_len == 1:
										my_input(u'请将要复制的内容拷贝到剪贴板后回车')
										copy_txt = getClipBoardContent().rstrip().split('\n')
									else:
										copy_txt = all_lang_json.get(pb)
									
									if copy_txt:
										ci_msg1 = modify_file_ini(copy_txt,dst_file,pb)

						# /Users/tangwen/Documents/my_projects/cok/outerDyRes75/5.08.0
						ci_msg2 = '' #upgrade_ver(os.path.join(pt,'VERSION.txt'))
						if isStringNil(ci_msg):
							ci_msg = ci_msg1 + '\n' + ci_msg2

						ver_name = info.get('nickname') if ver == '.' else ver
						# is_check = yes_no_dialog(u"是否检查修改 " + ver_name + get_id_change_desc(id_change) if id_change else '')[0] == 'y'
						# # my_input(u"是否检查修改 (y/n)?") == 'y'
						# if is_check:
						# 	subprocess.call(['svn','diff',dst_file])

						is_commit = yes_no_dialog(u"是否提交 " + ver_name)[0] == 'y'
						# my_input(u"是否提交 (y/n)?") == 'y'
						if is_commit:
							svn_commit(str(pt),ci_msg)
							pass
					else:
						raise_error(u'找不到对应文件 '+ pt,True)

def yes_no_dialog(msg):
	the_answer = []

	tw = 450
	th = 100
	size_cfg = [str(tw),str(th)]
	window = Tk()

	window.geometry('x'.join(size_cfg) + '+100+100')
	window.title("提示")
	lbl = Label(window, text=msg)
	lbl.grid(column=0, row=0)
	
	def clickYes():
		the_answer.append('y')
		window.withdraw()
		window.quit()
		return 'y'
	
	btn = Button(window, text="Yes", bg="orange", fg="red",command=clickYes)
	btn.grid(column=0, row=2)

	def clickNo():
		the_answer.append('n')
		window.withdraw()
		window.quit()
	btn = Button(window, text="Cancel", bg="orange", fg="red",command=clickNo)
	btn.grid(column=1, row=2)

	window.mainloop()
	return the_answer

def choose_version(js_data):
	window = Tk()

	window.geometry('900x300+100+100')
 
	window.title(u"请选择版本")

	lbl = Label(window, text="Hello")
	lbl.grid(column=0, row=0)

	for i,x in enumerate(js_data):
		lbl = Label(window, text=x['nickname'])
		lbl.grid(column=i, row=1)

		x['checks'] = []
		if len(x['range']) > 0:
			for j,y in enumerate(x['range']):

				chk_state = BooleanVar()
				 
				chk_state.set(False) #set check state
				 
				chk = Checkbutton(window, text=y, var=chk_state)
				
				chk.grid(column=i, row=2+j)

				x['checks'].append(chk_state)
		else:
			chk_state = BooleanVar()
			chk_state.set(False) #set check state
			chk = Checkbutton(window, text=x['nickname'], var=chk_state)
			chk.grid(column=i, row=2+0)
			x['checks'].append(chk_state)

	def click():
		pass
		window.withdraw()
		window.quit()
	btn = Button(window, text="确定", bg="orange", fg="red",command=click)
	btn.grid(column=1, row=20)

	window.mainloop()

def test():
	pass
	# js_data = open_json_file("config.json")
	# choose_version(js_data['destination'])	
	# old_xml = [1,2,3]
	# new_xml = ['4',5,6]
	# old_xml[:] = [item for item in new_xml]

	# print(old_xml)

	# ready = my_input(u'请将要复制的内容拷贝到剪贴板后回车')
	# copy_xml = checkClipContent(getClipBoardContent(),'xml')
	# print('copy_xml',copy_xml)

if __name__ == '__main__':
	if len(sys.argv) == 1:
		if False:
			test()
		else:
			main()
	else:
		print('how to install enviroment')
		print('step1: install python 2.7')
		print('step2: pip install lxml')
		print('step3: [windows only] pip install pywin32')

	pass