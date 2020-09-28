# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re,codecs,subprocess

FileName_re = re.compile(r'--- a(.*)')

commit_re = re.compile(r'commit ([\w]{40})')
revert_commit_re = re.compile(r'This reverts commit ([\w]{40})')
author_re = re.compile(r'Author:\s+(.*?)\s+')
date_re = re.compile(r'Date:   (.*?)')
diff_file_re = re.compile(r'diff --git a/(.*) b/.*')
trunk_re = re.compile(r'@@ -(\d+),.* @@\s*(.*)?')
trunk_re2 = re.compile(r'(@@ .* @@)\s*(.*)?')

add_line_re = re.compile(r'$\+\s+.*')
del_line_re = re.compile(r'$\-\s+.*')

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# 截止的提交 sha
StartSha = "62ff3c279cf7f0cff36447ab7c76f25744c356c8"

def get_allcommits(lines):
    reverts = []
    picked_commit = []
    for i,line in enumerate( lines ):
        if len(commit_re.findall(line)) == 1 and len(revert_commit_re.findall(line)) == 0:
            commit_sha = commit_re.sub(r'\1',line).rstrip()
            if len(revert_commit_re.findall(lines[i+5])) == 1:
                reverts.append(commit_sha)
                picked_commit[-1][2] = i - 1
            else:
                if not commit_sha in reverts:
                    if len(picked_commit) > 0 and not picked_commit[-1][2]:
                        picked_commit[-1][2] = i - 1
                    picked_commit.append([commit_sha,i,None])
    picked_commit[-1][2] = len( lines ) -1

    all_commits = []
    for x in picked_commit:
        tl = lines[x[1]:x[2]]
        all_commits.append(commit_cls(tl))

    return all_commits

def tell_subarray_pos(sub,src,off_index=0):
        sub_len = len(sub)
        if sub_len == 0:
            return 0
        
        if sub_len == 1 and sub[0] == '':
            return 0
        
        sub_len = len(sub)
        sub2 = []
        for x in sub:
            sub2.append(x.lstrip().rstrip())
        
        src_len = len(src)
        for i,x in enumerate( src ):
            if i < off_index:
                continue
            do_find = True
            for j in range(sub_len):
                try:
                    do_find = do_find and sub2[j] in src[min( i+j ,  src_len - 1)]
                except Exception as e:
                    print(e)
                    pass
                if not do_find:
                    break
            if do_find:
                return i
        return None

def tell_trunk_modify_latest(file_path,trunk,sec,startsha=StartSha):
    pwd = os.getcwd()
    os.chdir(os.getenv("ClientDir"))
    out_put = subprocess.check_output(['git','log','{}..HEAD'.format(startsha),'-p',file_path])
    lines = codecs.decode(out_put,"utf-8").split('\n')
    os.chdir(pwd)

    all_commits = get_allcommits(lines)

    for commit in reversed(all_commits):
        for x in commit.m_files:
            for y in x['trunk']:
                if tell_subarray_pos(sec,y['body']) != None:
                    print(u'' + bcolors.WARNING + u'latest modify by {} sha: {}'.format(commit.m_author ,commit.m_sha))
                    return
        pass
    pass

