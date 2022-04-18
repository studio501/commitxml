# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess,time
import my_input

Merge_re = re.compile(r'Merge:\s*(\w+)\s+(\w+)')

def get_HEAD_sha():
    res = subprocess.check_output(['git','log','HEAD','--pretty=oneline','-1']).split(' ')[0]
    return res

def get_breif_log():
    res = subprocess.check_output(['git','log','--abbrev-commit'])
    return res

def trim_sha(sha):
    return sha[:12]

def rebase_by_sha(sha,rebase_sh):
    head_sha = get_HEAD_sha()
    msg = 'squash commit from {0} to {1}'.format(trim_sha(sha),trim_sha(head_sha))
    try:
        rest = subprocess.check_output(['sh',rebase_sh,sha])
        if rest.count('Merge conflict') > 0:
            return False
    except Exception as e:
        print(e)
        a = 100
    subprocess.call(['git','commit','--amend','-m',msg])
    return True

def rebase_func(directory):
    pwd = os.getcwd()
    os.chdir(directory)
    res = subprocess.check_output(['git','log'])
    with open(os.path.join(pwd,"rebase_init_log"),'w') as f:
        f.write(res)

def find_all_merge():
    logs = get_breif_log()
    res = Merge_re.findall(logs)
    return res

def main():
    pass
    pwd = os.getcwd()
    rebase_sh = os.path.join(pwd,'rebase.sh')
    work_directory = '/Users/mac/Documents/my_projects/cok/client'
    os.chdir(work_directory)

    if len(sys.argv) == 2:
        dest_sha = sys.argv[1]
        print('start squash',dest_sha)
        rebase_by_sha(dest_sha,rebase_sh)
    else:
        while True:
            merges = find_all_merge()
            if len(merges) == 0:
                break

            first_merge = merges[0][0]
            print('start squash',first_merge)
            ret = rebase_by_sha(first_merge,rebase_sh)
            if not ret:
                print('error squash !!! task not finish')
                break

if __name__ == "__main__":
    main()