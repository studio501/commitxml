# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import ctypes,platform

from Tkinter import *

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

def show_msg_box(msg, title='Notice'):
    if platform.system() == 'Windows':
        pass
        MessageBox = ctypes.windll.user32.MessageBoxW
        MessageBox(None, msg, title, 0)
    else:
        str1 = u'Tell application "System Events" to display dialog "{}" with title "{}"'.format(msg, title)
        subprocess.call(['osascript','-e',str1])
