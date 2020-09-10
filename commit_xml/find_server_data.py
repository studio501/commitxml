import os, sys, shutil, re
import subprocess, json

get1_re = re.compile(r'ftc.ManagerData.get1\("(.*?)"\)')
get2_re = re.compile(r'ftc.ManagerData.get2(Object)?\("(\w+)".*?\)')

def is_wanted_object(symbol_name,sb_object):
    if type(sb_object) is dict:
        if sb_object.get("type") == "MemberExpression":
            if sb_object.get("object") and sb_object.get("property"):
                if sb_object["object"]["type"] == "Identifier" and sb_object["object"]["name"] == symbol_name:
                    return sb_object["property"]["name"]
    return None

def find_mem_object(symbol_name,mem_map,script_json):
    if type(script_json) is dict:
        res = is_wanted_object(symbol_name,script_json)
        if res:
            if not res in mem_map:
                mem_map.append(res)
        else:
            for x in script_json:
                if type(script_json[x]) is dict:
                    res = is_wanted_object(symbol_name,script_json[x])
                    if res:
                        if not res in mem_map:
                            mem_map.append(res)
                    else:
                        find_mem_object(symbol_name,mem_map,script_json[x])
                elif type(script_json[x]) is list:
                    for y in script_json[x]:
                        find_mem_object(symbol_name,mem_map,y)

def fix_bracer(in_str):
    bracer = []
    res = []
    for i,ch in enumerate(in_str):
        res.append(ch)
        if ch == '(' or ch == '{' or ch  == '[':
            bracer.append(ch)
        elif ch == ')' or ch == '}' or ch  == ']':
            if len(bracer) == 0:
                res.pop()
                continue
            if bracer[-1] == '(' and ch == ')':
                bracer.pop()
                continue

            if bracer[-1] == '{' and ch == '}':
                bracer.pop()
                continue
            
            if bracer[-1] == '[' and ch == ']':
                bracer.pop()
                continue
            res.pop()
    return ''.join(res)

def find_get1_data(contents,data1):
    for match in re.finditer(get1_re, contents):
        sStart = match.start()
        sEnd = match.end()
        sGroup = match.group()
        t_key = match.group(1)
        data1[t_key] = data1.get(t_key) if data1.get(t_key) else {}
        key_name_arr = []
        if contents[sEnd] == ".":
            for i in range(52):
                tv = contents[sEnd+1+i]
                if len(re.findall('\w',tv)) == 0:
                    break
                else:
                    key_name_arr.append(tv)
            data1[t_key][''.join(key_name_arr)] = ""
        elif contents[sEnd] == "[":
            for i in range(52):
                tv = contents[sEnd+2+i]
                if len(re.findall('\w',tv)) == 0:
                    break
                else:
                    key_name_arr.append(tv)
            data1[t_key][''.join(key_name_arr)] = ""
        else:
            symbol_name = ""
            equal_idx = None
            s_flag = None
            for i in range(52):
                tidx = sStart-1-i
                tv = contents[tidx]
                if tv == '=':
                    equal_idx = tidx
                elif equal_idx and len(re.findall('\w',tv)) == 1:
                    s_flag = tidx
                elif equal_idx and s_flag and len(re.findall('\w',tv)) == 0:
                    break
            # print("temp variable name {}".format(contents[s_flag:equal_idx]))
            symbol_name = contents[s_flag:equal_idx]
            if equal_idx and s_flag:
                brace_arr = []
                brace_i = 0
                t_i = sEnd
                while True:
                    brace_i += 1
                    t_i = sEnd + brace_i
                    if contents[t_i] == '{':
                        brace_arr.append(contents[t_i])
                    elif contents[t_i] == '}':
                        if len(brace_arr) == 0:
                            break
                        else:
                            brace_arr.pop()
                script_str = contents[sStart:t_i]
                script_str = fix_bracer(script_str)
                script_str = 'function wrap(){{{}}}'.format(script_str)
                try:
                    script_json_str = subprocess.check_output(['node','jsgrama.js',script_str])
                except Exception as e:
                    pass
                script_json = json.loads(script_json_str)
                mem_map = []
                find_mem_object(symbol_name,mem_map,script_json)
                for mm in mem_map:
                    data1[t_key][mm] = ""
            pass


def find_get2_data(contents,data1):
    for match in re.finditer(get2_re, contents):
        sStart = match.start()
        sEnd = match.end()
        sGroup = match.group()
        t_key = match.group(2)
        data1[t_key] = data1.get(t_key) if data1.get(t_key) else {
            '0': {"id":0}
        }
        key_name_arr = []

def main():
    if len(sys.argv) == 2: #gen ftc.ManagerData only use for 三国吞噬无界
        with open(sys.argv[1],"r") as f:
            data1 = {}
            data2 = {}
            _data2Id = {}
            _dataKeys = {}
            contents = f.read()
            
            find_get1_data(contents,data1)
            find_get2_data(contents,data2)

            print("data1,,,")
            print(json.dumps(data1))
            print("data2,,,")
            print(json.dumps(data2))


if __name__ == "__main__":
    main()
