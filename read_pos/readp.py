# -*- coding: utf-8 -*

from __future__ import print_function
import sys,re
import subprocess
import platform

Num_Re = re.compile(r"[+-]?\d+(?:\.\d+)?")

if platform.system() == 'Windows':
	import win32clipboard

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

def getClipBoardContent():
	if platform.system() == 'Windows':
		win32clipboard.OpenClipboard()
		data = win32clipboard.GetClipboardData()
		win32clipboard.CloseClipboard()
		return data.decode('utf-8')
	else:
		print(u'正在读取粘贴板...')
		p = subprocess.Popen(['pbpaste'], stdout=subprocess.PIPE)
		retcode = p.wait()
		data = p.stdout.read()
		print(u'读取粘贴板成功')
		#这里的data为bytes类型，之后需要转成utf-8操作
		return data.decode('utf-8')


def main():
	pass
	res = getClipBoardContent().rstrip().split('\n')
	tl = []
	for i,line in enumerate(res):
		if line.count('>Position<'):
			t = []
			for j in range(2):
				t.append(int(float(Num_Re.search(res[i + 3 + j]).group(0))))

			tl.append(t)

	for x in tl:
		print(x[0],',',x[1])

def test():
	pass

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