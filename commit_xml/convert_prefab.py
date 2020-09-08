# -*- coding: utf-8 -*
import os, sys, shutil, re
import subprocess, json
import my_input, demjson

type_re = re.compile(r'"__type__":\s*"(.*?)"')
ref_re = re.compile(r"cc._RF.push\(module,\s*'(.*?)',\s*.*?\);")
spriteframe_re = re.compile(r'"_spriteFrame":\s*\{"__uuid__":\s*"(.*?)"\}')
normalframe_re = re.compile(r'normalSprite"\s*:\s*\{"__uuid__"\s*:\s*"(.*?)"\}')
pressframe_re = re.compile(r'pressedSprite"\s*:\s*\{"__uuid__"\s*:\s*"(.*?)"\}')
disabledframe_re = re.compile(r'disabledSprite"\s*:\s*\{"__uuid__"\s*:\s*"(.*?)"\}')
hoverframe_re = re.compile(r'hoverSprite"\s*:\s*\{"__uuid__"\s*:\s*"(.*?)"\}')
prefab_re = re.compile(r'"_prefab":.*?,\s*"__type__":\s*"cc.PrefabInfo",\s*"asset":\s*\{"__uuid__":\s*"(.*?)"\}')
matrial_re = re.compile(r'"_materials":\s*(\[\{.*?\}\s*\])')
spine_re = re.compile(r'skeletonData"\s*:\s*\{"__uuid__"\s*:\s*"(.*?)"\}')

# only for sg
get1_re = re.compile(r'ftc.ManagerData.get1\("(.*?)"\)')


def file_without_extension(path):
    return os.path.splitext(os.path.basename(path))[0]


def file_extension(path):
    return os.path.splitext(path)[1]


def read_json_file(f):
    with open(f, 'r') as load_f:
        load_dict = json.load(load_f, "utf-8")
        return load_dict


# 8f59a cVi6R OOIiC ua1h+ VaI
# 2577b lRG3R GP4vW PJu/n JOQ
def find_all_jscomp(prefabfile):
    with open(prefabfile, "r") as f:
        contents = f.read()
        all_res = type_re.findall(contents)
        res = []
        for x in all_res:
            if len(x) > 22 and (not x in res):
                res.append(x)
        return res

def find_uuid_byre(prefabfile,reg_re_arr=[spriteframe_re]):
    with open(prefabfile, "r") as f:
        contents = f.read()
        res = []
        for tre in reg_re_arr:
            all_res = tre.findall(contents)
            for x in all_res:
                if not x in res:
                    res.append(x)
        return res

def find_all_spriteframe(prefabfile):
    return find_uuid_byre(prefabfile,[spriteframe_re,normalframe_re,pressframe_re,disabledframe_re,hoverframe_re])

def find_all_prefab(prefabfile):
    return find_uuid_byre(prefabfile,[prefab_re])

def find_all_matrial(prefabfile):
    with open(prefabfile, "r") as f:
        contents = f.read()
        res = []
        all_res = matrial_re.findall(contents)
        for x in all_res:
            x_json = json.loads(x)
            for y in x_json:
                if not y["__uuid__"] in res:
                    res.append(y["__uuid__"])
        return res

def find_new_script(depend_js_readable, new_lib_dir):
    uuid_json = os.path.join(new_lib_dir, "uuid-to-mtime.json")
    uuid_data = read_json_file(uuid_json)
    if not uuid_data:
        return

    res = {}
    for x in uuid_data:
        t_data = uuid_data[x]
        sc0 = file_extension(t_data["relativePath"])
        sc = file_without_extension(t_data["relativePath"])
        if sc0 == ".js" and sc in depend_js_readable:

            fp = os.path.join(new_lib_dir, 'imports', x[:2], x + ".js")
            with open(fp, "r") as f:
                lines = f.readlines()
                uuid_str = ref_re.sub(r'\1', lines[1]).rstrip()
                res[sc] = uuid_str

    return res


