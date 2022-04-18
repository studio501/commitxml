# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

import myutils
import my_input

BoostRe = re.compile(r'(boost::\w+)')

def getAllBoostRef(file_path):
    lines = myutils.get_file_lines(file_path)
    res = []
    for x in lines:
        t_result = BoostRe.findall(x)
        if len(t_result) > 0:
            for y in t_result:
                if not my_input.table_contains(res, y):
                    res.append(y)

    myutils.write_file_lines('all_used_boost_feature.txt',res,'\n')
    return res

def find_all_module(dir_path):
    modules = []
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.isdir(sourceF):
            modules.append(f)

    return modules

def is_module_contain(module_path, check_str):
    try:
        res = subprocess.check_output(['grep','-lr',check_str,module_path])
        return res != ''
    except Exception as e:
        return False
    

def main():
    boost_path = '/Users/mac/Downloads/boost_1_75_0/boost'
    file_path = '/Users/mac/Documents/my_projects/local_project/opengl_st/commit_xml/boost_reference.txt'
    # getAllBoostRef(file_path)

    all_module = find_all_module(boost_path)
    all_ref_txt = myutils.get_file_lines('all_used_boost_feature.txt',True)

    none_used_module = []
    for m in all_module:
        mp = os.path.join(boost_path,m)
        atleast_one = False
        for t in all_ref_txt:
            atleast_one = atleast_one or is_module_contain(mp,t)
            if atleast_one:
                break
        if not atleast_one:
            print('this module is not used. ', m)
            none_used_module.append(m)

    myutils.write_file_lines('none_used_module.txt',none_used_module)
    pass

if __name__ == "__main__":
    main()