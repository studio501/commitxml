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

wd_re = re.compile(r'\w')

Only_Error_Log = False

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
Can_Revert_Dirs = ['cocos2d/cocos/editor-support/spine','cocos2d/cocos/renderer','cocos2d/cocos/newrender']

def count_wd(str1):
    return len(wd_re.findall(str1))

def substr_left(sub,origin_str):
    res = origin_str.find(sub)
    if res > -1:
        r = origin_str[res+len(sub):]
        return r
    return origin_str

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
    if len(picked_commit) == 0:
        a = 100
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
                    if do_find:
                        pass
                except Exception as e:
                    print(e)
                    pass
                if not do_find:
                    if j > 0:
                        # print(u'' + bcolors.WARNING + u'line {} modify by other'.format(sub2[j]))
                        if j > 5:
                            i += j
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

    if out_put == '':
        print(u'' + bcolors.FAIL + u'can not find modify after sha {} in trunk {} file {}'.format(startsha,trunk["trunk_name"],file_path))
        return

    all_commits = get_allcommits(lines)

    for commit in reversed(all_commits):
        for x in commit.m_files:
            for y in x['trunk']:
                revert_body = commit.revert_body_(y['body'])
                if tell_subarray_pos(revert_body,sec) != None:
                    print(u'' + bcolors.WARNING + u'latest modify by {} sha: {} trunk: {}'.format(commit.m_author ,commit.m_sha, y["trunk_name"]))
                    return
        pass
    pass

