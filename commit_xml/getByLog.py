# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils

GetBy_re = re.compile(r'(static getBy.*\{)')
Return_re = re.compile(r'return (.*?)\.')



def addlog_getby(file_path):
    lines = myutils.get_file_lines(file_path)
    for i, l in enumerate(lines):
        gp = GetBy_re.findall(l)
        if len(gp) > 0:
            next_l = lines[i+1]
            lg = Return_re.findall(next_l)
            if len(lg) > 0:
                # console.log('Config Check ==== {0}', value)
                new_l = GetBy_re.sub(r'\1\n\t\t'+"config_check('{0}', value)".format(lg[0]), l)
                lines[i] = new_l

    lines.append('''
let used_list : string[] = [];
// @ts-ignore
cc.sys._tw_used_list = used_list;
function config_check(name:string, value:any){
  console.log('Config Check ==== ',name,value);
  if(used_list.indexOf(name) === -1){
    used_list.push(name);
  }
}
    ''')
    myutils.write_file_lines(file_path, lines)


def main():
    addlog_getby('/Users/hcm-b0208/Documents/my_projects/threekingdom/tk-client/tk-client/assets/game/scripts/config/Configs.ts')

    pass

if __name__ == "__main__":
    main()