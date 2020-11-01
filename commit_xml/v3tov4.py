# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re,codecs,subprocess,json
from pbxproj import XcodeProject
from pbxproj.pbxextensions import FileOptions

from collections import Mapping, Set, Sequence

# dual python 2/3 compatability, inspired by the "six" library
string_types = (str, unicode) if str is bytes else (str, bytes)
iteritems = lambda mapping: getattr(mapping, 'iteritems', mapping.items)()

# V4_path = "/Users/mac/Downloads/cocos2d-x-4.0"
V4_path = "/Users/tangwen/Downloads/cocos2d-x-4.0"
V3_path = os.path.join( os.getenv("ClientDir"),"cocos2d")

comment1_re = re.compile(r'^\s*/\*\*') # /**
comment2_re = re.compile(r'^\s*\*') # *
comment3_re = re.compile(r'^\s*\*/') # */
comment4_re = re.compile(r'^\s*//') # //

comment5_re = re.compile(r'^\W?\s*/\*+') # /*********
comment6_re = re.compile(r'\s*\*+/') # *********/
comment7_re = re.compile(r'/\*.*?\*/') # /* abcd */

function_declare_re = re.compile(r'.*?(\w+)\((.*?)\).*?;\s*}?\n?')
propvalue_declare_re = re.compile(r'\s*((?:\w*:?:?)?\w+)\s*([*&])?\s*(\w+)\s*=?\s*(.*?)?\s*;.*\n?')
fp_type_re = re.compile(r'\s*(?:const)?\s*(\w*:?:?\w+\s*[&*]?)\s*(\w+)')
using_grammaer_re = re.compile(r'using\s+(\w+)\s*=\s*(.*);')

function_define_re = re.compile(r'.*?(\w+\s*[&*]?)\s+((?:\w+::)*\w+)\(((?:.*?\s*,?\s*)*)\)\s*\n?')
ctor_function_define_re = re.compile(r'(\w+)::~?\1\((.*?)\).*?\n?')
incomplete_func_define_re = re.compile(r'.*?(\w+\s*[&*]?)\s+((?:\w+::)?\w+)\(((?:.*,?)*)')
# (\w+)::\1\(.*?\)

Shader_re = re.compile(r'.*\*\s*(?:cc)?(.*?)\s*;')

# Block_re = re.compile(r'(?:(\w+)\s+)?(\w+)\s+\w*?\s*(\w+)\s*(?::\s*\w+)?\s*\n{',re.MULTILINE)
Block_re = re.compile(r'(?:(\w+)\s+)?(\w+)\s+\w*?\s*(\w+)\s*(?::\s*\w*?\s*\w+)?\s*{\s*\n',re.MULTILINE)

RecUpgrade_Diff_File = "_rec_upgrade_diff"
V3toV4_error_dir = 'v3tov4_error'

Access_tags = ['private:','protected:','public:']

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

def is_comment_line_start(line):
    re_arr = [comment5_re]
    for x in re_arr:
        if len( x.findall(line)) == 1:
            return True

    return False

def is_comment_line_end(line):
    re_arr = [comment6_re]
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

def file_without_extension(path):
    return os.path.splitext(os.path.basename(path))[0]

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
    if param_str == '':
        return []
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

def trim_right_comment_in_line(line):
    if line.count('//') > 0:
        ti = line.rindex('//')
        return line[:ti]
    elif len(comment7_re.findall(line)) == 1:
        ti = line.rindex('/*')
        return line[:ti]

    return line

def fix_multiline_of_file(file_path):
    lines = get_file_lines(file_path)
    res = fix_multiline(lines)
    if res[0]:
        lines = res[1]
        write_file_lines(file_path,lines)

