# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re,codecs,subprocess
from pbxproj import XcodeProject
from pbxproj.pbxextensions import FileOptions

from collections import Mapping, Set, Sequence 

# dual python 2/3 compatability, inspired by the "six" library
string_types = (str, unicode) if str is bytes else (str, bytes)
iteritems = lambda mapping: getattr(mapping, 'iteritems', mapping.items)()

comment1_re = re.compile(r'^\s*/\*\*')
comment2_re = re.compile(r'^\s*\*')
comment3_re = re.compile(r'^\s*\*/')
comment4_re = re.compile(r'^\s*//')

function_declare_re = re.compile(r'.*?(\w+)\((.*?)\).*?;\s*}?\n?')
propvalue_declare_re = re.compile(r'\s*((?:\w*:?:?)?\w+)\s*([*&])?\s*(\w+)\s*=?\s*(.*?)?\s*;.*\n?')
fp_type_re = re.compile(r'\s*(?:const)?\s*(\w*:?:?\w+\s*[&*]?)\s*(\w+)')

def is_comment_line(line):
    if len( comment1_re.findall(line)) == 1:
        return True

    if len( comment2_re.findall(line)) == 1:
        return True

    if len( comment3_re.findall(line)) == 1:
        return True

    if len( comment4_re.findall(line)) == 1:
        return True

    return False

def file_extension(path): 
	return os.path.splitext(path)[1]

def objwalk(obj, cb):
    iterator = None
    if isinstance(obj, Mapping):
        iterator = iteritems
        # cb(obj)
    elif isinstance(obj, (Sequence, Set)) and not isinstance(obj, string_types):
        # iterator = enumerate
        f = cb(obj)
        if f:
            return True
    if iterator:
        for path_component, value in iterator(obj):
            if objwalk(value,cb):
                return

def parse_func_param(param_str):
    # const Rect& rect, V3F_C4B_T2F_Quad* outQuad
    res = param_str.split(',')
    r = []
    for x in res:
        if(len(fp_type_re.findall(x)) > 0 ):
            tmp = fp_type_re.sub(r'\1|\2',x).split('|')
            # tmp = fp_type_re.sub(r'\1|\2|\3',x).split('|')
            r.append(re.sub('[\s+]', '', tmp[0]))

    return r

def parse_prop(prop_str):
    default = ''
    if prop_str.count('=') == 1:
        equal_idx = prop_str.index('=')
        default = prop_str[equal_idx+1:-2].lstrip().rstrip()
        prop_str = prop_str[0:equal_idx] + ';'
        a = 100

    if prop_str.count(';') == 0:
        a = 100
    semi_idx = prop_str.index(';')
    prop_str = prop_str[0:semi_idx].rstrip().lstrip()

    prop_arr = prop_str.split(' ')
    return [prop_arr[-1],' '.join(prop_arr[0:-1]),default]


