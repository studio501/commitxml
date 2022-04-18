# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

import xml.etree.ElementTree as ET


XML_Line_re = re.compile(r'^\s*<.*?>\s*$')
New_XmlLine_re = re.compile(r'^\+\s*<')
Del_XmlLine_re = re.compile(r'^\-\s*<')
Prev_XmlLine_re = re.compile(r'^\s*<ItemSpec')

Modify_re = re.compile(r'M\s+(.*)')
Added_re = re.compile(r'A\s+(.*)')
Untrack_re = re.compile(r'\?\s+(.*)')

CheckType = ['.xml']
SplitNumSimbol = ['|',";"]

def is_checktyp(file_path):
    for x in CheckType:
        if file_path.endswith(x):
            return True
    
    return False
        

def canbe_number(str):
    try:
        # 因为使用float有一个例外是'NaN'
        if str=='NaN':
            return False

        for s in SplitNumSimbol:
            if s in str:
                str = str.split(s)[0]
                for s2 in SplitNumSimbol:
                    if s2 in str:
                        str = str.split(s2)[0]
                        for s3 in SplitNumSimbol:
                            if s3 in str:
                                str = str.split(s3)[0]
                                break
                        break
                break

        float(str)
        return True
    except ValueError:
        return False

def is_windows():
    return sys.platform == 'win32'

def svn_print(msg, loglevel='normal'):
    if type(msg) == list:
        msg = str(msg)
    if is_windows():
        # [101;93m STYLES [0m
        # [33mYellow[0m
        # [32mGreen[0m

        # if loglevel == 'error':
        #     msg = '[101;93m{0}[0m'.format(msg)
        # elif loglevel == 'warning':
        #     msg = '[33m{0}[0m'.format(msg)
        # elif loglevel == 'ok':
        #     msg = '[32m{0}[0m'.format(msg)

        os.system('echo {0} > con'.format(msg))
    else:
        print(msg)

def format_checkwithfilelist(file_list):
    try:
        for a in file_list:
            # res = ET_Check.parse(a)
            # res = ET.parse(a)
            with open(a,'r') as f:
                content = f.read()
                res = ET.fromstring(content)
                f.seek(0)
                lines = f.readlines()
                for i, l in enumerate(lines):
                    if len(l.split()) > 0:
                        if i > 0 and len(XML_Line_re.findall(l)) == 0:
                            raise Exception("wrong format line:{1} {2}".format(i,l))
    
    except Exception as e:
        svn_print('Error format detect: {0}!!!!!!!!!'.format(a),'error')
        svn_print(e,'warning')
        return False

    return True

def _get_element_field(xml_element):
    r = []
    r2 = []
    for x in xml_element.attrib:
        r.append(x)
        r2.append(canbe_number(xml_element.attrib[x]))
    return [r, r2]

def get_exist_id(id_, ii, del_lines, prev_lines):
    for x in del_lines:
        if x[1].attrib['id'] == id_:
            return x[1]

    t_closer = 0
    for iy, y in enumerate(prev_lines):
        ix = y[0]
        if ix >= ii:
            return prev_lines[t_closer][1]
        t_closer = iy

    return prev_lines[t_closer][1]