def fix_multiline(lines):
    line_in_comment = False
    has_multi_line = False
    res = []
    temp = []
    for i,line in enumerate(lines):
        if line_in_comment:
            if is_comment_line_end(line):
                line_in_comment = False
            res.append(line)
            continue
        if is_comment_line_start(line):
            line_in_comment = True
            if line.rstrip()[-2:] == '*/':
                line_in_comment = False
            res.append(line)
            continue
        if is_comment_line(line):
            res.append(line)
            continue
        
        tline = trim_right_comment_in_line(line)
        tl = line.rstrip()
        if len(tl) and tl[-1] == ',':
            if len(temp) == 0:
                if len(incomplete_func_define_re.findall(tl)) == 1:
                    temp.append(tline.rstrip())
                else:
                    res.append(line)
            else:
                temp.append(tline.lstrip().rstrip())
        else:
            if len(temp) > 0:
                temp.append(tline.lstrip().rstrip())
                res.append(' '.join(temp))
                temp = []
                has_multi_line = True
            else:
                res.append(line)

    return [has_multi_line,res]

class CppFile():
    def fix_multline(self):
        pass
        res = fix_multiline(self.m_lines)
        if res[0]:
            self.m_lines = res[1]
            self.save()

    def __init__(self,file_path):
        self.m_file_path = file_path
        f = codecs.open(self.m_file_path, 'r', 'utf-8')
        self.m_lines = f.readlines()
        f.close()

        # self.fix_multline()

        self.m_fh_comment_st = -1
        self.m_fh_comment_ed = -1
        self.m_start = -1
        for i,line in enumerate(self.m_lines):
            if is_comment_line(line):
                if self.m_fh_comment_st == -1:
                    self.m_fh_comment_st = i
                else:
                    self.m_fh_comment_ed = i + 1
                    break

        for i,line in enumerate(self.m_lines):
            try:
                if len(function_define_re.findall(line)) == 1 or len(ctor_function_define_re.findall(line)) == 1:
                    self.m_start = i
                    break
            except Exception as e:
                print(e)
        
        self.m_func_map = {}

        i = -1
        lines_len = len(self.m_lines)
        try:
            while i < len(self.m_lines):
                i += 1
                if i > lines_len - 1:
                    break
                line = self.m_lines[i]
                # for i,line in enumerate(self.m_lines):
                # if line.count('Sprite::initWithFile(const std::string& filename)') == 1:
                #     a = 100
                if i < self.m_start:
                    continue
                if is_blank_line(line):
                    continue
                if is_unfinished_line(line):
                    continue
                # if i == 98:
                #     a = 100
                #     ta = function_define_re.findall(line)
                #     ss = len(ta)
                #     a = 100
                # if 'Renderer::Renderer' in line:
                #     a = 100
                if (len(function_define_re.findall(line)) == 1 and \
                    (self.m_lines[i+1].count('{') == 1 or self.m_lines[i+1].count(':') == 1 or line.rstrip()[-1] == '{')) or \
                    (len(ctor_function_define_re.findall(line)) == 1):
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
                    
                    func_arr = None
                    if len(function_define_re.findall(line)) == 1:
                        func_arr = list(function_define_re.findall(line)[0])
                        # function_define_re.sub(r'\1|\2|\3',line).split('|')
                    else:
                        func_arr = ctor_function_define_re.sub(r'\1|\2',line).split('|')
                        func_arr.insert(0,'')
                        if line.count('::~'):
                            func_arr[1] = '~' +func_arr[1]
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
                    # print('{} start:{} end: {}'.format(name_key,func_st,func_ed))
                    a = 112
        except Exception as e:
            print('parse failed',e)
        a = 100

    def update_function_define(self,other_class):

        self_func_map = self.m_func_map
        other_func_map = other_class.m_func_map

        replaced_ = {}
        replaced_arr = []
        reserved_ = {}
        for x in self_func_map:
            if x in other_func_map:
                sfunc = self_func_map[x]
                ofunc = other_func_map[x]
                replaced_arr.append([sfunc,ofunc])
                replaced_[x] = True
            else:
                reserved_[x] = self_func_map[x]
        
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

                if abs(s_line_dt - o_line_dt) > 15:
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
                print('replace {} successful'.format(sfunc['name_key']))
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
            print('add function:',x['name_key'])
            st = x['start']
            ed = x['end']
            t_a = other_class.m_lines[st:ed + 1]
            added_lines.extend(t_a)
            added_lines.append('\n')

        if last_closed_bracket_idx and len(added_lines) > 0:
            insert_before_idx(last_closed_bracket_idx + 2,new_lines,added_lines)

        bf = os.path.basename(self.m_file_path)
        access_reserved_map(bf,{
            'func_impl': reserved_
        })

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
        nx_idx = self.get_ns_ccbegin()
        # fh_lines = self.m_lines[self.m_fh_comment_ed+1:self.m_start]
        return [self.m_fh_comment_ed+1,nx_idx+1]
        # res = {}
        # line_in_comment = False
        # for i,line in enumerate(fh_lines):
        #     if line_in_comment:
        #         if is_comment_line_end(line):
        #             line_in_comment = False
        #         continue
        #     if is_comment_line_start(line):
        #         line_in_comment = True
        #         if line.rstrip()[-2:] == '*/':
        #             line_in_comment = False
        #         continue
        #     if not is_comment_line(line):
        #         res[line.lstrip().rstrip()] = [i,line]
        # return res

    def get_ns_ccbegin(self):
        for i,line in enumerate(self.m_lines):
            if line.count('NS_CC_BEGIN') == 1:
                return i
        return None

    def update_fileheader(self,other_class):
        other_fh_res = other_class.find_fileheader()
        self_fh_res = self.find_fileheader()

        other_fh = other_class.m_lines[other_fh_res[0]:other_fh_res[1]]
        self_fh = self.m_lines[self_fh_res[0]:self_fh_res[1]]

        rec_json = read_json_file(RecUpgrade_Diff_File)
        tlines = None
        bf = os.path.basename(self.m_file_path)
        name_key = bf + '_cpp'
        if name_key in rec_json:
            tlines = rec_json[name_key]
        else:
            tlines = compare_lines(other_fh,self_fh)
            rec_json[name_key] = tlines
            with open(RecUpgrade_Diff_File,'w') as f:
                f.write(json.dumps(rec_json))
        self.m_lines[self_fh_res[0]:self_fh_res[1]] = tlines
        # head_lines = {}
        # for x in self_fh:
        #     if x in other_fh:
        #         head_lines[x] = True
        
        # added_lines = []
        # for x in other_fh:
        #     if not x in head_lines:
        #         added_lines.append(other_fh[x])
        
        # added_lines.sort(key=lambda x:x[0])
        # res_lines = []
        # for x in added_lines:
        #     res_lines.append(x[1])

        # ns_ccbgin = self.get_ns_ccbegin()
        # class_start = ns_ccbgin if ns_ccbgin else self.m_start
        # insert_before_idx(class_start,self.m_lines,res_lines)
        self.save()

