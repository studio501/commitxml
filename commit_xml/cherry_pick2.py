# -*- coding: utf-8 -*

from __future__ import division
from __future__ import print_function
import sys,re
import time
import subprocess
import gitlab

# 安装gitlab: sudo pip install --upgrade python-gitlab
# 安装gitlab 有问题: https://python-gitlab.readthedocs.io/en/stable/install.html


# 修改为自己的 PrivateToken 在gitlab->settings(右上)->access tokens->Personal Access Tokens (没有添加一个)
PrivateToken = 'v9shcy1H8dfEnUpULiy1'
# 查找project id 在gitlab->settings(左边)->General project settings-> Project ID
ProjectId = '1505'

# 使用方法: 
# 1. 将此脚本放在 client 目录
# 2. python cherry-pick sha

Re1 = re.compile(r':(.*)/')
Re2 = re.compile(r'com/(.*)/')

def is_number(str):
    try:
        # 因为使用float有一个例外是'NaN'
        if str=='NaN':
            return False
        float(str)
        return True
    except ValueError:
        return False

def table_contains(tb,s):
	for x in tb:
		if x == s:
			return True
	return False

def show_msg_box(msg):
	str1 = 'Tell application "System Events" to display dialog "{}" with title "Commit complete"'.format(msg)
	subprocess.call(['osascript','-e',str1])

def my_input(msg,needNumber = False):
	while True:
		pass
		print(msg,end='')
		try:
			tmpStr = raw_input().rstrip()

			# handle number
			if not needNumber:
				return tmpStr

			splitStr = tmpStr.split(' ')
			lenStr = len(splitStr)

			be_number = True
			if lenStr > 1:
				for v in splitStr:
					be_number = be_number and (is_number(v) or isStringNil(tmpStr))
					if not be_number:
						break
			else:
				be_number = be_number and (is_number(tmpStr) or isStringNil(tmpStr))

			if be_number:
				return tmpStr
			else:
				print(u'输入有误,请重新输入')
		except KeyboardInterrupt:
			print("\nInterrupted by user")
			sys.exit()

def raise_error(msg,iwWarnning=False):
	print("{}!!!!!!!!!".format('Warnning' if iwWarnning else 'Error & abort'),'(',msg,')')
	if not iwWarnning:
		sys.exit()

def append_by_table(tb1,tb2,tsep=''):
	for x in tb2:
		tb1.append(x + tsep)


def get_current_branch():
	res = subprocess.check_output(['git','branch'])
	v_res = res.replace('\n',' ').replace('* ',' ')
	print("all branch:")
	print(v_res)
	for x in res.split('\n'):
		if x.count('*') == 1:
			return x[2:]

	raise_error('no branch found')

def get_all_branch():
	res = subprocess.check_output(['git','branch'])
	return res

def pull_branch(branchName,remoteName):
	pass
	subprocess.call(['git','checkout',branchName])
	time.sleep( 0.5 )
	subprocess.call(['git','pull',remoteName,branchName])

def getRemote():
	res = subprocess.check_output(['git','remote','-v']).split('\n')
	r = []
	for x in res:
		is_https_way = x.count('https') == 1
		ReComp = Re2 if is_https_way else Re1
		group = ReComp.findall(x)
		if group and len(group) == 1:
			if len([y for y in r if y[0] == group[0]]) == 0:
				r.append( [ group[0],x.split('\t')[0] ] )
	return r

def getUserName():
	res = subprocess.check_output(['git','config','--list']).split('\n')
	user_name = 'user.name'
	for x in res:
		if x.count(user_name):
			return x[len(user_name)+1:]

def getUserRemote():
	all_remote = getRemote()
	return [x for x in all_remote if x[0] == getUserName()][0][1]

def getMainRemote():
	all_remote = getRemote()
	return [x for x in all_remote if x[0] == 'if.game.client'][0][1]

