# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re,codecs,subprocess,json
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

comment5_re = re.compile(r'^\s*/\*+')
comment6_re = re.compile(r'^\s*\*+/')

function_declare_re = re.compile(r'.*?(\w+)\((.*?)\).*?;\s*}?\n?')
propvalue_declare_re = re.compile(r'\s*((?:\w*:?:?)?\w+)\s*([*&])?\s*(\w+)\s*=?\s*(.*?)?\s*;.*\n?')
fp_type_re = re.compile(r'\s*(?:const)?\s*(\w*:?:?\w+\s*[&*]?)\s*(\w+)')

function_define_re = re.compile(r'.*?(\w+\s*[&*]?)\s+((?:\w+::)?\w+)\(((?:.*?\s*,?\s*)*)\)\s*\n?')

RecUpgrade_Diff_File = "_rec_upgrade_diff"

def read_json_file(f):
    if not os.path.exists(f):
        return json.loads('{}')
    with open(f, 'r') as load_f:
        try:
            load_dict = json.load(load_f, encoding="utf-8")
            return load_dict
        except Exception as e:
            pass

        return json.loads('{}')

def insert_before_idx(spec_idx, origin_arr, inserted_arr):
    if spec_idx == 0:
        for x in reversed(inserted_arr):
            origin_arr.insert(0,x)
    elif spec_idx > len(origin_arr) - 1:
        origin_arr.extend(inserted_arr)
    else:
        pass
        new_arr = [origin_arr[spec_idx-1]]
        new_arr.extend(inserted_arr)
        new_arr.append(origin_arr[spec_idx])
        origin_arr[spec_idx-1:spec_idx+1] = new_arr

def is_comment_line(line):
    re_arr = [comment1_re,comment2_re,comment3_re,comment4_re,comment5_re,comment6_re]
    for x in re_arr:
        if len( x.findall(line)) == 1:
            return True

    return False

def is_blank_line(line):
    tl = line.split()
    return tl == 0

def is_unfinished_line(line):
    tl = line.rstrip()
    return len(tl) > 0 and tl[-1] == ','

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

def find_last_closebracket_line(lines):
    for i,x in reversed(list(enumerate(lines))):
        tl = x.rstrip()
        if len(tl) > 0 and tl[-1] == '}':
            return i

class CppFile():
    def __init__(self,file_path):
        self.m_file_path = file_path
        f = codecs.open(self.m_file_path, 'r', 'utf-8')
        self.m_lines = f.readlines()
        f.close()

        self.m_fh_comment_st = -1
        self.m_fh_comment_ed = -1
        for i,line in enumerate(self.m_lines):
            if is_comment_line(line):
                if self.m_fh_comment_st == -1:
                    self.m_fh_comment_st = i
                else:
                    self.m_fh_comment_ed = i + 1
                    break

        for i,line in enumerate(self.m_lines):
            if len(function_define_re.findall(line)) == 1:
                self.m_start = i
                break
        
        self.m_func_map = {}

        i = -1
        while i < len(self.m_lines):
            i += 1
            line = self.m_lines[i]
            # for i,line in enumerate(self.m_lines):
            if line.count('Sprite::initWithFile(const std::string& filename)') == 1:
                a = 100
            if i < self.m_start:
                continue
            if is_blank_line(line):
                continue
            if is_unfinished_line(line):
                continue
            if len(function_define_re.findall(line)) == 1 and self.m_lines[i+1].count('{') == 1:
                bracket_stack = []
                func_st = i
                func_ed = i
                finded_func = False
                for j,line_j in enumerate(self.m_lines[i:-1]):
                    for k in line_j:
                        if k == '{':
                            bracket_stack.append(k)
                        elif k == '}':
                            bracket_stack.pop()
                            if len(bracket_stack) == 0:
                                func_ed = i + j
                                i += j
                                finded_func = True
                                break
                    if finded_func:
                        break
                
                func_arr = function_define_re.sub(r'\1|\2|\3',line).split('|')
                fp = parse_func_param(func_arr[2])
                
                func_res_arr = [func_arr[1]]
                func_res_arr.extend(fp)
                name_key = '-'.join(func_res_arr)

                self.m_func_map[name_key] = {
                    'fp': fp,
                    'start': func_st,
                    'end': func_ed,
                    'name_key':name_key
                }
                a = 112
            i += 1
        a = 100

    def update_function_define(self,other_class):

        self_func_map = self.m_func_map
        other_func_map = other_class.m_func_map

        replaced_ = {}
        replaced_arr = []
        for x in self_func_map:
            if x in other_func_map:
                sfunc = self_func_map[x]
                ofunc = other_func_map[x]
                replaced_arr.append([sfunc,ofunc])
                replaced_[x] = True
        
        replaced_arr.sort(key=lambda x: x[0]['start'])
        replaced_arr_len = len(replaced_arr)
        new_lines = []
        rp_cter = 0
        ti = 0
        while ti < len(self.m_lines):
            line = self.m_lines[ti]
            if rp_cter < replaced_arr_len and ti == replaced_arr[rp_cter][0]['start']:
                sfunc = replaced_arr[rp_cter][0]
                ofunc = replaced_arr[rp_cter][1]
                s_line_dt = sfunc['end'] - sfunc['start']
                o_line_dt = ofunc['end'] - ofunc['start']

                if abs(s_line_dt - o_line_dt) > 10:
                    rec_json = read_json_file(RecUpgrade_Diff_File)
                    tlines = None
                    if sfunc['name_key'] in rec_json:
                        tlines = rec_json[sfunc['name_key']]
                    else:
                        tlines = compare_lines(other_class.m_lines[ofunc['start']:ofunc['end']+1],self.m_lines[sfunc['start']:sfunc['end']+1])
                        rec_json[sfunc['name_key']] = tlines
                        with open(RecUpgrade_Diff_File,'w') as f:
                            f.write(json.dumps(rec_json))
                    new_lines.extend(tlines)
                else:
                    new_lines.extend(other_class.m_lines[ofunc['start']:ofunc['end']+1])
                ti += s_line_dt
                rp_cter += 1
            else:
                new_lines.append(line)
            ti += 1

        added_arr = []
        for x in other_func_map:
            if not x in replaced_:
                added_arr.append(other_func_map[x])

        added_arr.sort(key=lambda x: x['start'])

        last_closed_bracket_idx = find_last_closebracket_line(new_lines)

        added_lines = []
        for x in added_arr:
            st = x['start']
            ed = x['end']
            t_a = other_class.m_lines[st:ed + 1]
            added_lines.extend(t_a)
            added_lines.append('\n')

        insert_before_idx(last_closed_bracket_idx + 2,new_lines,added_lines)

        self.m_lines = new_lines
        self.save()

        a = 100

    def save(self):
        f = codecs.open(self.m_file_path, 'w', 'utf-8')
        f.writelines(self.m_lines)
        f.close()

    def just_replace_fileheader_comment(self,other_class):
        self.m_lines[0:self.m_fh_comment_ed] = other_class.m_lines[0:other_class.m_fh_comment_ed]
        self.save()

    def find_fileheader(self):
        fh_lines = self.m_lines[:self.m_start]
        res = {}
        for i,line in enumerate(fh_lines):
            if not is_comment_line(line):
                res[line.lstrip().rstrip()] = [i,line]
        return res

    def update_fileheader(self,other_class):
        other_fh = other_class.find_fileheader()
        self_fh = self.find_fileheader()
        head_lines = {}
        for x in self_fh:
            if x in other_fh:
                head_lines[x] = True
        
        added_lines = []
        for x in other_fh:
            if not x in head_lines:
                added_lines.append(other_fh[x])
        
        added_lines.sort(key=lambda x:x[0])
        res_lines = []
        for x in added_lines:
            res_lines.append(x[1])

        class_start = self.m_start
        insert_before_idx(class_start,self.m_lines,res_lines)
        self.save()

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
            if x in other_fh:
                head_lines[x] = True
        
        added_lines = []
        for x in other_fh:
            if not x in head_lines:
                added_lines.append(other_fh[x])
        
        added_lines.sort(key=lambda x:x[0])
        res_lines = []
        for x in added_lines:
            res_lines.append(x[1])

        class_start = self.m_start
        insert_before_idx(class_start,self.m_lines,res_lines)
        
        


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

