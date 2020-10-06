wd_re = re.compile(r'\w')

Can_Revert_Dirs = ['cocos2d/cocos/editor-support/spine','cocos2d/cocos/renderer','cocos2d/cocos/newrender']

def count_wd(str1):
    return len(wd_re.findall(str1))

def substr_left(sub,origin_str):
    res = origin_str.find(sub)
    if res > -1:
        r = origin_str[res+len(sub):]
        return r
    return origin_str
    if len(picked_commit) == 0:
        a = 100
    if out_put == '':
        print(u'' + bcolors.FAIL + u'can not find modify after sha {} in trunk {} file {}'.format(startsha,trunk["trunk_name"],file_path))
        return

        # diff --git a/cocos2d/cocos/renderer/ccShader_PositionETC1APremultiplyAlpha.frag b/cocos2d/cocos/renderer/ccShader_PositionETC1APremultiplyAlpha.frag
        # new file mode 100644
        # index 00000000000..dbcdb86ffe2
        # --- /dev/null
        # +++ b/cocos2d/cocos/renderer/ccShader_PositionETC1APremultiplyAlpha.frag
        # @@ -0,0 +1,14 @@
                
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
    def file_not_modify_directly(self,fileobj):
        return (fileobj.has_key("newfile") and fileobj["newfile"]) or (fileobj.has_key("deletedfile") and fileobj["deletedfile"]) or (fileobj.has_key("renameFlag") and fileobj["renameFlag"])

        too_simple = True
        for bl in body_origin:
            if count_wd(bl) >5:
                too_simple = False
                break
        if not too_simple:
            pass
        else:
            body_start = tell_subarray_pos(body_origin,file_lines)
            if body_start != None:
                return [[body_start,body_start+len(body_origin)],None]
            else:
                return [None,body_origin]
            if x[0] == '\\':
                continue
            if x[0] != '+':
                if x[0] == '-':
                    res.append(x[1:])
                else:
                    res.append(x)
            if x[0] == '\\':
                continue
            if x[0] != '-':
                if x[0] == '+':
                    res.append(x[1:])
                else:
                    res.append(x)
            if file["file_name"] != "cocos2d/cocos/2d/CCNode.h":
                continue
            if self.file_not_modify_directly(file):
                if (file.has_key("newfile") and file["newfile"]):
                    if os.path.exists(dst_file):
                        os.remove(dst_file)
                        print(u'' + bcolors.OKGREEN + u'delete file {} commit by {} sha: {} successful!'.format(file["file_name"],self.m_author,self.m_sha))
                        print(u'' + bcolors.WARNING + u'try delete file {} commit by {} sha: {} but it already gone'.format(file["file_name"],self.m_author,self.m_sha))
                elif (file.has_key("deletedfile") and file["deletedfile"]):
                    base_dir = os.path.dirname(dst_file)
                    if not os.path.exists(base_dir):
                        os.makedirs(base_dir)
                        f = codecs.open(dst_file, 'w', 'utf-8')
                        f.writelines(file["deletedfile"]["content"])
                        f.close()
                        print(u'' + bcolors.OKGREEN + u'restore file {} commit by {} sha: {} successful!'.format(file["file_name"],self.m_author,self.m_sha))
                elif (file.has_key("renameFlag") and file["renameFlag"]):
                    shutil.move(client_dir + "/" + file["renameFlag"]["to"],client_dir + "/" + file["renameFlag"]["from"])
                    print(u'' + bcolors.OKGREEN + u'rename file {} commit by {} sha: {} successful!'.format(file["file_name"],self.m_author,self.m_sha))
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

def check_is_can_revert(commit):
    pass
    for file in commit.m_files:
        for d in Can_Revert_Dirs:
            if d in file["file_name"]:
                return True
    return False
    
    # for i in range(20):
    #     commit = all_commits[i]
    for commit in all_commits:
        if check_is_can_revert(commit) and commit.m_sha == "62ff3c279cf7f0cff36447ab7c76f25744c356c8":
            print(u''+bcolors.HEADER+u'======= Start Revert =======')
            commit.revert(client_dir)