def get_tag(line):
    for x in Access_tags:
        if x in line:
            return x
    return None


class ClassHeader():
    def just_replace_fileheader_comment(self,other_class):
        self.m_lines[0:self.m_fh_comment_ed] = other_class.m_lines[0:other_class.m_fh_comment_ed]
        self.save()
    def __init__(self,lines,file_path,start_p=0):
        self.m_lines = lines
        self.m_file_path = file_path

        self.m_start = -1
        self.m_end = -1
        self.m_name = ''
        self.m_fh_start = None
        self.m_fh_end = None

        self.m_fh_comment_st = -1
        self.m_fh_comment_ed = -1
        self.m_start = -1
        for i,line in enumerate(self.m_lines):
            if is_comment_line(line):
                if self.m_fh_comment_st == -1:
                    self.m_fh_comment_st = i
                else:
                    self.m_fh_comment_ed = i + 1
                    break

        bracket = []

        line_in_comment = False
        # start
        for i,line in enumerate(lines):
            if i < start_p:
                continue
            if line_in_comment:
                if is_comment_line_end(line):
                    line_in_comment = False
                continue
            if is_comment_line_start(line):
                line_in_comment = True
                if line.rstrip()[-2:] == '*/':
                    line_in_comment = False
                continue

            if line[:len('class')] == 'class' and line.count(';') == 0 and lines[i+1][0] == '{':
                self.m_start = i
                self.m_name = find_class_name(line)
            
            if self.m_start > -1:
                if not is_comment_line(line):
                    for ch in line:
                        if ch == '{':
                            # print('push { ',i,':',line)
                            bracket.append(ch)
                        elif ch == '}':
                            if len(bracket) == 0:
                                a = 100
                            bracket.pop()
                            if len(bracket) == 0:
                                self.m_end = i
                                break

        self.m_prop_map = {}
        self.m_func_map = {}
        self.m_using_map = {}
        access_tag = 'private:'
        for i,line in enumerate(self.m_lines[self.m_start:self.m_end]):
            if is_comment_line(line):
                continue

            at = get_tag(line)
            if at:
                access_tag = at
            
            # if 'computeIndexSize' in line:
            #     a = 100
            #     t = function_declare_re.findall(line)

            if len( function_declare_re.findall(line)) > 0:
                try:
                    # print('has func',function_declare_re.sub(r'\1|\2',line))
                    tmp2_arr = function_declare_re.sub(r'\1|\2',line).split('|')
                    if tmp2_arr[0][0:3] == 'CC_':
                        continue
                    # if tmp2_arr[0] == 'setFlippedY':
                    #     a = 100
                    #     b = 200
                    if len(tmp2_arr) == 2:
                        fp = parse_func_param(tmp2_arr[1])
                        r = [tmp2_arr[0]]
                        r.extend(fp)
                        self.m_func_map['-'.join(r)] = {'params':fp, 'line': self.m_start + i,'tag':access_tag}
                except Exception as e:
                    print(e)
                a =100
            elif len(propvalue_declare_re.findall(line)) > 0 and len(using_grammaer_re.findall(line)) == 0:
                if line.count('using ') == 1 and line.lstrip()[0] == 'u':
                    pass
                else:
                    tmp = parse_prop(line)
                    # propvalue_declare_re.sub(r'\1|\2|\3|\4',line).split('|')
                    self.m_prop_map[tmp[0]] = {
                        'type': tmp[0],
                        'default': tmp[2],
                        'line': self.m_start + i,
                        'tag':access_tag
                    }
            elif len(using_grammaer_re.findall(line)) > 0:
                tmp = using_grammaer_re.findall(line)[0]
                if len(tmp) == 2:
                    self.m_using_map[tmp[0]] = {
                        'key': tmp[0],
                        'val': tmp[1],
                        'line': self.m_start + i,
                        'line_str': line
                    }


        a = 100
        b = 100

    def is_valid_class(self):
        return self.m_start != self.m_end and self.m_end != -1

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
        return fh_lines
        # res = {}
        # line_in_comment = False
        # for i,line in enumerate(fh_lines):
        #     if line_in_comment:
        #         if is_comment_line_end(line):
        #             line_in_comment = False
        #         continue
        #     if is_comment_line_start(line):
        #         line_in_comment = True
        #         if line.rstrip()[-2:] == '*/':
        #             line_in_comment = False
        #         continue
        #     if not is_comment_line(line):
        #         res[line.lstrip().rstrip()] = [self.m_fh_start + i,line]
        # return res

    def get_ns_ccbegin(self):
        for i,line in enumerate(self.m_lines):
            if line.count('NS_CC_BEGIN') == 1:
                return i
        return None

    def get_first_tag(self):
        for idx,line in enumerate(self.m_lines[self.m_start:-1]):
            if not is_comment_line(line) and (line.count('public:') == 1 or line.count('protected:') == 1 or line.count('private:') == 1):
                return idx + self.m_start


    def update_fileheader(self,other_fh):
        self_fh = self.find_fileheader()

        rec_json = read_json_file(RecUpgrade_Diff_File)
        tlines = None
        bf = os.path.basename(self.m_file_path)
        name_key = bf + '_header'
        if name_key in rec_json:
            tlines = rec_json[name_key]
        else:
            tlines = compare_lines(other_fh,self_fh)
            rec_json[name_key] = tlines
            with open(RecUpgrade_Diff_File,'w') as f:
                f.write(json.dumps(rec_json))
        self.m_lines[self.m_fh_start:self.m_fh_end] = tlines

        # head_lines = {}
        # for x in self_fh:
        #     if x in other_fh:
        #         head_lines[x] = True
        
        # added_lines = []
        # for x in other_fh:
        #     if not x in head_lines:
        #         added_lines.append(other_fh[x])
        
        # added_lines.sort(key=lambda x:x[0])
        # res_lines = []
        # for x in added_lines:
        #     res_lines.append(x[1])

        # ns_ccbgin = self.get_ns_ccbegin()
        # class_start = ns_ccbgin if ns_ccbgin else self.m_start
        # insert_before_idx(class_start,self.m_lines,res_lines)
        
        


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

