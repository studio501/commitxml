# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re,codecs,subprocess
from pbxproj import XcodeProject

def get_xcode_proj_(project,group,now_key,res):
    if not res.get( now_key):
        res[now_key] = {}
    chs = group["children"]
    for x in chs:
        t = project.get_object(x)
        if t.isa == 'PBXFileReference':
            res[now_key][t.get_name()] = t.get_id()
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
    return res

def main():
    file_path = "/Users/mac/Documents/my_projects/cok/client/cocos2d/build/cocos2d_libs.xcodeproj/project.pbxproj"
    pbx1 = get_xcode_proj(file_path)
    file_path2 = "/Users/mac/Downloads/cocos2d-x-4.0/mac-build/engine/cocos/core/cocos2d_libs.xcodeproj/project.pbxproj"
    pbx2 = get_xcode_proj(file_path2)
    pass

if __name__ == "__main__":
    main()