def convert_js_bind(origin_prefab, jsmapfile, new_lib_dir, dst_dir,
                    replace_map):
    depend_js = find_all_jscomp(origin_prefab)
    js_map = read_json_file(jsmapfile)

    depend_js_readable = []
    oldjs = {}
    for x in depend_js:
        if js_map.get(x):
            depend_js_readable.append(js_map.get(x))
            oldjs[js_map.get(x)] = x
    if len(depend_js_readable) == 0:
        return
    print(u'prefab depen of', depend_js_readable)

    is_continue = my_input.my_input(u"是否替换(y/n)?") == 'y'
    if not is_continue:
        return

    new_js = find_new_script(depend_js_readable, new_lib_dir)

    for x in oldjs:
        replace_map[oldjs[x]] = new_js[x]


def my_index(arr, val):
    index_value = -1
    try:
        index_value = arr.index(val)
    except ValueError:
        pass

    return index_value


def is_valid_spriteAtlasFile(filename, uuid):
    json_data = read_json_file(filename)
    if not json_data:
        return False

    for i, x in enumerate(json_data):
        if type(x) is dict and x["__type__"] == "cc.SpriteAtlas":
            for y in x["_spriteFrames"]:
                td = x["_spriteFrames"][y]
                if td["__uuid__"] == uuid:
                    return [1, x["_name"], y]

    return False


def sf_uuid2_pngpath(uuid, t_data, all_res):
    # t_data = read_json_file(settingsfile)
    uuids = t_data["uuids"]
    if not uuids:
        return

    uuid_idx = my_index(uuids, uuid)
    if uuid_idx == -1:
        return
    uuid_idx_str = str(uuid_idx)

    ra = t_data["rawAssets"]
    rawAssets = [ra["assets"], ra["internal"]]

    find_png = None
    for x in rawAssets:
        for y in x:
            if y == uuid_idx_str:
                find_png = x[y][0]
                break
        if find_png:
            break
    if find_png:
        return [0, find_png]

    packedAssets = t_data["packedAssets"]
    old_import_dir = os.path.join(all_res, "import")
    for x in packedAssets:
        if (uuid_idx in packedAssets[x]):
            ts = os.path.join(old_import_dir, x + ".json")
            if os.path.exists(ts):
                valid_atlas = is_valid_spriteAtlasFile(ts, uuid)
                if valid_atlas:
                    return valid_atlas
    return [1,"image/default_sprite_splash","default_sprite_splash"]


def getUUidByRelativePath(new_uuid_json, filepath):
    for y in new_uuid_json:
        relativePath = new_uuid_json[y]["relativePath"]
        if filepath in relativePath:
            if file_without_extension(filepath) == file_without_extension(
                    relativePath):
                return y


def getSpriteFrameMap(pngUUid, sf_uuid, sourceDir):
    for f in os.listdir(sourceDir):
        sourceF = os.path.join(sourceDir, f)
        if os.path.isfile(sourceF):
            bf = os.path.basename(sourceF)
            if file_extension(sourceF) == ".json":
                js_data = read_json_file(sourceF)
                if type(js_data) is dict and js_data[
                        "__type__"] == "cc.SpriteFrame" and js_data.get(
                            "content") and type(js_data.get(
                                "content")) is dict and js_data.get(
                                    "content").get("texture") and js_data.get(
                                        "content").get("texture") == pngUUid:
                    if not sf_uuid.get(pngUUid):
                        sf_uuid[pngUUid] = []
                    sf_uuid[pngUUid].append([
                        js_data.get("content").get("name"),
                        file_without_extension(bf)
                    ])

        elif os.path.isdir(sourceF):
            getSpriteFrameMap(pngUUid, sf_uuid, sourceF)


