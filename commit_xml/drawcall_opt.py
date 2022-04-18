# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import plistlib

def has_render_property(node):
    res = []
    props = node['properties']
    for p in props:
        if p['type'] == 'SpriteFrame':
            res.append(p)
    return res
def node_visit_func(node):
    pass

    render_props = has_render_property(node)
    if len(render_props) > 0:
        print('node Type is',node['baseClass'])
        
    # if node['baseClass'] == 'CCControlButton':
    #     a = 1
    # if node['displayName'] == 'CCControlButton':
    #     a = 1
    # a = 100
    return render_props

def walk_tree(node, visit_func):
    pass
    visit_func(node)
    for k in node['children']:
        walk_tree(k, visit_func)

def get_all_res(file_path):
    pass
    pl = plistlib.readPlist(file_path)
    all_render_props = []
    # node_visit_func
    walk_tree(pl['nodeGraph'], lambda m: all_render_props.extend( node_visit_func(m)) )
    a = 100

def main():
    pass
    get_all_res("/Users/mac/Documents/my_projects/cok/client/CCB/IF/Resources/gameUI.ccb")

if __name__ == "__main__":
    main()