class ClassHeader():
    def __init__(self,lines,file_path,start_p=0):
        self.m_lines = lines
        self.m_file_path = file_path

        self.m_start = -1
        self.m_end = -1
        self.m_name = ''
        self.m_fh_start = None
        self.m_fh_end = None

        bracket = []

        # start
        for i,line in enumerate(lines):
            if i < start_p:
                continue
            if line[:len('class')] == 'class' and line.count(';') == 0 and lines[i+1][0] == '{':
                self.m_start = i
                self.m_name = find_class_name(line)
            
            if self.m_start > -1:
                if not is_comment_line(line):
                    for ch in line:
                        if ch == '{':
                            bracket.append(ch)
                        elif ch == '}':
                            if len(bracket) == 0:
                                a = 100
                            bracket.pop()
                            if len(bracket) == 0:
                                self.m_end = i

        self.m_prop_map = {}
        self.m_func_map = {}
        for i,line in enumerate(self.m_lines[self.m_start:self.m_end]):
            if is_comment_line(line):
                continue

            if len( function_declare_re.findall(line)) > 0:
                try:
                    # print('has func',function_declare_re.sub(r'\1|\2',line))
                    tmp2_arr = function_declare_re.sub(r'\1|\2',line).split('|')
                    if tmp2_arr[0][0:3] == 'CC_':
                        continue
                    # if tmp2_arr[0] == 'setFlippedY':
                    #     a = 100
                    #     b = 200
                    if len(tmp2_arr) == 2 and tmp2_arr[1] != '':
                        fp = parse_func_param(tmp2_arr[1])
                        r = [tmp2_arr[0]]
                        r.extend(fp)
                        self.m_func_map['-'.join(r)] = {'params':fp, 'line': self.m_start + i}
                except Exception as e:
                    print(e)
                a =100
            elif len(propvalue_declare_re.findall(line)) > 0:
                if line.count('using ') == 1 and line.lstrip()[0] == 'u':
                    pass
                else:
                    tmp = parse_prop(line)
                    # propvalue_declare_re.sub(r'\1|\2|\3|\4',line).split('|')
                    self.m_prop_map[tmp[0]] = {
                        'type': tmp[0],
                        'default': tmp[2],
                        'line': self.m_start + i,
                    }

        a = 100
        b = 100

    def is_valid_class(self):
        return self.m_start != self.m_end

    def update_withother(self,class2):
        pass

    def save(self):
        f = codecs.open(self.m_file_path, 'w', 'utf-8')
        f.writelines(self.m_lines)
        f.close()

    def find_fileheader(self):
        if not self.m_fh_start:
            for i,line in enumerate(self.m_lines):
                if line.count('#pragma once') == 1 or (\
                    line.count('#ifndef ') == 1 and self.m_lines[i+1].count('#define ') == 1):
                    self.m_fh_start = i + 1 if line.count('#pragma once') == 1 else i + 2
                    self.m_fh_end = self.m_start
                    break
        
        fh_lines = self.m_lines[self.m_fh_start:self.m_fh_end]
        res = {}
        for i,line in enumerate(fh_lines):
            if not is_comment_line(line):
                res[line.lstrip().rstrip()] = [self.m_fh_start + i,line]
                # res.append([line.lstrip().rstrip(),self.m_fh_start + i])
        return res

    def update_fileheader(self,other_fh):
        self_fh = self.find_fileheader()
        head_lines = {}
        for x in self_fh:
            if y in other_fh:
                head_lines[y] = True
        
        added_lines = []
        for x in other_fh:
            if not x in head_lines:
                added_lines.append(other_fh[x])
        
        added_lines.sort(key=lambda x:x[0])
        res_lines = []
        for x in added_lines:
            res_lines.append(x[1])
        


def get_xcode_proj_(project,group,now_key,res):
    if not res.get( now_key):
        res[now_key] = {}
    chs = group["children"]
    for x in chs:
        t = project.get_object(x)
        if t.isa == 'PBXFileReference':
            res[now_key][t.get_name()] = [t.get_id(),t.path,t.get_name()]
        elif t.isa == 'PBXGroup':
            group2 = project.get_groups_by_name(t.name,group)
            res[now_key][t.name] = {}
            for g in group2:
                get_xcode_proj_(project,g,t.name,res[now_key])
            pass

def get_xcode_proj(file_path,group_name="renderer"):
    project = XcodeProject.load(file_path)
    group = project.get_or_create_group(group_name)
    res = {}
    get_xcode_proj_(project,group,group_name,res)
    return [res,project]

def is_checked(v):
    return len(v) == 4 and v[3] == True

def find_file_in_pbx(file_name,pbx):
    find_res = {"find":False}
    def cb(x):
        if x[2] == file_name:
            if len(x) >= 4:
                x[3] = True
            else:
                x.append(True)
            
            find_res["find"] = x
            return True

    objwalk(pbx,cb)
    return find_res["find"]