def get_relative_path(abs_path,rela_path):
    # /Users/tangwen/Documents/my_projects/cok/client/cocos2d/cocos
    # /Users/tangwen/Documents/my_projects/cok/client/cocos2d/cocos/base/LZMA/lz4.h
    return abs_path.replace(rela_path,'..')

def add_one_file(pbx_project,file_info):
    pass
    dir_name = os.path.join(V4_path,'cocos')
    dist_dir = os.path.join(V3_path,'cocos')

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
    relative_path = get_relative_path(dst_path,dist_dir)
    pbx_project.add_file(path=dst_path,parent=last_parent,tree=None,target_name=target_name,force=False,file_options=file_options)
    # pbx_project.add_file(filePath, force=False)
    

def handle_added_files(pbx_project,file_arr):
    for x in file_arr:
        add_one_file(pbx_project,x)

    pbx_project.save()

def pre_handle_file(file_path):
    rp = [
        ['GLProgram*','backend::Program*'],
        ['GLProgram&','backend::Program&'],
        ['GLProgram ','backend::Program '],
        
        ['GLProgramState*','backend::ProgramState*'],
        ['GLProgramState&','backend::ProgramState&'],
        ['GLProgramState ','backend::ProgramState ']
    ]
    file_replace_words_arr(file_path,rp)

