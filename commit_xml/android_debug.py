# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

from datetime import datetime, timedelta
import time

import adb_logcat_monitor

def try_restart_adb():
    subprocess.call(['adb','kill-server'])
    subprocess.call(['adb','start-server'])
    subprocess.call(['adb','devices'])

def down_load_apk(apk_name,tag):
    i = 0
    while i < 365:
        try:
            d = datetime.today() - timedelta(days=i)
            pkg_dir = d.strftime('%Y%m%d')
            work_sp = "IF_tangwen_cn1" if tag == 'cn1' else "IF_tangwen"
            apk_path = 'sky@10.1.25.230:/Users/s/.jenkins/jobs/{0}/workspace/package/{1}/{2}'.format(work_sp,pkg_dir,apk_name)
            print('start download apk...', pkg_dir)
            subprocess.check_output(['scp',apk_path,apk_name])
            break
        except Exception as e:
            # print(e)
            pass
        i += 1

def install_apk(apk_name, simulatorName):
    print('start install apk...')
    try_restart_adb()
    if simulatorName:
        subprocess.call(['adb','-s',simulatorName.lstrip().rstrip(),'install','-r',apk_name])
    else:
        subprocess.call(['adb','install','-r',apk_name])

def start_log():
    print('start log...')
    adb_logcat_monitor.main('logs')
    

def main():
    pass

    apk_name = 'IF_Inner.apk'
    tag = 'inner'
    if len(sys.argv) >= 2:
        if sys.argv[1] == 'inner':
            apk_name = 'IF_Inner.apk'
        else:
            apk_name = 'COK_CN1.apk'
        tag = sys.argv[1]
    down_load_apk(apk_name,tag)
    install_apk(apk_name, sys.argv[2] if len(sys.argv) == 3 else None)

    # if len(sys.argv) == 2:
    #     if sys.argv[1] == 'nolog':
    #         return
    # start_log()

if __name__ == "__main__":
    main()