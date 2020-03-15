# -*- coding: utf-8 -*

# https://stackoverflow.com/questions/25427347/how-to-install-and-use-tkdnd-with-python-tkinter-on-osx

from __future__ import print_function
import sys,os,re,json
import os
import os.path
import shutil,json,plistlib
import subprocess

import Tkinter as tk_lib
from tkFileDialog import askopenfilename
from functools import partial

from TkinterDnD2 import *
import zipfile

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

def find_ch_in_str(s,ch):
	res = [i for i, ltr in enumerate(s) if ltr == ch]
	return table_is_empty(res) and -1 or res[0]

def check_png_name_(f,endKey = '_',dot = '.'):
	bn = os.path.basename(f)
	if bn[find_ch_in_str(bn,dot)-1] != endKey:
		return 1
	
	for x in bn:
		if ord(x) > 255:
			return 2

	return None

def find_ext_file(src,file_ext='.json',sub_names=None,all_flag=False):
	if not os.path.isdir(src):
		return None
	
	res = []
	if not sub_names:
		for f in os.listdir(src):
			if file_extension(f) == file_ext:
				find_file = os.path.join(src,f)
				if not all_flag:
					return find_file
				res.append(find_file)
	else:
		for export_dir in sub_names:
			export_dir = os.path.join(src,export_dir)
			if os.path.exists(export_dir):
				for f in os.listdir(export_dir):
					if file_extension(f) == file_ext:
						find_file = os.path.join(export_dir,f)
						if not all_flag:
							return find_file

						res.append(find_file)
	if all_flag:
		return res

def find_sk_image_file(src):
	image_dirs = ['images','image','Images','Image']
	exist_dir = None
	for x in image_dirs:
		if os.path.exists(os.path.join(src,x)):
			exist_dir = x
			break
	if exist_dir:
		return find_ext_file(src,'.png',[exist_dir],True)

def get_directory(file_path,level):
	pass

	p = file_path
	i = 0
	while i < level:
		i+=1
		p = os.path.dirname(p)
	return p

def find_sk_json_file(src):
	return find_ext_file(src,'.json',['export','exports','Export','Exports'])

def find_icon_file(src):
	res = find_ext_file(src,'.png',None,True)
	if not table_is_empty(res):
		r = []
		for x in res:
			if x.count('94') == 1 or x.count('128') == 1:
				r.append(x)

		return r

def find_plist_file(src):
	res = find_ext_file(src,'.plist',None,True)
	pngs = []
	if not table_is_empty(res):
		for f in res:
			s = plistlib.readPlist(f)
			pngs.append(s['textureFileName'])

		return res,pngs
		# r = []
		# for x in res:
		# 	if x.count('94') == 1 or x.count('128') == 1:
		# 		r.append(x)

		# return r


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

def copy_file(sourceDir, targetDir, defList = None, ensureLastCh = '', specFiles = None):
	for f in os.listdir(sourceDir):
		sourceF = os.path.join(sourceDir,f)
		targetF = os.path.join(targetDir,f)
		if os.path.isfile(sourceF):
			ext = file_extension(sourceF)
			check_specfiles = not specFiles or table_contains(specFiles,file_without_extension(sourceF))
			if check_specfiles and (table_is_empty(defList) or table_contains(defList,ext)):
				do_copy_file(sourceF,targetF)
		if os.path.isdir(sourceF):
			try_create_dir(targetF)
			copy_file(sourceF,targetF,defList,ensureLastCh,specFiles)

def do_copy_file(src_file, dst):
	shutil.copy(src_file, dst)

