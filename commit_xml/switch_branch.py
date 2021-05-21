# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

RemoteName_re = re.compile(r'(\w+)\s+.*?')
Commit_re = re.compile(r'commit\s+(\w+)')

def update_one_branch(branch_name, remote_name):
    subprocess.call(['git','checkout',branch_name])
    subprocess.call(['git','pull',remote_name,branch_name])
    print('update',branch_name,'successful')

def find_remote_name(remote_url):
    res = subprocess.check_output(['git','remote','-v']).split('\n')
    for x in res:
        if x.count(remote_url):
            return RemoteName_re.findall(x)[0]

def update_branches(range_arr, prefix, remote_name):
    for i in range(range_arr[0],range_arr[1]+1):
        bn = '{0}{1}.0'.format(prefix,i)
        update_one_branch(bn,remote_name)

def test_cherry_pick(commitSha, range_arr, prefix, remote_name):
    for i in range(range_arr[0],range_arr[1]+1):
        bn = '{0}{1}.0'.format(prefix,i)
        try:
            subprocess.check_output(['git','checkout',bn])
            subprocess.check_output(['git','cherry-pick',commitSha])
        except Exception as e:
            print('cherry-pick',commitSha,'error on',bn)
            break

def try_remove_remote(remote_name):
    try:
        subprocess.check_output(['git','remote','rm',remote_name])
    except Exception as e:
        pass

def find_out_v4_commitsha(branch_name,specify_url=None):
    v4_url = specify_url if specify_url else "git@git.elex-tech.com:tangwen/clientcode.git"
    remote_name = None
    if specify_url:
        remote_name = "_dev_patch"
        try_remove_remote(remote_name)
        subprocess.call(['git','remote','add',remote_name,specify_url])
    else:
        remote_name = find_remote_name(v4_url)
        if not remote_name:
            remote_name = "v4"
            subprocess.call(['git','remote','add',remote_name,v4_url])
    
    
    subprocess.call(['git','fetch',remote_name,branch_name])
    logs = subprocess.check_output(['git','log','-1','{0}/{1}'.format(remote_name,branch_name)]).split('\n')
    has_render_upgrade = False
    if specify_url:
        has_render_upgrade = True
    else:
        for x in logs:
            if x.count('v4 render upgrade') > 0:
                has_render_upgrade = True
                break
    sha = Commit_re.findall(logs[0])[0]
    return [sha,has_render_upgrade]

def main():
    pass

    # assume already on dst branch
    sha = find_out_v4_commitsha(sys.argv[1], sys.argv[2] if len(sys.argv) == 3 else None)
    if not sha[1]:
        print('error')
        sys.exit(0)
    
    try:
        subprocess.check_output(['git','cherry-pick',sha[0]])
    except Exception as e:
        print('error',e)
    print('ok')
    sys.exit(0)

if __name__ == "__main__":
    main()
