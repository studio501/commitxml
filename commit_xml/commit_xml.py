# -*- coding: utf-8 -*

from __future__ import division
from __future__ import print_function
import sys,os,re
from os import listdir
from os.path import isfile, join
import xml.etree.ElementTree as ET

import subprocess

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
	p = subprocess.Popen(['pbpaste'], stdout=subprocess.PIPE)
	retcode = p.wait()
	data = p.stdout.read()
	#这里的data为bytes类型，之后需要转成utf-8操作
	return data.decode('utf-8')

def checkClipContent(str_content,file_type='xml'):
	str_arr = str_content.split('\n')
	try:
		for x in str_arr:
			if file_type == 'xml':
				ET.fromstring(x)
	except:
		raise_error(u"粘贴内容格式错误,请重新粘贴正确格式数据")
	else:
		print(u'数据格式正确')

	return str_arr

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

def modify_file_xml(str_content,filename):
	tree = ET.parse(filename)
	root = tree.getroot()
	# print(root[0][1])
	for elem in root:
		print(elem.attrib)
	    # for subelem in elem:
	    #     print(subelem.attrib)

	mydata = ET.tostring(root)
	mydata_str = mydata.split('\n')
	# print(mydata_str[0])
	# print(mydata_str[1])

	tr = _find_first_last_group(mydata_str)
	print(tr)

	mydata_str_2 = None
	with open(filename,'r') as f:
		mydata_str_2 = f.readlines()
	after_rep = replace_head_tail(mydata_str_2,mydata_str)

	with open("items2.xml",'w') as f:
		for line in after_rep:
			f.write(line)

def main(src_path,config_file):
	pass

	file_type = '1'
	pub_file_name = 'database.local.xml'

	ready = my_input(u'请将要复制的内容拷贝到剪贴板后回车')

	# print(getClipBoardContent())
	str_arr = checkClipContent(getClipBoardContent(),'xml')

	js_data = open_json_file("config.json")

	for info in js_data['destination']:
		ci_flag = my_input(u'是否提交 ' + info['nickname'] + ' (y/n)?') == 'y'
		if ci_flag:
			ver_to_publish = my_input(u'请输入发布版本 x~y 或 x,y,z').rstrip()
			if not isStringNil(ver_to_publish):
				ver_range = None
				if ver_to_publish.count('~') == 1:
					ver_range = get_ver_range(ver_to_publish)
				else:
					ver_range = ver_to_publish.split(',')

				if ver_range:
					for ver in ver_range:
						pt = os.path.join(info['path'],ver)
						if os.path.exists(pt):
							dst_file = os.path.join(pt,pub_file_name)
							if os.path.exists(dst_file):
								modify_file_xml(str_arr,dst_file)
							else:
								raise_error(u'找不到对应文件 '+ pub_file_name,True)
						else:
							raise_error(u'找不到此版本目录 '+ ver,True)


def test():
	pass
	# print( get_ver_range('5.01.0~5.22.0'))
	# print('5.01.0'.split(','))
	modify_file_xml("a","database.local.xml")

if __name__ == '__main__':
	if len(sys.argv) == 3:
		if True:
			test()
		else:
			main(sys.argv[1],sys.argv[2])
	else:
		print('@param1: src file')
		print('@param2: config json')

	pass