def try_create_groups(group_path,pbx_project):
    dirname = os.path.dirname(group_path).split(os.path.sep)
    tp = None
    sp = ''
    for x in dirname:
        sp = os.path.join(sp,x)
        # tp = pbx_project.get_or_create_group(x,sp,tp)
        tp = pbx_project.get_or_create_group(x,None,tp)
    return tp

def add_one_file(pbx_project,file_info):
    pass
    dir_name = "/Users/mac/Downloads/cocos2d-x-4.0/cocos"
    dist_dir = "/Users/mac/Documents/my_projects/cok/client/cocos2d/cocos"

    filePath = os.path.join(dir_name,file_info[1])
    dst_path = os.path.join(dist_dir,file_info[1])
    dst_path_dir = os.path.dirname(dst_path)

    last_parent = try_create_groups(file_info[1],pbx_project)

    if not os.path.exists(dst_path_dir):
        os.makedirs(dst_path_dir)
    shutil.copy(filePath, dst_path)
    
    # target_name = 'libcocos2d iOS'
    target_name = None
    file_options = FileOptions(weak=True)
    # t_group = pbx_project.get_groups_by_name('renderer')[0]
    pbx_project.add_file(path=dst_path,parent=last_parent,tree=None,target_name=target_name,force=False,file_options=file_options)
    # pbx_project.add_file(filePath, force=False)
    

def handle_added_files(pbx_project,file_arr):
    for x in file_arr:
        add_one_file(pbx_project,x)

    pbx_project.save()

def main():
    file_path = "/Users/mac/Documents/my_projects/cok/client/cocos2d/build/cocos2d_libs.xcodeproj/project.pbxproj"
    pbx_res = get_xcode_proj(file_path)
    pbx1 = pbx_res[0]
    pbx1_project = pbx_res[1]

    file_path2 = "/Users/mac/Downloads/cocos2d-x-4.0/ios-build/engine/cocos/core/cocos2d_libs.xcodeproj/project.pbxproj"
    pbx_res2 = get_xcode_proj(file_path2)
    pbx2 = pbx_res2[0]
    pbx2_project = pbx_res2[1]

    replace_ = []
    reserve_ = []
    added_ = []
    def pbx1_cb(x):
        pass
        file_name = x[2]
        do_find = find_file_in_pbx(file_name,pbx2)
        if do_find:
            replace_.append([x,do_find])
        else:
            reserve_.append(x)

    def pbx2_cb(x):
        if not is_checked(x):
            added_.append(x)

    objwalk(pbx1,pbx1_cb)
    objwalk(pbx2,pbx2_cb)

    reserve_2 = []
    for x in reserve_:
        ext =file_extension(x[1])
        if ext != '.vert' and ext != '.frag':
            reserve_2.append(x)

    for x in replace_:
        print('replace file: {} ===> {}'.format(x[0][1],x[1][1]))

    for x in reserve_2:
        print('reserved file:',x[1])

    # handle_added_files(pbx1_project,added_)
    for x in pbx1:
        print(x)
    pass

def compare_file(file_left,file_right):
    subprocess.call(['bcomp',file_left,file_right])

def find_class_name(line):
    cl = line.split(':')[0]
    cl_a = cl.split(' ')
    for l in reversed(cl_a):
        if l != ' ' and l != '':
            return l

def parse_headerfile(file_path):
    with open(file_path,'r') as f:
        lines = f.readlines()
        class_arr = []
        ti = 0
        while True:
            class1 = ClassHeader(lines,file_path,ti)
            if not class1.is_valid_class():
                break
            class_arr.append(class1)
            ti = class1.m_end
        return class_arr
    # f = codecs.open(dst_file, 'w', 'utf-8')
    # f.writelines(file["deletedfile"]["content"])
    # f.close()