def upgrade_one_file(file_arr,v3_root,v4_root):
    v3_file = file_arr[0]
    v4_file = file_arr[1]
    v3_path = os.path.join(v3_root,v3_file[1])
    v4_path = os.path.join(v4_root,v4_file[1])
    upgrade_one_file_(v3_path,v4_path)

def upgrade_one_file_(v3_path,v4_path):
    ext = file_extension(v3_path)
    if ext == '.h' and ext == '.cpp':
        return
    
    pre_handle_file(v3_path)
    if ext == '.h':
        upgrade_file_header(v4_path,v3_path)
    elif ext == '.cpp':
        upgrade_file_cpp(v4_path,v3_path)

def recreate_error_dir():
    dst_dir = V3toV4_error_dir
    if os.path.exists(dst_dir):
        subprocess.call(["rm","-rf",dst_dir])
    os.makedirs(os.path.join(dst_dir,'v3'))
    os.makedirs(os.path.join(dst_dir,'v4'))

def fix_new_render_one_file(file_path):
    lines = get_file_lines(file_path)
    if not lines:
        return
    new_lines = []
    precode_stack = []
    is_in_newr_block = False
    out_newr_block = False
    had_changed = False
    for i,line in enumerate(lines):
        if not is_comment_line(line) and line.count('#ifdef NewRender') == 1:
            is_in_newr_block = True
            precode_stack.append('#if')
            had_changed = True
        else:
            if is_in_newr_block:
                if line.count('#if') > 0:
                    precode_stack.append('#if')
                elif line.count('#else') > 0 or line.count('#endif') > 0:
                    precode_stack.pop()
                    if len(precode_stack) == 0:
                        is_in_newr_block = False
                        out_newr_block = True
            else:
                if out_newr_block:
                    if line.count('#if') > 0:
                        precode_stack.append('#if')
                        new_lines.append(line)
                    elif line.count('#endif') > 0:
                        if len(precode_stack) == 0:
                            out_newr_block = False
                        else:
                            precode_stack.pop()
                            new_lines.append(line)
                    else:
                        new_lines.append(line)
                else:
                    new_lines.append(line)

    if had_changed:
        write_file_lines(file_path,new_lines)
        print("fix newrender of ", os.path.basename(file_path), 'ok')

def fix_new_render(dst_dir):
    for f in os.listdir(dst_dir):
        sourceF = os.path.join(dst_dir,f)
        if os.path.isfile(sourceF):
            # bf = os.path.basename(sourceF)
            ext = file_extension(sourceF)
            if ext == '.h' or ext == '.cpp':
                fix_new_render_one_file(sourceF)
        elif os.path.isdir(sourceF):
            fix_new_render(sourceF)

def find_group_(arr,x):
    for i,v in enumerate(arr):
        bf = file_without_extension(v[0][0][1])
        if bf == x:
            return v
    return None