# 与之前表字段统一
def constrait_detectwithfile(file_path):
    pass
    bn = os.path.basename(file_path)
    diff = subprocess.check_output(['svn','diff',file_path]).rstrip().split('\n')
    new_lines = []
    del_lines = []
    prev_lines = []
    for i, l in enumerate(diff):
        if len(Prev_XmlLine_re.findall(l)) == 1:
            prev_lines.append([i, ET.fromstring(l)])
        elif len(Del_XmlLine_re.findall(l)) == 1:
            del_lines.append([i, ET.fromstring(l[1:])])
        elif len(New_XmlLine_re.findall(l)) == 1:
            new_lines.append([i, ET.fromstring(l[1:])])
            prev_lines.append([i, ET.fromstring(l[1:])])

    new_ids = []
    ret = True
    for y in new_lines:
        ix = y[0]
        x = y[1]
        x_id = x.attrib['id']
        new_ids.append(x_id)
        new_keys = _get_element_field(x)

        prev_line = get_exist_id(x_id, ix, del_lines, prev_lines)
        prev_keys = _get_element_field(prev_line)

        for k, visnumber in zip(prev_keys[0], prev_keys[1]):
            if not k in new_keys[0]:
                svn_print("Error id:{1} no field '{0}'".format(k,x_id))
                ret = False

            if visnumber and k in new_keys[0]:
                v_idx = new_keys[0].index(k)
                if v_idx >= 0 and not new_keys[1][v_idx]:
                    svn_print("Error id:{1} field value '{0}'".format(k,x_id))
                    ret = False
    all_ids = []
    xml_root = ET.parse(file_path).getroot()

    has_group = False
    for elem in xml_root:
        if elem.tag == 'Group':
            has_group = True
            for x in elem:
                if x.tag == 'ItemSpec':
                    all_ids.append(x.attrib['id'])
            break
            
    if not has_group:
        for elem in xml_root:
            if elem.tag == 'ItemSpec':
                all_ids.append(elem.attrib['id'])


    for nid in new_ids:
        if all_ids.count(nid) > 1:
            svn_print("Error Duplicate id '{0}'".format(nid))
            ret = False
    return ret

def parse_stline(st_line):
    if len(Modify_re.findall(st_line)) == 1:
        return [Modify_re.sub(r'\1',st_line), 'm']
    elif len(Added_re.findall(st_line)) == 1:
        return [Added_re.sub(r'\1',st_line), 'a']
    elif len(Untrack_re.findall(st_line)) == 1:
        return [Untrack_re.sub(r'\1',st_line), '?']

    return None

def check_svn_path(svn_path):
    bn = os.path.basename(svn_path)
    svn_print('=================== Start Check {0} ==================='.format(bn))
    file_st = subprocess.check_output(['svn','st',svn_path])
    if file_st == '':
        sys.exit(0)
        return True

    file_st = file_st.rstrip().split('\n')
    add_list = []
    update_list = []
    for x in file_st:
        if is_checktyp(x):
            pt = parse_stline(x)
            if pt:
                if pt[1] == 'm':
                    update_list.append(pt[0])
                elif pt[1] == 'a':
                    add_list.append(pt[0])
                elif pt[1] == '?':
                    add_list.append(pt[0])
    check_ok = True
    check_ok = check_ok and format_checkwithfilelist(add_list)
    check_ok = check_ok and format_checkwithfilelist(update_list)

    for x in update_list:
        check_ok = check_ok and constrait_detectwithfile(x)


    if check_ok:
        svn_print('{0} Check Successful.'.format(bn),'ok')
        return True
    else:
        
        svn_print('{0} Check Failed!'.format(bn),'error')

    for x in range(3):
        svn_print('.')

    return False

def get_tmp_path(path_file):
    with open(path_file,'r') as f:
        lines = f.readlines()

        return lines

def find_stfile_indirectory(dst_dir):
    res = subprocess.check_output(['svn','st',dst_dir]).rstrip().split('\n')
    if len(res) == 0:
        return
    
    r = []
    dst_bn = os.path.dirname(dst_dir)

    for l in res:
        l = l.rstrip()
        pt = parse_stline(l)
        if pt:
            source_f = pt[0]
            if os.path.isfile(source_f) and is_checktyp(source_f):
                r.append(source_f)

    return r



def main():
    res = []

    path_files = sys.argv[1]
    # path_files = '/Users/tangwen/Documents/my_projects/cok/ccbDyRes/client_tools/svn6F3D.tmp'

    cwd = sys.argv[3]
    # cwd = "/Users/tangwen/Documents/my_projects/cok/ccbDyRes/client_tools/zipnow"

    os.chdir(cwd)


    path_files = get_tmp_path(path_files)
    for x in path_files:
        x = x.rstrip()
        if x == '':
            continue
        
        if os.path.isdir(x):
            r = find_stfile_indirectory(x)
            if len(r) > 0:
                res.extend(r)
        elif os.path.isfile(x) and is_checktyp(x):
            res.append(x)
    ok = True
    for x in res:
        if not check_svn_path(x):
            ok = False
    if ok:
        svn_print('check ok.')
    

    os.system('pause < con > con')


if __name__ == "__main__":
    main()