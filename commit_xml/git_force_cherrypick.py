# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

RemoteName_re = re.compile(r'(\w+)\s+.*?')
Commit_re = re.compile(r'commit\s+(\w+)')

def has_local_branch(branch_name,remote_name,remote_mine):
    all_branchs = subprocess.check_output(['git','branch']).split('\n')
    for x in all_branchs:
        if x.count(branch_name) > 0:
            return True
    return False

def update_one_branch(branch_name, remote_name, commitSha, remote_mine):
    if has_local_branch(branch_name,remote_name,remote_mine):
        subprocess.call(['git','checkout',branch_name])
        subprocess.call(['git','reset','--hard','HEAD~1'])
        subprocess.call(['git','pull',remote_name,branch_name])
    else:
        subprocess.call(['git','fetch',remote_name])
        subprocess.call(['git','checkout','-b',branch_name,'{0}/{1}'.format(remote_name,branch_name)])
    try:
        subprocess.check_output(['git','cherry-pick',commitSha])
    except Exception as e:
        print(e)
        return False
    subprocess.check_output(['git','push','-f',remote_mine,branch_name])
    print('update',branch_name,'successful')
    return True

def find_remote_name(remote_url):
    res = subprocess.check_output(['git','remote','-v']).split('\n')
    for x in res:
        if x.count(remote_url):
            return RemoteName_re.findall(x)[0]

def update_branches(range_arr, prefix, remote_name, commitSha, remote_mine):
    for i in range(range_arr[1],range_arr[0]-1,-1):
        bn = '{0}{1}.0'.format(prefix,i)
        if not update_one_branch(bn,remote_name, commitSha, remote_mine):
            print('apply', bn, 'error!!!')
            break


def main():
    pass
    if len(sys.argv) != 4:
        print('usage: python git_force_cherrypick.py startVer endVer sha')
        print('eg: python git_force_cherrypick.py 26 27 34bba766')
        print('    means cherry-pick 34bba766 for branch release_6.26.0~release_6.27.0')
        print('    startVer and endVer can be equal. which means only apply to startVer')
        return
    client_dir = "/Users/mac/Documents/my_projects/cok/client"
    os.chdir(client_dir)

    remote_url = "git@git.elex-tech.com:if.game.client/clientcode.git"
    remote_url_mine = "git@git.elex-tech.com:tangwen/clientcode.git"
    remtote_name = find_remote_name(remote_url)
    remtote_mine = find_remote_name(remote_url_mine)
    
    startVer = int(sys.argv[1])
    endVer = int(sys.argv[2])
    sha = sys.argv[3]
    update_branches([startVer,endVer],'release_6.',remtote_name,sha,remtote_mine)


if __name__ == "__main__":
    main()