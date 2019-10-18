# -*- coding: utf-8 -*

from __future__ import division
from __future__ import print_function
import sys,os,re
from os import listdir
from os.path import isfile, join
import json
import xml.etree.ElementTree as ET
import time

import subprocess

import gitlab

Re1 = re.compile(r':(.*)/')

def table_contains(tb,s):
	for x in tb:
		if x == s:
			return True
	return False


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



def append_by_table(tb1,tb2,tsep=''):
	for x in tb2:
		tb1.append(x + tsep)


def get_current_branch():
	res = subprocess.check_output(['git','branch'])
	for x in res.split('\n'):
		if x.count('*') == 1:
			return x[2:]

	raise_error('no branch found')

def get_all_branch():
	res = subprocess.check_output(['git','branch'])
	return res

def pull_branch(branchName,remoteName):
	pass
	subprocess.call(['git','checkout',branchName])
	time.sleep( 0.5 )
	subprocess.call(['git','pull',remoteName,branchName])

def getRemote():
	res = subprocess.check_output(['git','remote','-v']).split('\n')
	r = []
	for x in res:
		group = Re1.findall(x)
		if group and len(group) == 1:
			if len([y for y in r if y[0] == group[0]]) == 0:
				r.append( [ group[0],x.split('\t')[0] ] )
	return r

def getUserName():
	res = subprocess.check_output(['git','config','--list']).split('\n')
	user_name = 'user.name'
	for x in res:
		if x.count(user_name):
			return x[len(user_name)+1:]

def getUserRemote():
	all_remote = getRemote()
	return [x for x in all_remote if x[0] == getUserName()][0][1]

def main(commit_ssha):
	pass

	self_remote = getUserRemote()

	subprocess.call(['git','branch'])
	need_branch = my_input(u'输入要提交的分支 空格分隔').rstrip().split(' ')
	for x in need_branch:
		pull_branch(x,self_remote)
		time.sleep( 0.5 )
		subprocess.call(['git','cherry-pick',commit_ssha])
		time.sleep( 0.5 )
		subprocess.call(['git','push',self_remote,x])
		time.sleep( 0.5 )
		print(u'提交 {0} 成功',x)


def test():
	pass

	server_url = 'https://git.elex-tech.com/tangwen/clientcode'
	gl = gitlab.Gitlab(server_url, private_token='hhtzC8mxC18pmsAY4_w-')
	projects = gl.projects
	for x in projects.list():
		print(x.accessrequests.list())
	# ten_first_groups = gl.groups.list(page=1, per_page=10)
	# print(ten_first_groups)


if __name__ == '__main__':
	if len(sys.argv) == 2:
		if True:
			test()
		else:
			main(sys.argv[1])
	else:
		print('@param1: src file')
		print('@param2: config json')

	pass