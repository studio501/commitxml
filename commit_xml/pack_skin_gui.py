# -*- coding: utf-8 -*

from __future__ import print_function
import sys,os,re
import os
import os.path
import shutil,json
import subprocess

import Tkinter as tk_lib
from tkFileDialog import askopenfilename
from functools import partial

def is_number(str):
    try:
        if str=='NaN':
            return False
        float(str)
        return True
    except ValueError:
        return False

def isStringNil(str):
	return (not str) or str == ''


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
		if os.path.isfile(sourceF):
			ext = file_extension(sourceF)
			check_specfiles = not specFiles or table_contains(specFiles,file_without_extension(sourceF))
			if check_specfiles and (table_is_empty(defList) or table_contains(defList,ext)):
				do_copy_file(sourceF,targetF)
		if os.path.isdir(sourceF):
			try_create_dir(sourceF)
			copy_file(sourceF,TargetDir,defList,ensureLastCh,specFiles)

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
	f = open(f, "w")
	f.write(str)
	f.close()

def numInRange(n,minNum,maxNum):
	return max(minNum,min(n,maxNum))


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



def get_image_dir(src):
	imgs = ['images','image','Images','Image']
	for dir_ in imgs:
		p = os.path.join(src,dir_)
		if os.path.exists(p):
			return p
	raise_error('cannot find any image dir in' + src)



def get_animation_names(json_file):
	json_data = open_json_file(json_file)
	anims = []
	for k in json_data['animations']:
		anims.append(k)
	return anims




class GenZipGUI():
	def __init__(self):
		self.m_res = {}
		self.m_curRow = 0
		self.m_pack_types = [u'外城',u'翅膀',u'铭牌',u'光环']
		# json files
		self.m_json_tabs = []
		self.m_json_files = []
		self.m_animaOpv = []
		self.m_actOpv = []
		self.m_positionField = []

		# iconf files
		self.m_icon_tabs = []
		self.m_icon_files = []

		# rows
		self.m_json_start_raw = 4
		self.m_icon_strat_row = 20

	def getPackTypeByName(self,typeName):
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
		skin_type,pack_type_v = self.make_option(self.select_skin_type,self.m_pack_types)
		# pack_type_v = tk_lib.StringVar(window)
		# pack_type_v.set(u'请选择')
		# pack_type_v.trace('w',self.select_skin_type)
		self.m_pack_type_v = pack_type_v
		# pack_types = [u'外城',u'翅膀']
		# skin_type = tk_lib.OptionMenu(window, pack_type_v, *pack_types)

		# skin_type.pack()
		skin_type.grid(row=2, column=1,sticky="W")

		# 资源文件数量
		lbl = tk_lib.Label(window, text="资源文件数量:")
		lbl.grid( row=3, column=0)
		la = []
		for i in range(1,10):
			la.append(i)
		json_num,json_num_v = self.make_option(self.select_json_num,la)
		json_num.grid(row=3, column=1,sticky="W")
		self.m_json_num_v = json_num_v

		# 图标
		lbl = tk_lib.Label(window, text="图标文件*:")
		lbl.grid( row=self.m_icon_strat_row, column=0)
		la = [u'有',u'无']
		iconOpt,iconOpt_v = self.make_option(self.select_hava_icon,la)
		iconOpt.grid(row=self.m_icon_strat_row, column=1,sticky="W")
		self.m_iconOpt_v = iconOpt_v

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
		btn.grid(column=20, row=2000)

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

	def select_hava_icon(self,*args):
		pass

	def select_json_num(self,*args):
		pass
		# print(self.m_json_num_v.get())
		self.create_json_tab(int(self.m_json_num_v.get()))

	def select_spine(self):
		pass

	def create_icon_tab(self,has_icon):
		prev_has_icon = len(self.m_icon_tabs) > 0
		if has_icon == prev_has_icon:
			return

		if not has_icon:
			for i in range(2):
				for y in self.m_icon_tabs[i]:
					y.grid_remove()
			
			self.m_icon_tabs = []
			self.m_icon_files = []
			return
		
		start_row = self.m_icon_strat_row + 1
		window = self.m_window

		for i in range(2):
			self.m_icon_files.append('')

			row_num = start_row + i

			# json file x:
			t_label0 = tk_lib.Label(window, text = "icon {0}:".format('94' if i == 0 else '128'))
			t_label0.grid(column = 0, row = row_num,sticky="W")

			# open file
			t_label = tk_lib.LabelFrame(window, text = "Open File")
			t_label.grid(column = 1, row = row_num,sticky="W")

			# bowse file btn
			t_btn = tk_lib.Button(t_label, text = "Browse A File",command = partial(self.iconFileDialog,i))
			t_btn.grid(column = 2, row = row_num,sticky="W")
			
			# file name text
			t_label1 = tk_lib.Label(t_label, text = "")
			t_label1.grid(column = 3, row = row_num,sticky="W")


			self.m_icon_tabs.append([
			t_label, #0
			t_btn, #1
			t_label1, #2
			])

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
			t_label0 = tk_lib.Label(window, text = "resource {0}:".format(i+1))
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
		print('chooseAct,,,,',index, self.m_actOpv[index].get())		

	def chooseAnima(self,index,*args):
		pass
		print('chooseAnima,,,,',index)

		# tv = self.m_animaOpv[index]
		# print(tv.get())

	def iconFileDialog(self,index):
		tab = self.m_icon_tabs[index]
		file_path = askopenfilename(initialdir =  "/", title = "Select A File" )
		
		if file_path == '':
			return

		file_ext = file_extension(file_path)
		is_png = file_ext == '.png'

		if not is_png:
			return

		self.m_icon_files[index] = file_path
		tab[2].configure(text = os.path.basename(self.m_icon_files[index]))

	def fileDialog(self,index):
		tab = self.m_json_tabs[index]
		file_path = askopenfilename(initialdir =  "/", title = "Select A File" )

		
		if file_path == '':
			return

		file_ext = file_extension(file_path)
		is_json = file_ext == '.json'
		is_png = file_ext == '.png'
		is_nameplate = self.m_selectTypeName == u'铭牌'

		if not is_nameplate and not is_json:
			return
		
		if is_nameplate and (not is_json and not is_png):
			return

		self.m_json_files[index] = file_path
		tab[2].configure(text = os.path.basename(self.m_json_files[index]))

		if is_png:
			return

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
		is_halo = self.m_pack_type_v.get() == u'光环'

		chois_arr = None
		if is_outer_castle:
			chois_arr = [u'待机',u'攻击']
		elif is_halo:
			chois_arr = [u'城堡底下',u'城堡上面']

		if chois_arr:
			opAct,opActv = tab[6],self.m_actOpv[index]
			opAct.grid()
			opActv.set(chois_arr[0])
			opAct['menu'].delete(0,'end')
			# animas = [u'待机',u'攻击']
			for choice in chois_arr:
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



if __name__ == '__main__':
	use_test = False
	if use_test:
		test()
	else:
		gui_gen_zip()