def convert_srpitFrame_bind(origin_prefab, settingsfile, new_lib_dir, dst_dir,
                            all_res, replace_map):
    pass
    t_data = read_json_file(settingsfile)
    all_sfs = find_all_spriteframe(origin_prefab)
    map1 = {}
    for x in all_sfs:
        map1[x] = sf_uuid2_pngpath(x, t_data, all_res)

    new_uuid_json = read_json_file(
        os.path.join(new_lib_dir, "uuid-to-mtime.json"))
    sf_uuid = {}
    for x in map1:
        tm = map1[x]
        if not tm:
            print("cannot find res: {} ".format(x))
            continue
        pngName = None
        frameName = None
        if tm[0] == 0:
            pngName = tm[1]
            frameName = file_without_extension(tm[1])
        elif tm[0] == 1:
            plist = tm[1]
            frameName = tm[2]
            pngName = file_without_extension(plist) + ".png"
        pngUUid = getUUidByRelativePath(new_uuid_json, pngName)
        frame_map = sf_uuid.get(pngUUid)
        if not frame_map:
            getSpriteFrameMap(pngUUid, sf_uuid,
                              os.path.join(new_lib_dir, "imports"))
            frame_map = sf_uuid.get(pngUUid)
        for z in frame_map:
            if z[0] == frameName:
                replace_map[x] = z[1]
                break
        print("replace {} to {}  ( {} )".format( x,
                                           replace_map[x],tm[1] if tm[0] == 0 else tm[2] ))

def convert_prefab_bind(origin_prefab, settingsfile, new_lib_dir, dst_dir,
                            all_res, replace_map):
    pass
    t_data = read_json_file(settingsfile)
    all_sfs = find_all_prefab(origin_prefab)
    map1 = {}
    for x in all_sfs:
        map1[x] = sf_uuid2_pngpath(x, t_data, all_res)

    new_uuid_json = read_json_file(
        os.path.join(new_lib_dir, "uuid-to-mtime.json"))
    for x in map1:
        tm = map1[x]
        pngName = tm[1]
        pngUUid = getUUidByRelativePath(new_uuid_json, pngName)
        replace_map[x] = pngUUid
        print("replace {} to {}  ( {} )".format( x,
                                           replace_map[x],tm[1] if tm[0] == 0 else tm[2] ))


def convert_matrial_bind(origin_prefab, settingsfile, new_lib_dir, dst_dir,
                            all_res, replace_map):
    pass
    t_data = read_json_file(settingsfile)
    all_sfs = find_all_matrial(origin_prefab)
    map1 = {}
    for x in all_sfs:
        map1[x] = sf_uuid2_pngpath(x, t_data, all_res)

    new_uuid_json = read_json_file(
        os.path.join(new_lib_dir, "uuid-to-mtime.json"))
    for x in map1:
        tm = map1[x]
        pngName = tm[1]
        pngUUid = getUUidByRelativePath(new_uuid_json, pngName)
        replace_map[x] = pngUUid
        print("replace {} to {}  ( {} )".format( x,
                                           replace_map[x],tm[1] if tm[0] == 0 else tm[2] ))

def convert_spine_bind(origin_prefab, settingsfile, new_lib_dir, dst_dir,
                            all_res, replace_map):
    pass
    t_data = read_json_file(settingsfile)
    all_sfs = find_uuid_byre(origin_prefab,[spine_re])
    map1 = {}
    for x in all_sfs:
        map1[x] = sf_uuid2_pngpath(x, t_data, all_res)

    new_uuid_json = read_json_file(
        os.path.join(new_lib_dir, "uuid-to-mtime.json"))
    for x in map1:
        tm = map1[x]
        pngName = tm[1]
        pngUUid = getUUidByRelativePath(new_uuid_json, pngName)
        replace_map[x] = pngUUid
        print("replace {} to {}  ( {} )".format( x,
                                           replace_map[x],tm[1] if tm[0] == 0 else tm[2] ))

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

