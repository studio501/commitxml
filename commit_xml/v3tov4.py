# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re,codecs,subprocess
from pbxproj import XcodeProject
from pbxproj.pbxextensions import FileOptions

from collections import Mapping, Set, Sequence 

# dual python 2/3 compatability, inspired by the "six" library
string_types = (str, unicode) if str is bytes else (str, bytes)
iteritems = lambda mapping: getattr(mapping, 'iteritems', mapping.items)()

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


if __name__ == "__main__":
    # compare_file("/Users/mac/Downloads/cocos2d-x-4.0/cocos/2d/CCSprite.cpp","/Users/mac/Documents/my_projects/cok/client/cocos2d/cocos/2d/CCSprite.cpp")
    main()