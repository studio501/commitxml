# -*- coding: utf-8 -*
from __future__ import print_function
import os,re,subprocess,platform,sys
import xml.etree.ElementTree as ET_Check
import myutils

MatchPng_re = re.compile(r'\!\[(.*?)\]\((.*?)\)')

if platform.system() == 'Windows':
	import win32clipboard

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

def load_xml_fromstring(req_text):
    ret = None
    try:
        ret = ET_Check.fromstring(req_text)
    except Exception as e:
        pass

    return ret

def start_upload(doc_path):
    req_text = getClipBoardContent()
    xml_doc = load_xml_fromstring(req_text)

    if xml_doc == None or xml_doc.attrib.get('id') != "attachList":
        print(u"请在chrome inspect 中拷贝到 attachList 那一级")
        exit(0)

    tm = {}
    for x in xml_doc.getchildren():
        r = get_server_pngngame(x)
        tm[r[0]] = r[1]

    lines = myutils.get_file_lines(doc_path)
    for i, line in enumerate(lines):
        mg = MatchPng_re.findall(line)
        if len(mg) > 0:
            bn = mg[0][0] + u'.png'
            bn2 = mg[0][1]
            sever_url = tm.get(bn)
            if sever_url != None:
                x = MatchPng_re.sub(lambda m : _repl_func(m), line)
                lines[i] = x.replace('@',sever_url)
            a = 100
    mindoc = doc_path + '.mindoc'
    myutils.write_file_lines(mindoc,lines)
    print(u'操作成功, 输出文件',mindoc)

def _repl_func(m):
    r = m.regs[0]
    start_p = r[0]

    ori_str = m.string[r[0]:r[1]]
    ti = 0
    for x in reversed(m.regs[1:]):
        sp = x[0]
        ep = x[1]
        if sp != -1 and ep != -1:
            sp -= start_p
            ep -= start_p
            if ti == 0:
                new_ts = '@'
                ori_str = ori_str[:sp] + new_ts + ori_str[ep:]
            elif ti == 1:
                new_ts = ''
                ori_str = ori_str[:sp] + new_ts + ori_str[ep:]
        
        ti += 1
    return ori_str
    pass

def get_server_pngngame(item):
    a = item.getchildren()[0]
    href = a.attrib.get('href')
    text = a.text
    return [text, href]
    pass

def main():
    if len(sys.argv) != 2:
        print(u'本工具主要用于将本地写的typro文档上传至wiki mindoc时图片转换问题')
        print(u'eg: 假如需要上传一个typro.md, 及它所使用的图片 images 文件夹')
        print(u'1. 在mindoc创建一个空白文档, 并将所有本地的用的图片上通过附件上传')
        print(u'2. 打开附件界面, 打开inspect, 定位到attachList那一级, cmd+c 拷贝至剪帖板')
        print(u'3. 执行 python upload_typro.py typro.md')
        print(u'4. 执行完成后会在typro.md 同一级生成typro.md.mindoc, 将此内容复制粘贴到wiki-midoc即可')
        return
    
    start_upload(sys.argv[1])

    pass

if __name__ == "__main__":
    main()