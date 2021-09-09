# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import time, thread

import mygui

import Tkinter as tk_lib
from TkinterDnD2 import *
from functools import partial

import split_spine
import myutils

Tool_Name = u'Spine切分工具'
Release_Version = '0.0.2'
RecFile = "_recopt.json"

class SpineGUI():
    def __init__(self):
        self.m_file_dir = ""
        self.m_decframe = 0
        self.m_scale = 1
        self.m_incalculate = False

    def show(self):
        rect_opt = myutils.get_jsonfrom_file(RecFile)
        rect_opt = rect_opt if rect_opt else {
            'file_path': u'拖入文件夹...',
            'scale': '1',
            'dec_frame': '0',
            'act_name': 'idle',
        }

        window = TkinterDnD.Tk()
        self.m_window = window

        window.geometry('900x300+100+100')

        window.title(u"{}v{}".format(Tool_Name, Release_Version))

        row_num = 0
        lbl = tk_lib.Label(window, text="输出目录与源文件夹同级")
        lbl.grid(column=0, row=row_num)
        row_num+=1

        lbl = tk_lib.Label(window, text=u"是否切图:")
        lbl.grid(column=0, row=row_num)

        chk_state = tk_lib.BooleanVar()
        chk_state.set(False)
        chk = tk_lib.Checkbutton(window, text='不需要', var=chk_state)
        chk.grid(column=1, row=row_num)
        row_num+=1

        lbl = tk_lib.Label(window, text=u"资源:")
        lbl.grid(column=0, row=row_num)

        # open file
        t_label = tk_lib.LabelFrame(window, text = u"源文件夹")
        t_label.grid(column = 1, row = row_num,sticky="W")

        # bowse file btn
        file_sv = tk_lib.StringVar()
        t_btn = self.gen_file_input(t_label,file_sv,None,rect_opt['file_path'],10)
        t_btn.grid(column = 2, row = row_num,sticky="W")
        row_num+=1

        lbl = tk_lib.Label(window, text=u"缩放:")
        lbl.grid(column=0, row=row_num)

        text1 = tk_lib.Entry(window)
        text1.insert(0,rect_opt['scale'])
        text1.grid(column=1, row=row_num)
        row_num+=1

        lbl = tk_lib.Label(window, text=u"抽帧:")
        lbl.grid(column=0, row=row_num)

        text2 = tk_lib.Entry(window)
        text2.insert(0,rect_opt['dec_frame'])
        text2.grid(column=1, row=row_num)
        row_num+=1

        lbl = tk_lib.Label(window, text=u"批量前缀:")
        lbl.grid(column=0, row=row_num)

        text3 = tk_lib.Entry(window)
        text3.insert(0,rect_opt['act_name'])
        text3.grid(column=1, row=row_num)
        row_num+=1

        # progress = tk_lib.Label(window, text=u"")
        # progress.grid(column=0, row=row_num)
        # row_num+=1

        def click():
            pass
            if self.m_incalculate:
                return
            self.m_incalculate = True
            argc_ok = True
            start_count = False

            done = [False]
            dot_cnt = 0
            rect_opt = {}
            while True:
                if not start_count:
                    start_count = True

                    use_v3 = chk_state.get() == False

                    file_path = file_sv.get()
                    if file_path[0] == u'{':
                        file_path = file_path[1:-1]
                    if file_path == u'' or file_path == u'拖入文件夹...':
                        mygui.yes_no_dialog(u'缺少源资源文件夹~')
                        argc_ok = False
                        break
                    rect_opt['file_path'] = file_path
                    
                    if not myutils.is_number(text1.get()):
                        mygui.yes_no_dialog(u'缩放必须为数值~')
                        argc_ok = False
                        break

                    scale = float(text1.get())
                    rect_opt['scale'] = scale

                    if not myutils.is_number(text2.get()):
                        mygui.yes_no_dialog(u'抽帧必须为数值~')
                        argc_ok = False
                        break

                    dec_frame = int(text2.get())
                    act_name = str(text3.get())

                    rect_opt['dec_frame'] = dec_frame
                    rect_opt['act_name'] = act_name
                    
                    def thread_count_( ):
                        split_spine.calculate_pngcount(file_path,scale,dec_frame,act_name,use_v3)
                        done[0] = True
                    thread.start_new_thread( thread_count_, () )
                else:
                    pass
                    if done[0]:
                        break
                    time.sleep(1)
                    
                    s = u'处理中{0}'.format('.'* dot_cnt)
                    print(s, end='\r')
                    dot_cnt += 1
            if argc_ok:
                myutils.write_dict_tofile(RecFile, rect_opt)
                window.withdraw()
                window.quit()
                mygui.show_msg_box(u'处理完成!',Tool_Name)
        btn = tk_lib.Button(window, text="确定", bg="orange", fg="red",command=click)
        btn.grid(column=20, row=2000)
        window.mainloop()

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

def getToolName():
    return Tool_Name
def getToolVersion():
    return Release_Version

def main_ui():
    wd = SpineGUI()
    r = wd.show()

def main():
    main_ui()
    pass

if __name__ == "__main__":
    main()