def divide_group(arr):
    pass
    res = []
    for i,v in enumerate(arr):
        bf = file_without_extension(v[0][1])
        find_one = find_group_(res,bf)
        if not find_one:
            res.append([v])
        else:
            find_one.append(v)
    return res

def access_rec_module_handle(key=None,val=None,rec_file = '_v3_access_rec_module_'):
    res = read_json_file(rec_file)
    if not key:
        return res
    if not val:
        return res.get(key)
    else:
        res[key] = val
        with open(rec_file,'w') as f:
            f.write(json.dumps(res))

def access_reserved_map(key=None,val=None):
    return access_rec_module_handle(key,val,'_v3_resereved_map_')

def upgrade_pbx_proj():
    recreate_error_dir()
    file_path = os.path.join(V3_path,'build/cocos2d_libs.xcodeproj/project.pbxproj')
    pbx_res = get_xcode_proj(file_path)
    pbx1 = pbx_res[0]
    pbx1_project = pbx_res[1]

    file_path2 = os.path.join(V4_path,"ios-build/engine/cocos/core/cocos2d_libs.xcodeproj/project.pbxproj")
    pbx_res2 = get_xcode_proj(file_path2)
    pbx2 = pbx_res2[0]
    pbx2_project = pbx_res2[1]

    v3_root = os.path.join(V3_path,'cocos/renderer')
    v4_root = os.path.join(V4_path,'cocos')

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

    handle_cppfile = False
    if handle_cppfile:
        reserve_2 = []
        for x in reserve_:
            ext =file_extension(x[1])
            if ext != '.vert' and ext != '.frag':
                reserve_2.append(x)

        replace_2 = divide_group(replace_)
        for y in replace_2:
            for x in y:
                print('replace file: {} ===> {}'.format(x[0][1],x[1][1]))
                upgrade_one_file(x,v3_root,v4_root)

            bf = file_without_extension(y[0][0][1])
            had_rec = access_rec_module_handle(bf)
            if not had_rec:
                conti = input('is continue (y/n)?') == 'y'
                # conti = True
                if not conti:
                    break
                access_rec_module_handle(bf,"true")

        for x in reserve_2:
            print('reserved file:',x[1])

    handle_added_files(pbx1_project,added_)
    pass

def main():
    upgrade_pbx_proj()
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
    fix_multiline_of_file(file_path)
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

def lower_first_ch(str1):
    res = []
    finded = False
    for i,ch in enumerate(str1):
        if not finded and ch.isalpha():
            finded = True
            res.append(ch.lower())
        else:
            res.append(ch)

    return ''.join(res)

def is_x_in_map(x,t_map):
    if x in t_map:
        return x
    
    x = x.replace('_gl','_')
    x = lower_first_ch(x)
    if x in t_map:
        return x
    return None

def file_replace_words_arr(file_path,words_arr):
    if len(words_arr) == 0:
        return
    try:
        f = codecs.open(file_path, 'r', 'utf-8')
        content = f.read()
        f.close()

        for x in words_arr:
            content = content.replace(x[0],x[1])

        f = codecs.open(file_path, 'w', 'utf-8')
        f.write(content)
        f.close()
    except Exception as e:
        print('can not open',file_path)
        return None

def toggle_h_cpp_ext(file_path):
    ext = file_extension(file_path)
    if ext != '.h' and ext != '.cpp':
        return
    
    dir_name = os.path.dirname(file_path)
    bf = os.path.basename(file_path)
    fn = file_without_extension(bf)
    new_ext = '.h' if ext == '.cpp' else '.cpp'
    return os.path.join(dir_name,fn + new_ext)

def compare_two_map(map1,map2):
    update = {}
    reserved = {}
    added = {}

    haded = {}
    for x in map1:
        pass
        if x in map2:
            update[x] = [x,map1[x],map2[x]]
            haded[x] = True
        else:
            reserved[x] = map1[x]

    for x in map2:
        if not x in haded:
            added[x] = map2[x]
    
    return {
        'update': update,
        'reserved': reserved,
        'added': added
    }