# python convert_prefab.py /Users/mac/Downloads/_-1495149767_49.wxapkg_dir/prefab_res/LayoutLoading.prefab /Users/mac/Documents/my_projects/creator_proj/third_code/jsfilemap/map.json /Users/mac/Documents/my_projects/local_project/opengl_st/commit_xml/settings.json /Users/mac/Documents/my_projects/creator_proj/some_component/library /Users/mac/Downloads/_-1495149767_49.wxapkg_dir/prefab_convert /Users/mac/Downloads/_-1495149767_49.wxapkg_dir/allres
def main():
    if len(sys.argv) == 7:
        origin_prefab = sys.argv[1]
        jsmapfile = sys.argv[2]
        settingsfile = sys.argv[3]
        new_lib_dir = sys.argv[4]
        dst_dir = sys.argv[5]
        all_res = sys.argv[6]

        if not os.path.exists(dst_dir):
            os.makedirs(dst_dir)

        replace_map = {}
        convert_js_bind(origin_prefab, jsmapfile, new_lib_dir, dst_dir,
                        replace_map)
        convert_srpitFrame_bind(origin_prefab, settingsfile, new_lib_dir,
                                dst_dir, all_res, replace_map)
        convert_prefab_bind(origin_prefab, settingsfile, new_lib_dir,
                                dst_dir, all_res, replace_map)
        convert_matrial_bind(origin_prefab, settingsfile, new_lib_dir,
                                dst_dir, all_res, replace_map)

        convert_spine_bind(origin_prefab, settingsfile, new_lib_dir,
                                dst_dir, all_res, replace_map)

        new_prefab = os.path.join(dst_dir, os.path.basename(origin_prefab))
        with open(origin_prefab, "r") as f:
            contents = f.read()
            for x in replace_map:
                if replace_map[x]:
                    contents = contents.replace(x, replace_map[x])

            with open(new_prefab, "w") as f2:
                f2.write(contents.encode("utf-8"))
    elif len(sys.argv) == 3: # convert tmx file
        sourceDir = sys.argv[1]
        dst_dir = sys.argv[2]
        if not os.path.exists(dst_dir):
            os.makedirs(dst_dir)
        for f in os.listdir(sourceDir):
            sourceF = os.path.join(sourceDir, f)
            if file_extension(f) == ".json" and os.path.isfile(sourceF):
                js_data = read_json_file(sourceF)
                if type(js_data) is dict and js_data.get("__type__") == "cc.TiledMapAsset" and js_data.get("tmxXmlStr"):
                    xml_str = js_data.get("tmxXmlStr")
                    tmx_file_name = file_without_extension(f) + ".tmx"
                    with open(os.path.join(dst_dir,tmx_file_name), "w") as f2:
                        f2.write(xml_str)
                        print("save {} successful",tmx_file_name)
    elif len(sys.argv) == 2: #gen ftc.ManagerData only use for 三国吞噬无界
        with open(sys.argv[1],"r") as f:
            data1 = {}
            data2 = {}
            _data2Id = {}
            _dataKeys = {}
            contents = f.read()
            for match in re.finditer(get1_re, contents):
                # Start index of match (integer)
                sStart = match.start()

                # Final index of match (integer)
                sEnd = match.end()

                # Complete match (string)
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
                    print("temp variable name {}".format(contents[s_flag:equal_idx]))
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
                        try:
                            script_json_str = subprocess.check_output(['node','jsgrama.js',script_str])
                        except Exception as e:
                            a = 100
                        script_json = json.loads(script_json_str)
                        mem_map = []
                        find_mem_object(symbol_name,mem_map,script_json)
                        for mm in mem_map:
                            data1[t_key][mm] = ""
                    pass

                # Print match
                # print('Match "{}" found at: [{},{}]'.format(sGroup, sStart,sEnd))

            ss = get1_re.findall(contents)
            c1 = get1_re.search(contents)
            c2 = c1.groups()
            c3 = c1.group()
            c4 = c1.groupdict()
            for x in c1.group():
                a = x
                b = a
            sa = ss


if __name__ == "__main__":
    main()