def try_create_dir(dst):
	pass
	if not os.path.exists(dst):
		os.makedirs(dst)

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
		self.m_pack_types = [u'外城',u'翅膀',u'铭牌',u'光环',u'行军队列',u'城堡特效',u'聊天气泡']
		# json files
		self.m_json_tabs = []
		self.m_json_files = []
		self.m_animaOpv = []
		self.m_actOpv = []
		self.m_positionField = []

		# iconf files
		self.m_icon_tabs = []
		self.m_icon_files = []

		# plist files
		self.m_plist_tabs = []
		self.m_plist_files = []

		# zip files
		self.m_zip_tabs = []
		self.m_zip_files = []

		# rows
		self.m_json_start_raw = 4
		self.m_icon_strat_row = 20
		self.m_plist_strat_row = 30
		self.m_zip_strat_row = 40

		# 
		self.m_selectTypeName = ''
		self.m_selectType = -1

	def getPackTypeByName(self,typeName):
		return self.m_pack_types.index(typeName)

	def show(self):
		res = {}
		self.m_res = res

		window = TkinterDnD.Tk()
		# tk_lib.Tk()
		self.m_window = window

		window.geometry('900x800+100+100')

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
		for i in range(0,10):
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

		# 粒子
		lbl = tk_lib.Label(window, text="粒子文件*:")
		lbl.grid( row=self.m_plist_strat_row, column=0)
		la = []
		for i in range(10):
			la.append(i)
		plistOpt,plistOpt_v = self.make_option(self.select_hava_plist,la)
		plistOpt.grid(row=self.m_plist_strat_row, column=1,sticky="W")
		self.m_plistOpt_v = plistOpt_v

		# prev zip
		lbl = tk_lib.Label(window, text="追加zip*:")
		lbl.grid( row=self.m_zip_strat_row, column=0)
		la = [u'是',u'否']
		zipOpt,zipOpt_v = self.make_option(self.select_hava_zip,la)
		zipOpt.grid(row=self.m_zip_strat_row, column=1,sticky="W")
		self.m_zipOpt_v = zipOpt_v

		# 选择文件
		# self.chooseFileLabel = tk_lib.LabelFrame(window, text = "Open File")
		# self.chooseFileLabel.grid(column = 0, row = 3)

		# self.chooseFileButton = tk_lib.Button(self.chooseFileLabel, text = "Browse A File",command = self.fileDialog)
		# self.chooseFileButton.grid(column = 1, row = 3)

		def click():
			pass

			res['skin_name'] = skin_name_field.get()
			res['skin_type'] = pack_type_v.get()
			res['skin_type_number'] = self.m_selectType
			res['spine_cfg'] = []
			for i,x in enumerate(self.m_json_files):
				t = {}
				t['src_dir'] = x
				act_v = self.m_animaOpv[i].get()
				if act_v == u'待机':
					t['act'] = 'out'
				elif act_v == u'攻击':
					t['act'] = 'out_gongji'
				t['position'] = [self.m_positionField[i][0].get(),self.m_positionField[i][1].get()]
				res['spine_cfg'].append(t)

			res['icon_src'] = '' if table_is_empty(self.m_icon_files) else self.m_icon_files[0]
			res['plist_src'] = '' if table_is_empty(self.m_plist_files) else self.m_plist_files[0]
			res['prev_zip'] = self.m_zip_files[0] if len(self.m_zip_files) > 0 else ''


			window.withdraw()
			window.quit()
		btn = tk_lib.Button(window, text="确定", bg="orange", fg="red",command=click)
		btn.grid(column=20, row=2000)

		window.mainloop()

		if res['skin_type'] == u'外城':
			a = 100

		return res

	def gen_file_input(self,root,entry_sv,call_back,dropMsg = 'Drop Here...',in_width=5):
		pass
		root = root if root else self.m_window

		def drop(event):
			entry_sv.set(event.data)

		entry_sv.set(dropMsg)
		entry = tk_lib.Entry(root, textvar=entry_sv, width=in_width)
		entry.drop_target_register(DND_FILES)
		entry.dnd_bind('<<Drop>>', call_back if call_back else drop)

		return entry

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
		self.m_haveIcon = self.m_iconOpt_v.get() == u'有'
		self.create_icon_tab(self.m_haveIcon)

	def select_hava_plist(self,*args):
		pass
		# self.m_havePlist = self.m_plistOpt_v.get() == u'有'
		self.m_havePlist = int(self.m_plistOpt_v.get())
		self.create_plist_tab(self.m_havePlist)

	def select_hava_zip(self,*args):
		pass
		self.m_haveZip = self.m_zipOpt_v.get() == u'是'
		self.create_zip_tab(self.m_haveZip)

	def select_json_num(self,*args):
		pass
		self.create_json_tab(int(self.m_json_num_v.get()))

	def select_spine(self):
		pass

	def create_icon_tab(self,has_icon):
		self.create_file_tab__(has_icon,self.dragIconDir)

	def create_plist_tab(self,has_plist):
		self.create_file_tab__(has_plist,self.dragPlistDir,'m_plist_tabs','m_plist_files','m_plist_strat_row',True)

	def create_zip_tab(self,has_zip):
		self.create_file_tab__(has_zip,self.dragZipDir,'m_zip_tabs','m_zip_files','m_zip_strat_row',True)

	def create_file_tab__(self,has_icon,drag_func,tabmem_name='m_icon_tabs',filemem_name='m_icon_files',strat_row='m_icon_strat_row',posFlag=False):
		
		prev_has_icon = None
		if isinstance(has_icon,bool):
			prev_has_icon = len(getattr(self,tabmem_name)) > 0
		else:
			prev_has_icon = len(getattr(self,tabmem_name))

		if has_icon == prev_has_icon:
			return

		if not has_icon:
			for i in range(1):
				for y in getattr(self,tabmem_name)[i]:
					y.grid_remove()
			
			setattr(self,tabmem_name,[])
			setattr(self,filemem_name,[])
			return

		start_row = getattr(self,strat_row) + 1
		window = self.m_window

		for i in range(1):
			getattr(self,filemem_name).append('')
			# self.m_icon_files.append('')

			row_num = start_row + i

			# json file x:
			t_label0 = tk_lib.Label(window, text = '*')
			t_label0.grid(column = 0, row = row_num,sticky="W")

			# open file
			t_label = tk_lib.LabelFrame(window, text = "Open File")
			t_label.grid(column = 1, row = row_num,sticky="W")

			# bowse file btn
			file_sv = tk_lib.StringVar()
			t_btn = self.gen_file_input(t_label,file_sv,partial(drag_func,i),'Drop Here...',10)
			# t_btn = tk_lib.Button(t_label, text = "Browse A File",command = partial(self.iconFileDialog,i))
			t_btn.grid(column = 2, row = row_num,sticky="W")
			
			# file name text
			t_label1 = tk_lib.Label(t_label, text = "")
			t_label1.grid(column = 3, row = row_num,sticky="W")

			# position
			if posFlag:
				pos_label = tk_lib.LabelFrame(t_label, text = "position:x,y")
				pos_label.grid(column = 4, row = row_num,sticky="W")
				pos_label.grid_remove()
				pos_arr = []
				t_label.m_pos_arr = pos_arr
				for pos_i in range(2):
					t_field = tk_lib.Entry(master=pos_label,width=5)
					t_field.grid(row=0, column=pos_i)
					t_field.insert(tk_lib.END,'0')
					pos_arr.append(t_field)
				# self.m_positionField.append(pos_arr)


			getattr(self,tabmem_name).append([
			t_label, #0
			t_btn, #1
			t_label1, #2
			t_label0, #3
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
			# t_btn = tk_lib.Button(t_label, text = "Browse A File",command = partial(self.fileDialog,i))
			file_sv = tk_lib.StringVar()
			# gen_file_input(self,root,entry_sv,call_back,dropMsg = 'Drop Here...',in_width=80)
			t_btn = self.gen_file_input(t_label,file_sv,partial(self.dragJsonDir,i),'Drop Here...',10)
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

	def iconFileDialog(self,index,file_path):
		tab = self.m_icon_tabs[index]
		self.m_icon_files[index] = file_path
		r = []
		for x in file_path:
			r.append(os.path.basename(x))
		tab[2].configure(text = ';'.join(r))

	def zipFileDialog(self,index,file_path):
		
		tab = self.m_zip_tabs[index]
		self.m_zip_files[index] = file_path
		tab[2].configure(text = os.path.basename(file_path))

	def plistFileDialog(self,index,file_path,png_path):
		tab = self.m_plist_tabs[index]
		self.m_plist_files[index] = file_path
		r = []
		for x in file_path:
			r.append(os.path.basename(x))
		tab[2].configure(text = ';'.join(r))

		for x in png_path:
			self.m_plist_files[index].append(x)

		pos_arr = tab[0].m_pos_arr
		for x in pos_arr:
			x.grid()

		print(self.m_plist_files[index])

	def dragJsonDir(self,index,event):
		pass
		file_path = event.data.split()[0]

		file_ext = file_extension(file_path)
		is_png = file_ext == '.png'
		is_nameplate = self.m_selectTypeName == u'铭牌'
		if is_png and is_nameplate:
			self.fileDialog(index,file_path)
			return


		json_path = find_sk_json_file(file_path)
		image_path = find_sk_image_file(file_path)
		image_path_basename = []
		for x in image_path:
			image_path_basename.append(os.path.basename(x))

		tab = self.m_json_tabs[index]
		for i,x in enumerate(image_path_basename):
			result = check_png_name_(x)
			if result == 1:
				tab[2].configure(text = u'{} not end with _'.format(x))
				return

			if result == 2:
				tab[2].configure(text = u'invalid name {}'.format(x))
				return


		self.fileDialog(index,json_path)

	def dragZipDir(self,index,event):
		pass
		file_path = event.data.split()[0]

		file_ext = file_extension(file_path)
		is_zip = file_ext == '.zip'
		if not is_zip:
			return
		# file_path = find_icon_file(file_path)
		self.zipFileDialog(index,file_path)

	def dragIconDir(self,index,event):
		pass
		file_path = event.data.split()[0]
		file_path = find_icon_file(file_path)
		self.iconFileDialog(index,file_path)

	def dragPlistDir(self,index,event):
		pass
		file_path = event.data.split()[0]
		file_path,pngs_path = find_plist_file(file_path)
		if not table_is_empty(file_path):
			dir_path = os.path.dirname(file_path[0])
			for i,x in enumerate(pngs_path):
				pngs_path[i] = os.path.join(dir_path,x)
			self.plistFileDialog(index,file_path,pngs_path)

	def fileDialog(self,index,file_path = None):
		tab = self.m_json_tabs[index]
		if not file_path:
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
		continue_flag = False
		wd = GenZipGUI()

		r = wd.show()
		print('one skin config is',r)
		
		if isStringNil(r['skin_name']):
			continue_flag = yes_no_dialog(u'请输入皮肤名')[0] == 'y'
		else:
			res.append(r)
			continue_flag = yes_no_dialog(u'是否继续?')[0] == 'y'

		if not continue_flag:
			break
	
	return res


def test(a = 'abcd'):
	pass
	a = u'123中文'
	for x in a:
		s = ord(x)

		b = s

	get_directory('/Users/tangwen/Documents/my_projects/cplusplus_test/opengl_st1/Opengl_st1/commit_xml/spine/spineboy.png',2)

def try_clean_dir(dst):
	if os.path.exists(dst):
		shutil.rmtree(dst)

if __name__ == '__main__':
	use_test = False
	if use_test:
		test()
	else:
		res = gui_gen_zip()
		prev_zip = [x['prev_zip'] for x in res if x['prev_zip'] !='']
		print('prev_zip,,',prev_zip)
		prev_zip = prev_zip[0] if len(prev_zip) > 0 else False

		default_zip = 'skin.zip'
		skin_cfg_json = 'skin_config.json'
		if not prev_zip:
			dst_dir = 'skin'
			try_clean_dir(dst_dir)
			try_create_dir(dst_dir)

			# z = zipfile.ZipFile(os.path.join(dst_dir,default_zip), "w",zipfile.ZIP_DEFLATED)
			skin_cfg_json = os.path.join(dst_dir,skin_cfg_json)
			with open(skin_cfg_json, 'w' ) as outfile:
				json.dump(res, outfile)
			
			# skin config

			# spine dir
			spine_dir = []
			plist_dir = []
			for x in res:
				spine_cfg = x['spine_cfg']
				if len(spine_cfg) > 0:
					pass
					for y in spine_cfg:
						ty = get_directory(y['src_dir'],2)
						if not ty in spine_dir:
							spine_dir.append(ty)

				plist_cfg = x['plist_src']
				if not table_is_empty(plist_cfg):
					for y in plist_cfg:
						if not y in plist_dir:
							plist_dir.append(y)
			
			print('spine_dir',spine_dir)
			# 骷髅动画
			for x in spine_dir:
				pt = os.path.join(dst_dir,os.path.basename(x))
				try_create_dir(pt)
				copy_file(x,pt)

			# 粒子
			pilist_path = os.path.join(dst_dir,'plist')
			try_create_dir(pilist_path)
			for x in plist_dir:
				pt = os.path.join(pilist_path,os.path.basename(x))
				do_copy_file(x,pt)

				
			shutil.make_archive(dst_dir, 'zip', dst_dir)

			# os.remove(skin_cfg_json)
			try_clean_dir(dst_dir)