class commit_cls():
    def __init__(self,lines):
        self.m_lines = lines

        self.m_sha = commit_re.sub(r'\1',lines[0]).rstrip()
        self.m_author = commit_re.sub(r'\1',lines[1]).rstrip()
        self.m_date = date_re.sub(r'\1',lines[2]).rstrip()
        self.m_msg = lines[4].lstrip().rstrip()

        files = []
        self.m_files = files
        for i,line in enumerate(lines):
            if len(diff_file_re.findall(line)) == 1:
                file_name = diff_file_re.sub(r'\1',line).rstrip()
                if len(files) > 0:
                    files[-1]["end"] = i - 1
                files.append({"file_name":file_name,"start":i})

        if len(files) < 1:
            # print("no file diff find!",self.m_sha)
            return
        files[-1]["end"] = len(lines) - 1

        for x in files:
            st = x["start"]
            ed = x["end"]
            x["trunk"] = []

            file_lines = lines[st:ed+1]
            file_lines_len = len(file_lines)
            for i,line in enumerate(file_lines):
                if len(trunk_re.findall(line)) > 0:
                    mod_line = int( trunk_re.sub(r'\1',line).rstrip())
                    if len(x["trunk"]) > 0:
                        x["trunk"][-1]["tail"] = [file_lines[i-3],file_lines[i-2],file_lines[i-1]]
                        x["trunk"][-1]["body"] = file_lines[x["trunk"][-1]["body_st"]+1:i-2]
                    t_head = []

                    if mod_line > 1:
                        t_head.append(file_lines[i+1])
                    if mod_line > 2:
                        t_head.append(file_lines[i+2])
                    if mod_line > 3:
                        t_head.append(file_lines[i+3])
                    t = {
                        "head": t_head,
                        "body_st" : i + len(t_head),
                        "trunk_name": trunk_re2.sub(r'\1',line)
                    }
                    x["trunk"].append(t)
                if i == file_lines_len - 1:
                    if len(x["trunk"]) > 0:
                        x["trunk"][-1]["tail"] = [file_lines[i-2],file_lines[i-1],file_lines[i]]
                        x["trunk"][-1]["body"] = file_lines[x["trunk"][-1]["body_st"]+1:i-2]
                    else:
                        a = 100

        a = 100

    def locate_trunk_infile(self,trunk,file_lines):
        pass
        head = trunk["head"]
        tail = trunk["tail"]
        body = trunk["body"]

        body_origin = self.origin_body_(body)
        body_start = tell_subarray_pos(body_origin,file_lines)
        if body_start != None:
            return [[body_start,body_start+len(body_origin)],None]

        head_start = tell_subarray_pos(head,file_lines)
        if head_start == None:
            return [None,head]

        off_index = head_start + len(head) + max(0,trunk["body_len"]) - 1
        tail_start = tell_subarray_pos(tail,file_lines,off_index)
        if tail_start == None:
            return [None,tail]
        
        return [[head_start+len(head),tail_start],None]
        a = 100

    def revert_body_(self,body):
        res = []
        for x in body:
            if x[0] == '-':
                res.append(x[1:])
        return res

    def origin_body_(self,body):
        res = []
        for x in body:
            if x[0] == '+':
                res.append(x[1:])
        return res
    
    def revert(self,client_dir):
        if len(self.m_files) < 1:
            return
        for file in self.m_files:
            dst_file = client_dir + "/" + file["file_name"]
            lines = None
            if os.path.exists(dst_file):
                f = codecs.open(dst_file, 'r', 'utf-8')
                lines = f.readlines()
                f.close()

            if lines:
                trunks = file["trunk"]
                for ii,t in enumerate(trunks):
                    body = t["body"]
                    sig_ct = 0
                    for i, l in enumerate(body):
                        sig_ct = sig_ct + (-1 if l[0]=='-1' else 1)
                    t["body_len"] = sig_ct

                    locate_info = self.locate_trunk_infile(t,lines)
                    body_range = locate_info[0]
                    if not body_range:
                        err_sec = locate_info[1]
                        print(u'' + bcolors.FAIL + u'can not revert trunk {} in {} with commit by {} sha: {}'.format(t["trunk_name"],file["file_name"],self.m_author,self.m_sha))
                        tell_trunk_modify_latest(dst_file,t,self.origin_body_(t["body"]),self.m_sha)
                    else:
                        revert_body = self.revert_body_(body)
                        lines[body_range[0]:body_range[1]] = revert_body
                        print(u'' + bcolors.OKGREEN + u'revert trunk {} in {} by sha: {} successful!'.format(t["trunk_name"],file["file_name"],self.m_sha))
                
                f = codecs.open(dst_file, 'w', 'utf-8')
                lines = f.writelines(lines)
                f.close()
                a = 100
                
            else:
                print(u"" + bcolors.WARNING + u"file does not exist. in {} with commit by {} sha: {}".format(file["file_name"],self.m_author,self.m_sha))

def main():
    file_path = "/Users/mac/Documents/my_projects/cok/client/5_1.txt"
    client_dir = os.getenv('ClientDir')
    f = codecs.open(file_path, 'r', 'utf-8')

    # lines = f.readlines()
    content = f.read()
    res = FileName_re.findall(content)
    r = []
    for x in res:
        if not x in r:
            r.append(x)

    f.seek(0)
    lines = f.readlines()
    f.close()

    # reverts = []
    # picked_commit = []
    # for i,line in enumerate( lines ):
    #     if len(commit_re.findall(line)) == 1 and len(revert_commit_re.findall(line)) == 0:
    #         commit_sha = commit_re.sub(r'\1',line).rstrip()
    #         if len(revert_commit_re.findall(lines[i+5])) == 1:
    #             reverts.append(commit_sha)
    #             picked_commit[-1][2] = i - 1
    #         else:
    #             if not commit_sha in reverts:
    #                 if len(picked_commit) > 0 and not picked_commit[-1][2]:
    #                     picked_commit[-1][2] = i - 1
    #                 picked_commit.append([commit_sha,i,None])
    # picked_commit[-1][2] = len( lines ) -1

    # all_commits = []
    # for x in picked_commit:
    #     tl = lines[x[1]:x[2]]
    #     all_commits.append(commit_cls(tl))
    
    all_commits = get_allcommits(lines)
    for i in range(10):
        all_commits[i].revert(client_dir)

if __name__ == "__main__":
    main()