def sort_map(map1,sKey="line"):
    res = []
    for x in map1:
        res.append(map1[x])

    res.sort(key=lambda x: x[sKey])
    tr = []
    for x in res:
        tr.append(x['line_str'])
    return tr


def compare_class(class1,class2):
    # prop compare
    prop_cpd = {}
    update_cp = {}
    reserved_cp = {}
    replaced_prop = []
    for x in class1.m_prop_map:
        y = is_x_in_map(x,class2.m_prop_map)
        if y:
            prop_cpd[y] = True
            if class2.m_prop_map[y]['type'] != class1.m_prop_map[x]['type']:
                line1 = class1.m_prop_map[x]['line']
                line2 = class2.m_prop_map[y]['line']
                class1.m_lines[line1] = class2.m_lines[line2]
            if x != y:
                replaced_prop.append([x,y])
        else:
            reserved_cp[x] = class1.m_prop_map[x]

    if len(replaced_prop) > 0:
        file_replace_words_arr(toggle_h_cpp_ext(class1.m_file_path),replaced_prop)

    prop_lines = []
    for x in class2.m_prop_map:
        if not x in prop_cpd:
            # update_cp[x] = class2.m_prop_map[x]
            line2 = class2.m_prop_map[x]['line']
            # print(class2.m_lines[line2])
            prop_lines.append([line2, class2.m_lines[line2], class2.m_prop_map[x]['tag']])

    prop_lines.sort(key=lambda x: x[0])
    prop_lines_res = []
    st_tag = None
    for x in prop_lines:
        if st_tag != x[2]:
            st_tag = x[2]
            prop_lines_res.append(x[2]+'\n')
        prop_lines_res.append(x[1])

    end_of_class_idx = class1.m_end
    insert_before_idx(end_of_class_idx,class1.m_lines,prop_lines_res)
    class1.m_end += len(prop_lines_res)

    # function compare
    func_cpd = {}
    func_reserved_cpd = {}
    for x in class1.m_func_map:
        x_trim = x.split('-')[0]
        do_find_func = False
        for y in class2.m_func_map:
            y_trim = y.split('-')[0]
            if x_trim == y_trim and not y in func_cpd:
                do_find_func = True
                # if x_trim == 'create':
                #     print(class1.m_lines[class1.m_func_map[x]['line']])
                #     print(class2.m_lines[class2.m_func_map[y]['line']])
                #     a = 100
                if len(class2.m_func_map[y]['params']) == len(class1.m_func_map[x]['params']):
                    func_cpd[y] = True
                    line1 = class1.m_func_map[x]['line']
                    line2 = class2.m_func_map[y]['line']
                    class1.m_lines[line1] = class2.m_lines[line2]
                    break
        if not do_find_func:
            func_reserved_cpd[x] = class1.m_func_map[x]

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
            prop_lines.append([line2,class2.m_lines[line2],class2.m_func_map[x]['tag']])

    prop_lines.sort(key=lambda x: x[0])
    prop_lines_res = []
    st_tag = None
    for x in prop_lines:
        if st_tag != x[2]:
            st_tag = x[2]
            prop_lines_res.append(x[2]+'\n')
        prop_lines_res.append(x[1])

    end_of_class_idx = class1.m_end
    insert_before_idx(end_of_class_idx,class1.m_lines,prop_lines_res)
    class1.m_end += len(prop_lines_res)

    bf = os.path.basename(class1.m_file_path)
    access_reserved_map(bf,{
        'prop': reserved_cp,
        "func": func_reserved_cpd
    })

    # using compare
    using_res = compare_two_map(class1.m_using_map,class2.m_using_map)
    added_using = using_res['added']
    au_arr = sort_map(added_using,"line")
    if len(au_arr) > 0:
        au_arr.insert(0,'public:\n')
        first_tag_idx = class1.get_first_tag()
        insert_before_idx(first_tag_idx,class1.m_lines,au_arr)
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
    if len(class_arr1) == 0 or len(class_arr2) == 0:
        dst_dir = V3toV4_error_dir

        v3_error_dir = os.path.join(dst_dir,'v3')
        v4_error_dir = os.path.join(dst_dir,'v4')
        bf3 = os.path.basename(v3_h)
        bf4 = os.path.basename(v4_h)
        shutil.copy(v3_h, os.path.join(v3_error_dir,bf3))
        shutil.copy(v4_h, os.path.join(v4_error_dir,bf4))
        return

    class_arr2[0].just_replace_fileheader_comment(class_arr1[0])
    class_arr2 = parse_headerfile(v3_h)
    compare_fileheader(class_arr2[0],class_arr1[0])

    for x in class_arr2:
        for y in class_arr1:
            if y.m_name == x.m_name:
                tc = reget_header_class(v3_h,x.m_name)
                compare_class(tc,y)
                break

    # class_arr2 = parse_headerfile(v3_h)
    # compare_class(class_arr2[0],class_arr1[0])