class commit_cls():
    def __init__(self,lines):
        self.m_lines = lines
        # diff --git a/cocos2d/cocos/renderer/ccShader_PositionETC1APremultiplyAlpha.frag b/cocos2d/cocos/renderer/ccShader_PositionETC1APremultiplyAlpha.frag
        # new file mode 100644
        # index 00000000000..dbcdb86ffe2
        # --- /dev/null
        # +++ b/cocos2d/cocos/renderer/ccShader_PositionETC1APremultiplyAlpha.frag
        # @@ -0,0 +1,14 @@

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
                
                fileobj = {"file_name":file_name,"start":i}
                
                if lines[i+1].count('new file mode') == 1:
                    fileobj["newfile"] = True
                elif lines[i+1].count('deleted file mode') == 1:
                    del_contents = []
                    for j in lines[i+6:]:
                        del_contents.append(j[1:])
                    fileobj["deletedfile"] = {"content":del_contents}
                elif lines[i+1].count('similarity index') == 1:
                    fileobj["renameFlag"] = {"from":substr_left('rename from ',lines[i+2]).rstrip(),"to":substr_left('rename to ',lines[i+3]).rstrip()}

                files.append(fileobj)

        if len(files) < 1:
            # print("no file diff find!",self.m_sha)
            return
        files[-1]["end"] = len(lines) - 1

        for x in files:
            if self.file_not_modify_directly(x):
                pass
            else:
                st = x["start"]
                ed = x["end"]
                x["trunk"] = []

                file_lines = lines[st:ed+1]
                file_lines_len = len(file_lines)
                for i,line in enumerate(file_lines):
                    if len(trunk_re.findall(line)) > 0:
                        # if '@@ -85,4 +85,102 @@' in trunk_re2.sub(r'\1',line):
                        #     pass
                        mod_line = int( trunk_re.sub(r'\1',line).rstrip())
                        if len(x["trunk"]) > 0:
                            x["trunk"][-1]["tail"] = [file_lines[i-3],file_lines[i-2],file_lines[i-1]]
                            x["trunk"][-1]["body"] = file_lines[x["trunk"][-1]["body_st"]+1:i-len(x["trunk"][-1]["tail"])]
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
                            tail = []
                            for tail_i in range(3):
                                if file_lines[i- tail_i][0] == '+' or file_lines[i- tail_i][0] == '-':
                                    break
                                else:
                                    tail.insert(0, file_lines[i- tail_i])

                            x["trunk"][-1]["tail"] = tail
                            x["trunk"][-1]["body"] = file_lines[x["trunk"][-1]["body_st"]+1:i-len(tail) + 1]
                        else:
                            a = 100

        a = 100

    def file_not_modify_directly(self,fileobj):
        return (fileobj.has_key("newfile") and fileobj["newfile"]) or (fileobj.has_key("deletedfile") and fileobj["deletedfile"]) or (fileobj.has_key("renameFlag") and fileobj["renameFlag"])

    def locate_trunk_infile(self,trunk,file_lines):
        pass
        head = trunk["head"]
        tail = trunk["tail"]
        body = trunk["body"]

        body_origin = self.origin_body_(body)
        trunk_origin = []
        trunk_origin.extend(head)
        trunk_origin.extend(body_origin)
        trunk_origin.extend(tail)

        # make_new_line =  'No newline at end of file' in body[1]

        body_start = tell_subarray_pos(trunk_origin,file_lines)
        if body_start != None:
            body_start = body_start + len(head)
            trim_end = 0
            # print('cp1',body_origin[-1])
            # print('cp2',file_lines[body_start+len(body_origin)-1])
            if len(body_origin) > 0 and body_origin[-1] != file_lines[body_start+len(body_origin)-1]:
                trim_end = -1
            return [[body_start,body_start+len(body_origin) + trim_end],None]

        too_simple = True
        if len(body_origin) < 3:
            for bl in body_origin:
                if count_wd(bl) > 5:
                    too_simple = False
                    break
        else:
            too_simple = False
        
        if too_simple:
            pass
        else:
            body_start = tell_subarray_pos(body_origin,file_lines)
            if body_start != None:
                trim_end = 0
                if body_origin[-1] != file_lines[body_start+len(body_origin)-1]:
                    trim_end = -1
                return [[body_start,body_start+len(body_origin) + trim_end],None]
            else:
                return [None,body_origin]

        # head_start = tell_subarray_pos(head,file_lines)
        # if head_start == None:
        #     return [None,head]

        # off_index = head_start + len(head) + max(0,trunk["body_len"]) - 1
        # tail_start = tell_subarray_pos(tail,file_lines,off_index)
        # if tail_start == None:
        #     return [None,tail]
        
        # return [[head_start+len(head),tail_start],None]

    def revert_body_(self,body):
        res = []
        for x in body:
            if x[0] == '\\':
                continue
            if x[0] != '+':
                if x[0] == '-':
                    res.append(x[1:])
                else:
                    res.append(x[1:])
        return res

    def origin_body_(self,body):
        res = []
        for x in body:
            if x[0] == '\\':
                continue
            if x[0] != '-':
                if x[0] == '+':
                    res.append(x[1:])
                else:
                    res.append(x[1:])
        return res
    
    def revert(self,client_dir):
        if len(self.m_files) < 1:
            return
        for file in self.m_files:
            dst_file = client_dir + "/" + file["file_name"]
            # if file["file_name"] != "IF/Classes/view/Widget/IFFieldMonsterNode.cpp":
            #     continue
            if self.file_not_modify_directly(file):
                if (file.has_key("newfile") and file["newfile"]):
                    if os.path.exists(dst_file):
                        os.remove(dst_file)
                        if not Only_Error_Log:
                            print(u'' + bcolors.OKGREEN + u'delete file {} commit by {} sha: {} successful!'.format(file["file_name"],self.m_author,self.m_sha))
                    else:
                        if not Only_Error_Log:
                            print(u'' + bcolors.WARNING + u'try delete file {} commit by {} sha: {} but it already gone'.format(file["file_name"],self.m_author,self.m_sha))
                elif (file.has_key("deletedfile") and file["deletedfile"]):
                    base_dir = os.path.dirname(dst_file)
                    if not os.path.exists(base_dir):
                        os.makedirs(base_dir)
                        f = codecs.open(dst_file, 'w', 'utf-8')
                        f.writelines(file["deletedfile"]["content"])
                        f.close()
                        if not Only_Error_Log:
                            print(u'' + bcolors.OKGREEN + u'restore file {} commit by {} sha: {} successful!'.format(file["file_name"],self.m_author,self.m_sha))
                elif (file.has_key("renameFlag") and file["renameFlag"]):
                    shutil.move(client_dir + "/" + file["renameFlag"]["to"],client_dir + "/" + file["renameFlag"]["from"])
                    if not Only_Error_Log:
                        print(u'' + bcolors.OKGREEN + u'rename file {} commit by {} sha: {} successful!'.format(file["file_name"],self.m_author,self.m_sha))
            else:
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
                                sig_ct = sig_ct + (0 if l[0]=='-' else 1)
                            t["body_len"] = sig_ct

                            # if '@@ -142,7 +142,12 @@' in t['trunk_name']:
                            #     pass

                            locate_info = self.locate_trunk_infile(t,lines)
                            body_range = locate_info[0]
                            if not body_range:
                                err_sec = locate_info[1]
                                print(u'' + bcolors.FAIL + u'can not revert trunk {} in {} with commit by {} sha: {}'.format(t["trunk_name"],file["file_name"],self.m_author,self.m_sha))
                                tell_trunk_modify_latest(dst_file,t,self.origin_body_(t["body"]),self.m_sha)
                            else:
                                revert_body = self.revert_body_(body)
                                lines[body_range[0]:body_range[1]] = revert_body
                                if not Only_Error_Log:
                                    print(u'' + bcolors.OKGREEN + u'revert trunk {} in {} by sha: {} successful!'.format(t["trunk_name"],file["file_name"],self.m_sha))
                        
                        f = codecs.open(dst_file, 'w', 'utf-8')
                        lines = f.writelines(lines)
                        f.close()
                        a = 100
                else:
                    print(u"" + bcolors.WARNING + u"file does not exist. in {} with commit by {} sha: {}".format(file["file_name"],self.m_author,self.m_sha))