def compare_class(class1,class2):
    # prop compare
    prop_cpd = {}
    update_cp = {}
    for x in class1.m_prop_map:
        if x in class2.m_prop_map:
            prop_cpd[x] = True
            if class2.m_prop_map[x]['type'] != class1.m_prop_map[x]['type']:
                # update_cp[x] = class2.m_prop_map[x]
                line1 = class1.m_prop_map[x]['line']
                line2 = class2.m_prop_map[x]['line']
                class1.m_lines[line1] = class2.m_lines[line2]

    prop_lines = []
    for x in class2.m_prop_map:
        if not x in prop_cpd:
            # update_cp[x] = class2.m_prop_map[x]
            line2 = class2.m_prop_map[x]['line']
            print(class2.m_lines[line2])
            prop_lines.append(class2.m_lines[line2])

    end_of_class_idx = class1.m_end
    tar_prop = []
    tar_prop.append(class1.m_lines[end_of_class_idx-1])
    tar_prop.extend(prop_lines)
    tar_prop.extend(class1.m_lines[end_of_class_idx])
    ta = class1.m_lines[end_of_class_idx-1:end_of_class_idx+1]
    class1.m_lines[end_of_class_idx-1:end_of_class_idx+1] = tar_prop
    class1.m_end += len(prop_lines)

    # function compare
    func_cpd = {}
    for x in class1.m_func_map:
        x_trim = x.split('-')[0]
        for y in class2.m_func_map:
            y_trim = y.split('-')[0]
            if x_trim == y_trim and not y in func_cpd:
                if x_trim == 'create':
                    print(class1.m_lines[class1.m_func_map[x]['line']])
                    print(class2.m_lines[class2.m_func_map[y]['line']])
                    a = 100
                if len(class2.m_func_map[y]['params']) == len(class1.m_func_map[x]['params']):
                    func_cpd[y] = True
                    line1 = class1.m_func_map[x]['line']
                    line2 = class2.m_func_map[y]['line']
                    class1.m_lines[line1] = class2.m_lines[line2]
                    break

        # if x in class2.m_func_map:
        #     func_cpd[x] = True
        #     if len(class2.m_func_map[x]['params']) != len(class1.m_func_map[x]['params']):
        #         line1 = class1.m_func_map[x]['line']
        #         line2 = class2.m_func_map[x]['line']
        #         class1.m_lines[line1] = class2.m_lines[line2]
        #         pass

    prop_lines = []
    for x in class2.m_func_map:
        if not x in func_cpd:
            line2 = class2.m_func_map[x]['line']
            print(class2.m_lines[line2])
            prop_lines.append(class2.m_lines[line2])

    end_of_class_idx = class1.m_end
    tar_prop = []
    tar_prop.append(class1.m_lines[end_of_class_idx-1])
    tar_prop.extend(prop_lines)
    tar_prop.extend(class1.m_lines[end_of_class_idx])
    ta = class1.m_lines[end_of_class_idx-1:end_of_class_idx+1]
    class1.m_lines[end_of_class_idx-1:end_of_class_idx+1] = tar_prop
    class1.m_end += len(prop_lines)


    class1.save()
    
    a = 100

if __name__ == "__main__":
    # s = '    static Sprite* create();'
    # a = is_comment_line(s)
    ta = parse_prop('    bool _isFixedPS; //在修改本Sprite所指向的SpriteFrame之后，是否保持当前Sprite的ProgramState。默认false。')
    class_arr1 = parse_headerfile('/Users/mac/Downloads/cocos2d-x-4.0/cocos/2d/CCSprite.h')
    class_arr1[0].find_fileheader()
    class_arr2 = parse_headerfile('/Users/mac/Documents/my_projects/cok/client/cocos2d/cocos/2d/CCSprite.h')
    compare_class(class_arr2[0],class_arr1[0])
    a = 100
    # compare_file("/Users/mac/Downloads/cocos2d-x-4.0/cocos/2d/CCSprite.cpp","/Users/mac/Documents/my_projects/cok/client/cocos2d/cocos/2d/CCSprite.cpp")
    # main()