def compare_lines(lines_left,lines_right):
    file_left = 'v4_left_'
    file_right = 'v3_right_'
    f = codecs.open(file_left, 'w', 'utf-8')
    f.writelines(lines_left)
    f.close()

    f = codecs.open(file_right, 'w', 'utf-8')
    f.writelines(lines_right)
    f.close()

    compare_file(file_left,file_right)

    f = codecs.open(file_right, 'r', 'utf-8')
    new_lines = f.readlines()
    f.close()
    return new_lines

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
            # print(class2.m_lines[line2])
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

def compare_fileheader(class1,class2):
    class1.update_fileheader(class2.find_fileheader())
    class1.save()

def reget_header_class(file_path,class_name):
    class_arr = parse_headerfile(file_path)
    for x in class_arr:
        if x.m_name == class_name:
            return x

def upgrade_file_header(v4_h,v3_h):
    class_arr1 = parse_headerfile(v4_h)
    
    class_arr2 = parse_headerfile(v3_h)
    compare_fileheader(class_arr2[0],class_arr1[0])

    for x in class_arr2:
        for y in class_arr1:
            if y.m_name == x.m_name:
                tc = reget_header_class(v3_h,x.m_name)
                compare_class(tc,y)
                break

    class_arr2 = parse_headerfile(v3_h)
    compare_class(class_arr2[0],class_arr1[0])

def upgrade_file_cpp(v4_cpp,v3_cpp):
    pass


if __name__ == "__main__":
    # compare_file("/Users/mac/Downloads/cocos2d-x-4.0/cocos/2d/CCSprite.cpp","/Users/mac/Documents/my_projects/cok/client/cocos2d/cocos/2d/CCSprite.cpp")
    s1 = "/****************************************************************************"
    s2 = "****************************************************************************/"

    t1 = comment5_re.findall(s1)
    t2 = comment6_re.findall(s2)

    arr1 = [1,2,3,4,5,6,7,8]
    for i,x in enumerate(arr1):
        print(i)
        if i == 2:
            i += 4

    cpp1 = CppFile("/Users/mac/Downloads/cocos2d-x-4.0/cocos/2d/CCSprite.cpp")

    # replace file funciton define
    cpp2 = CppFile("/Users/mac/Documents/my_projects/cok/client/cocos2d/cocos/2d/CCSprite.cpp")
    cpp2.update_function_define(cpp1)

    # repace file comment header
    cpp2 = CppFile("/Users/mac/Documents/my_projects/cok/client/cocos2d/cocos/2d/CCSprite.cpp")
    cpp2.just_replace_fileheader_comment(cpp1)

    # repace file includes
    cpp2 = CppFile("/Users/mac/Documents/my_projects/cok/client/cocos2d/cocos/2d/CCSprite.cpp")
    cpp2.update_fileheader(cpp1)

    a = 100
    # compare_file("/Users/mac/Downloads/cocos2d-x-4.0/cocos/2d/CCSprite.cpp","/Users/mac/Documents/my_projects/cok/client/cocos2d/cocos/2d/CCSprite.cpp")
    # main()