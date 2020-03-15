# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re

# CcbDyRes

def isStringNil(str):
	return (not str) or str == ''

def my_input(msg):
	while True:
		print(msg)
		try:
			tmpStr = raw_input().rstrip()
			if os.path.isfile(tmpStr) or tmpStr == '':
			    return tmpStr
			else:
			    print(u'输入有误,请重新输入')
		except KeyboardInterrupt:
			print("\nInterrupted by user")
			sys.exit()

def do_copy_file(src_file, dst):
    if isStringNil(src_file):
        return

    shutil.copy(src_file, dst)

def main():
    icon = my_input('请拖入口图标')

    shop = my_input('请拖入尊享商城广告图')

    basin = my_input('请拖入幸运转盘底图')

    coin_icon = my_input('请拖入金币图标')

    ticket_icon = my_input('请拖入点券图标')

    ccbDyRes = os.getenv('CcbDyRes')


    dst1 = os.path.join(ccbDyRes,'dynamicResource','NewYearDay2020_face','NewYearDay2020_face')
    dst2 = os.path.join(ccbDyRes,'dynamicResource','goods_03','prop')

    do_copy_file(icon,os.path.join(dst1,'nyd_2020_02.png'))
    do_copy_file(shop,os.path.join(dst1,'nyd_2020_01.png'))
    do_copy_file(basin,os.path.join(dst1,'nyd_2020_03.png'))

    coin_path = os.path.join(dst2,'icon_nyd_2020_coin.png')
    ticket_path = os.path.join(dst2,'icon_nyd_2020_ticket.png')
    do_copy_file(coin_icon,coin_path)
    do_copy_file(ticket_icon,ticket_path)
    

if __name__ == "__main__":
    main()