def main(commit_sha):
	pass
	print(u'复杂的,分支有差异的提交请勿用此工具')
	global PrivateToken
	commit_msg = get_commit_msg_by_sha(commit_sha)
	self_remote = getUserRemote()
	main_remote = getMainRemote()
	cur_branch = get_current_branch()
	print('current branch:',cur_branch)

	need_branch = my_input(u'输入要提交的分支 空格分隔').rstrip().split()

	err_msg = None
	for x in need_branch[::-1]:
		is_master = x.count('master') == 1
		remote_bh = self_remote if is_master else main_remote
		pull_branch(x,remote_bh)
		time.sleep( 0.5 )
		
		result = None
		try:
			process = subprocess.Popen(['git','cherry-pick',commit_sha], stderr=subprocess.PIPE)
			stderr = process.communicate(0)
			stdout_str = 'result:{}'.format(stderr)
			if stdout_str.count('after resolving the conflicts') > 0:
				err_msg = True
				break
		except Exception as e:
			print('Exception is',result)
		finally:
			pass

		time.sleep( 0.5 )
		subprocess.call(['git','push',self_remote,x])
		time.sleep( 0.5 )
		send_merge_request(x,'master' if is_master else x,commit_msg,PrivateToken)
		print(u'提交 {0} 成功'.format(x))

	pull_branch(cur_branch,self_remote)

	show_msg_box('resolving the conflicts!!!' if err_msg else 'Merge request successful')


def get_commit_msg_by_sha(commit_sha):
	op = subprocess.check_output(['git','log',commit_sha,'-1','--pretty=oneline'])
	os = op.find(' ')
	return op[os+1:]


def send_merge_request(self_branch,if_branch,title_msg,pv_tk):
	pass

	global ProjectId
	server_url = 'https://git.hortorgames.com'
	gl = gitlab.Gitlab(server_url, private_token=pv_tk)
	projects = gl.projects

	client_pro = gl.projects.list(search='tk-client')
	all_pro_id = []
	for x in client_pro:
		all_pro_id.append(x.id)

	all_pro_id.sort()
	if_project_id = all_pro_id[0]

	projects2 = gl.projects.list(owned=True)
	my_project = None
	if len(projects2) == 1:
		my_project = projects2[0]
	else:
		if ProjectId == 'default':
			i_cter = 0
			for x in projects2:
				i_cter += 1
				print(i_cter,': (','id: ',x.id,', name:',x.name,')')

			pIndex = int(my_input(u'请输入项目index (从1 开始): ',True).rstrip()) - 1
			ProjectId = projects2[pIndex].id
		else:
			i_cter = 0
			for x in projects2:
				if x.id == int(ProjectId):
					break
				i_cter += 1

		my_project = projects2[pIndex]


	mr = my_project.mergerequests.create({'source_branch': self_branch,
                                   'target_branch': if_branch,
                                   'title': title_msg,'source_project_id': my_project.id,'target_project_id': if_project_id
                                   })


def reset_to_sha1(to_sha1):
	subprocess.call(['git','reset','--hard',to_sha1 + '~1'])
	time.sleep( 0.5 )
	subprocess.call(['git','push','-f',getUserRemote(),get_current_branch()])
	time.sleep( 0.5 )
	subprocess.call(['git','pull',getMainRemote(),get_current_branch()])

def test():
	global ProjectId
	server_url = 'https://git.hortorgames.com'
	gl = gitlab.Gitlab(server_url, private_token=PrivateToken)
	projects = gl.projects

	client_pro = gl.projects.list(search='tk-client')
	pass


if __name__ == '__main__':
	if len(sys.argv) >= 2:
		if False:
			test()
		else:
			if len(sys.argv) == 2:
				main(sys.argv[1])
			elif len(sys.argv) == 3:
				if sys.argv[2] == 'reset':
					reset_to_sha1(sys.argv[1])

	else:
		print('@param1: commit sha')

	pass