def check_is_can_revert(commit):
    pass
    for file in commit.m_files:
        for d in Can_Revert_Dirs:
            if d in file["file_name"]:
                return True
    return False

def get_prev_rec():
    file_path = "revert_git_rec__"
    with open(file_path,'r') as f:
        try:
            number = f.readlines()[0].rstrip()
            return number
        except Exception as e:
            return 0

def save_rec(number):
    file_path = "revert_git_rec__"
    with open(file_path,'w') as f:
        f.write(str( number))

def get_idex_ofcommit(all_commits,sha):
    for i,x in enumerate(all_commits):
        if x.m_sha == sha:
            return i
    return None

def force_revert(sha,trunk_name):
    client_dir = os.getenv('ClientDir')
    file_path = os.path.join(client_dir,'5_1.txt')
    f = codecs.open(file_path, 'r', 'utf-8')
    lines = f.readlines()
    f.close()

    all_commits = get_allcommits(lines)

    commit = None
    for c in all_commits:
        if c.m_sha == sha:
            commit = c
            break

    files = commit.m_files

    do_revert = False
    for file in files:
        if not file.has_key("trunk"):
            continue
        trunks = file["trunk"]
        for ii,t in enumerate(trunks):
            if trunk_name in t['trunk_name']:
                body = t["body"]
                result = []
                result.extend(t['head'])
                r_body = commit.revert_body_(body)
                result.extend(r_body)
                result.extend(t['tail'])
                dst_file = "force_trunk"
                f = codecs.open(dst_file,"w","utf-8")
                f.writelines(result)

                print(u'force revert ', sha,'trunk',trunk_name,'successful','open',dst_file,'to check')
                do_revert = True
                break
        if do_revert:
            break
def main():
    client_dir = os.getenv('ClientDir')
    file_path = os.path.join(client_dir,'5_1.txt')
    f = codecs.open(file_path, 'r', 'utf-8')

    prev_revert_rec = get_prev_rec()

    content = f.read()
    res = FileName_re.findall(content)
    r = []
    for x in res:
        if not x in r:
            r.append(x)

    f.seek(0)
    lines = f.readlines()
    f.close()

    all_commits = get_allcommits(lines)
    all_commits_len = len(all_commits)
    # start_revert_index = min(prev_revert_rec,all_commits_len-1)
    start_revert_index = get_idex_ofcommit(all_commits,prev_revert_rec)
    print('all commit num is', all_commits_len)
    print('now start revert from',all_commits[start_revert_index].m_sha)

    revert_step = 10
    # revert_to_sha = "49bb41bd50cabdad97524ff7dfbfa17844d408cc"
    revert_to_sha = "62ff3c279cf7f0cff36447ab7c76f25744c356c8"
    revert_to_idx = get_idex_ofcommit(all_commits,revert_to_sha)
    if revert_to_idx:
        revert_step = revert_to_idx - start_revert_index

    assert(revert_to_sha == all_commits[start_revert_index+revert_step].m_sha)
    
    for commit in all_commits[start_revert_index:start_revert_index+revert_step]:
        # if check_is_can_revert(commit) and commit.m_sha == "62ff3c279cf7f0cff36447ab7c76f25744c356c8":
        # if True or check_is_can_revert(commit):
        if check_is_can_revert(commit):
            if not Only_Error_Log:
                print(u''+bcolors.HEADER+u'======= Start Revert =======')
            commit.revert(client_dir)

    print('end revert till',all_commits[start_revert_index+revert_step].m_sha)
    save_rec(revert_to_sha)

if __name__ == "__main__":
    if len(sys.argv) == 3:
        force_revert(sys.argv[1],sys.argv[2])
    else:
        main()