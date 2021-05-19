# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess

Commit_re = re.compile(r'commit\s+(\w+)')


def main():
    if len(sys.argv) != 2:
        print('usage: python prepare_v4testflight.py branchName')
        print('eg: python prepare_v4testflight.py release_6.37.0')
        return

    branch_name = sys.argv[1]
    if_remote = "if"
    v4_remote = "tangwen"
    subprocess.call(['git','reset','--hard','HEAD'])
    subprocess.call(['git','clean','-fd'])

    localBranchCnt=subprocess.check_output(['git','branch','|','grep',branch_name,'|', 'wc','-l']).lstrip().rstrip()
    if localBranchCnt == '0':
        subprocess.call(['git','checkout','-b',branch_name,if_remote+'/'+branch_name])
    else:
        subprocess.call(['git','checkout',branch_name])
    
    out_put = subprocess.check_output(['git','log','--pretty=oneline','--abbrev-commit','-1'])
    if 'v4 render upgrade beta' in out_put:
        subprocess.call(['git','reset','--hard','HEAD~1'])
    
    try:
        subprocess.call(['git','fetch',v4_remote,branch_name])

        logs = subprocess.check_output(['git','log','-1','{0}/{1}'.format(v4_remote,branch_name)]).split('\n')
        has_render_upgrade = False
        for x in logs:
            if x.count('v4 render upgrade') > 0:
                has_render_upgrade = True
                break
        if not has_render_upgrade:
            print('no render commit on',v4_remote,branch_name)
            sys.exit(1)

        sha = Commit_re.findall(logs[0])[0]

        subprocess.call(['git','cherry-pick',sha])
        print('apply v4 patch ok.')
    except Exception as e:
        print('apply v4 patch failed',e)
        sys.exit(1)

    # git apply --ignore-space-change --ignore-whitespace /Users/hcg-tech2/git_client/clientcode/google广告sdk升级7.67.0补丁\(20210407\).diff 
    try:
        patch_path = '/Users/hcg-tech2/git_client/clientcode/google广告sdk升级7.67.0补丁(20210407).diff'
        subprocess.call(['git','apply','--ignore-space-change','--ignore-whitespace',patch_path])
        print('apply google sdk patch ok.')
    except Exception as e:
        print('apply google patch failed',e)
        sys.exit(1)

    try:
        pre_pwd = os.getcwd()
        os.chdir('./CCB/IF')
        subprocess.call(['sh','pack_all.sh'])
        print('pack_all ios res ok.')
    except Exception as e:
        print('pack ios res failed',e)
    
    print('now you can archive testflight')
    pass

if __name__ == "__main__":
    main()





