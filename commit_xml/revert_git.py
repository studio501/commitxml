# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,shutil,re,codecs

FileName_re = re.compile(r'--- a(.*)')

commit_re = re.compile(r'commit ([\w]{40})')
revert_commit_re = re.compile(r'This reverts commit ([\w]{40})')
author_re = re.compile(r'Author:\s+(.*?)\s+')
date_re = re.compile(r'Date:   (.*?)')
diff_file_re = re.compile(r'diff --git a/(.*) b/.*')
trunk_re = re.compile(r'@@ -(\d+),.* @@\s*(.*)?')

add_line_re = re.compile(r'$\+\s+.*')
del_line_re = re.compile(r'$\-\s+.*')

class commit_cls():
    def __init__(self,lines):
        self.m_lines = lines

        self.m_sha = commit_re.sub(r'\1',lines[0]).rstrip()
        self.m_author = commit_re.sub(r'\1',lines[1]).rstrip()
        self.m_date = date_re.sub(r'\1',lines[2]).rstrip()

        files = []
        self.m_files = files
        for i,line in enumerate(lines):
            if len(diff_file_re.findall(line)) == 1:
                file_name = diff_file_re.sub(r'\1',line).rstrip()
                if len(files) > 0:
                    files[-1]["end"] = i - 1
                files.append({"file_name":file_name,"start":i})

        if len(files) < 1:
            print("no file diff find!",self.m_sha)
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
                        "body_st" : i + len(t_head)
                    }
                    x["trunk"].append(t)
                if i == file_lines_len - 1:
                    if len(x["trunk"]) > 0:
                        x["trunk"][-1]["tail"] = [file_lines[i-2],file_lines[i-1],file_lines[i]]
                        x["trunk"][-1]["body"] = file_lines[x["trunk"][-1]["body_st"]+1:i-2]
                    else:
                        a = 100

        a = 100

    def tell_subarray_pos(self,sub,src):
        sub_len = len(sub)
        if sub_len == 0:
            return 0
        
        if sub_len == 1 and sub[0] == '':
            return 0
        
        sub_len = len(sub)
        sub2 = []
        for x in sub:
            sub2.append(x.lstrip().rstrip())
        
        for i,x in enumerate( src ):
            do_find = True
            for j in range(sub_len):
                do_find = do_find and sub2[j] in src[i+j]
                if not do_find:
                    break
            if do_find:
                return i
        return None


    def locate_trunk_infile(self,trunk,file_lines):
        pass
        head = trunk["head"]
        tail = trunk["tail"]

        head_start = self.tell_subarray_pos(head,file_lines)
        if head_start == None:
            print('local trunk head error',head)
            return

        tail_start = self.tell_subarray_pos(tail,file_lines)
        if tail_start == None:
            print('local trunk tail error',tail)
            return
        
        a = 100


    
    def revert(self,client_dir):
        if len(self.m_files) < 1:
            return
        for file in self.m_files:
            dst_file = client_dir + "/" + file["file_name"]
            if os.path.exists(dst_file):
                pass
                f = codecs.open(dst_file, 'r', 'utf-8')
                lines = f.readlines()
                f.close()

                trunks = file["trunk"]
                for t in trunks:
                    body = t["body"]
                    modify_group = []
                    last_sig = None
                    for i, l in enumerate(body):
                        if len(modify_group) == 0:
                            modify_group.append({"sig":l[0],"lines":[]})
                        
                        last_group = modify_group[-1]
                        if l[0] == last_group["sig"]:
                            last_group["lines"].append(l[1:])
                        else:
                            modify_group.append({"sig":l[0],"lines":[l[1:]]})

                    
                    self.locate_trunk_infile(t,lines)

                
            else:
                print("file does not exist. ",dst_file)

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
    
    all_commits[0].revert(client_dir)

if __name__ == "__main__":
    main()