Only_Error_Log = False

                    if do_find:
                        pass
                    if j > 0:
                        # print(u'' + bcolors.WARNING + u'line {} modify by other'.format(sub2[j]))
                        if j > 5:
                            i += j
                revert_body = commit.revert_body_(y['body'])
                if tell_subarray_pos(revert_body,sec) != None:
                    print(u'' + bcolors.WARNING + u'latest modify by {} sha: {} trunk: {}'.format(commit.m_author ,commit.m_sha, y["trunk_name"]))
                        # if '@@ -85,4 +85,102 @@' in trunk_re2.sub(r'\1',line):
                        #     pass
                            x["trunk"][-1]["body"] = file_lines[x["trunk"][-1]["body_st"]+1:i-len(x["trunk"][-1]["tail"])]
                            tail = []
                            for tail_i in range(3):
                                if file_lines[i- tail_i][0] == '+' or file_lines[i- tail_i][0] == '-':
                                    break
                                else:
                                    tail.insert(0, file_lines[i- tail_i])

                            x["trunk"][-1]["tail"] = tail
                            x["trunk"][-1]["body"] = file_lines[x["trunk"][-1]["body_st"]+1:i-len(tail) + 1]
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
            if body_origin[-1] != file_lines[body_start+len(body_origin)-1]:
                trim_end = -1
            return [[body_start,body_start+len(body_origin) + trim_end],None]

        if len(body_origin) < 3:
            for bl in body_origin:
                if count_wd(bl) > 5:
                    too_simple = False
                    break
        else:
            too_simple = False
        
        if too_simple:
                trim_end = 0
                if body_origin[-1] != file_lines[body_start+len(body_origin)-1]:
                    trim_end = -1
                return [[body_start,body_start+len(body_origin) + trim_end],None]
        # head_start = tell_subarray_pos(head,file_lines)
        # if head_start == None:
        #     return [None,head]
        # off_index = head_start + len(head) + max(0,trunk["body_len"]) - 1
        # tail_start = tell_subarray_pos(tail,file_lines,off_index)
        # if tail_start == None:
        #     return [None,tail]
        # return [[head_start+len(head),tail_start],None]
                    res.append(x[1:])
                    res.append(x[1:])
            # if file["file_name"] != "IF/Classes/view/Widget/IFFieldMonsterNode.cpp":
            #     continue
                        if not Only_Error_Log:
                            print(u'' + bcolors.OKGREEN + u'delete file {} commit by {} sha: {} successful!'.format(file["file_name"],self.m_author,self.m_sha))
                        if not Only_Error_Log:
                            print(u'' + bcolors.WARNING + u'try delete file {} commit by {} sha: {} but it already gone'.format(file["file_name"],self.m_author,self.m_sha))
                        if not Only_Error_Log:
                            print(u'' + bcolors.OKGREEN + u'restore file {} commit by {} sha: {} successful!'.format(file["file_name"],self.m_author,self.m_sha))
                    if not Only_Error_Log:
                        print(u'' + bcolors.OKGREEN + u'rename file {} commit by {} sha: {} successful!'.format(file["file_name"],self.m_author,self.m_sha))
                            # if '@@ -142,7 +142,12 @@' in t['trunk_name']:
                            #     pass

                                if not Only_Error_Log:
                                    print(u'' + bcolors.OKGREEN + u'revert trunk {} in {} by sha: {} successful!'.format(t["trunk_name"],file["file_name"],self.m_sha))
def get_prev_rec():
    file_path = "/Users/mac/Documents/my_projects/local_project/opengl_st/commit_xml/revert_git_rec__"
    with open(file_path,'r') as f:
        try:
            number = f.readlines()[0].rstrip()
            return number
        except Exception as e:
            return 0

def save_rec(number):
    file_path = "/Users/mac/Documents/my_projects/local_project/opengl_st/commit_xml/revert_git_rec__"
    with open(file_path,'w') as f:
        f.write(str( number))

def get_idex_ofcommit(all_commits,sha):
    for i,x in enumerate(all_commits):
        if x.m_sha == sha:
            return i
    return None

def force_revert(sha,trunk_name):
    file_path = "/Users/mac/Documents/my_projects/cok/client/5_1.txt"
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
    prev_revert_rec = get_prev_rec()

    all_commits_len = len(all_commits)
    # start_revert_index = min(prev_revert_rec,all_commits_len-1)
    start_revert_index = get_idex_ofcommit(all_commits,prev_revert_rec)
    print('all commit num is', all_commits_len)
    print('now start revert from',all_commits[start_revert_index].m_sha)

    revert_step = 10
    # revert_to_sha = "49bb41bd50cabdad97524ff7dfbfa17844d408cc"
    revert_to_sha = "1d9a4f0779e7a12553dedb31af4e4fc5f384605e"
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
    print('end revert till',all_commits[start_revert_index+revert_step].m_sha)
    save_rec(revert_to_sha)

    if len(sys.argv) == 3:
        force_revert(sys.argv[1],sys.argv[2])
    else:
        main()