def upgrade_file_cpp(v4_cpp,v3_cpp):
    pass
    cpp1 = CppFile(v4_cpp)

    # repace file comment header
    cpp2 = CppFile(v3_cpp)
    cpp2.just_replace_fileheader_comment(cpp1)

    # repace file includes
    cpp2 = CppFile(v3_cpp)
    cpp2.update_fileheader(cpp1)

    # replace file funciton define
    cpp2 = CppFile(v3_cpp)
    cpp2.update_function_define(cpp1)

# [v4_h,v4_cpp,v3_h,v3_cpp]
def upgrade_module(module_files):
    if(len(module_files) != 4):
        return
    upgrade_file_header(module_files[0],module_files[2])
    upgrade_file_cpp(module_files[1],module_files[3])


def get_file_lines(file_path):
    try:
        f = codecs.open(file_path, 'r', 'utf-8')
        lines = f.readlines()
        f.close()
        return lines
    except Exception as e:
        print('can not open',file_path)
        return None

def write_file_lines(file_path, lines):
    f = codecs.open(file_path, 'w', 'utf-8')
    f.writelines(lines)
    f.close()

def get_shader_line_map(lines):
    pass
    line_map = {}
    for i,line in enumerate(lines):
        if len(Shader_re.findall(line)) == 1:
            line_key = Shader_re.match(line).group(1).lower()
            line_map[line_key] = [i,line]
    return line_map

def upgrade_shader_file(file_v4,file_v3):
    lines_v3 = get_file_lines(file_v3)
    if not lines_v3:
        return
    lines_v4 = get_file_lines(file_v4)
    if not lines_v4:
        return
    map_v3 = get_shader_line_map(lines_v3)
    map_v4 = get_shader_line_map(lines_v4)
    had_changed = False
    for x in map_v3:
        if x in map_v4:
            lines_v3[map_v3[x][0]] = lines_v4[map_v4[x][0]]
            had_changed = True
            pass

    if had_changed:
        write_file_lines(file_v3,lines_v3)

def fix_new_render_bydirs():
    dirs = ['/Users/mac/Documents/my_projects/cok/client/IF','/Users/mac/Documents/my_projects/cok/client/cocos2d']
    for x in dirs:
        fix_new_render(x)

if __name__ == "__main__":
    with open('/Users/tangwen/Downloads/cocos2d-x-4.0/cocos/base/ccTypes.h','r') as f:
        content = f.read()
        s = Block_re.findall(content)
        # s2 = Block_re2.findall(content)
        lines = f.readlines()
        lines_len = len(lines)
        for i,line in enumerate(lines):
            if i < lines_len - 1:
                line2 = line + lines[i+1]
                r1 = Block_re.findall(line2)
                r2 = Block_re2.findall(line2)
                if len(r1) > 0 or len(r2) > 0:
                    a = 100

        a = 100
    # line = 'using PrimitiveType = backend::PrimitiveType;'
    # res = using_grammaer_re.findall(line)
    # res2 = propvalue_declare_re.findall(line)
    # upgrade_file_header('/Users/tangwen/Downloads/cocos2d-x-4.0/cocos/renderer/CCCustomCommand.h','/Users/tangwen/Documents/my_projects/cok/client/cocos2d/cocos/renderer/CCCustomCommand.h')
    # a = 100
    # m1 = {'a':100,'b':200}
    # m2 = {'b':300,'c':400}
    # res = compare_two_map(m1,m2)
    # class_arr1 = parse_headerfile(v4_h)
    # class_arr2 = parse_headerfile(v3_h)
    main()