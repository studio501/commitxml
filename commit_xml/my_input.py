# -*- coding: utf-8 -*
from __future__ import print_function
import sys

InputNotice = []

def table_is_empty(tb):
	return not tb or len(tb) == 0

def table_contains(tb,s):
	for x in tb:
		if x == s:
			return True
	return False

def is_number(str):
    try:
        # 因为使用float有一个例外是'NaN'
        if str=='NaN':
            return False
        float(str)
        return True
    except ValueError:
        return False

def isStringNil(str):
	return (not str) or str == ''

def my_input(msg,needNumber = False,skipCheckFace = False):
	face_flag = isinstance(msg,unicode) and table_contains(InputNotice,msg) and (not skipCheckFace)
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