# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess,json
import myutils
import argparse,time

from PIL import Image

FileName_re = re.compile(r'<filename>(.*?)</filename>')
RaceType_re = re.compile(r'face_race_(\d)')
MD5_re = re.compile(r'.*=\s+(\w+)\n')
Integer_re = re.compile(r'<\w+>(\d+)</.*?>')

Global_flag = 'false'
Record_file = '_pma_check_record'
Record_data = None
Global_dumplua = 'false'


def has_transparency(img_path):
    img = Image.open(img_path)
    if img.mode == "P":
        transparent = img.info.get("transparency", -1)
        for _, index in img.getcolors():
            if index == transparent:
                return True
    elif img.mode == "RGBA":
        extrema = img.getextrema()
        if extrema[3][0] < 255:
            return True

    return False

def parse_recorde_file(file_path):
    if not os.path.exists(file_path):
        return {}
    
    lines = myutils.get_file_lines(file_path)
    if len(lines) == 0:
        return {}
    
    t_dict = {}
    for l in lines:
        tl = l.rstrip()
        if tl == '':
            continue
        tj = json.loads(tl)
        t_dict[tj['file_name']] = tj

    return t_dict

def tell_pkm_is_lz4compressed(file_path):
    if not os.path.exists(file_path):
        print('no file found', file_path)
        sys.exit(1)
    with open(file_path,'rb') as f:
        data = f.read()
        head = data[:4]
        return head == 'LZ4!'
    return False

def lz4DecompressMd5(file_path):
    if not tell_pkm_is_lz4compressed(file_path):
        return get_file_md5(file_path)
    
    excute_path = os.path.join(os.getenv('CcbDyRes'),'dynAutoPacker','lz4Decompress')
    try:
        subprocess.check_output([excute_path,file_path])
    except Exception as e:
        print('lz4Decompress failed')
        return ''

    decom_path = file_path + '.decompress'
    if not os.path.exists(decom_path):
        print('no lz4Decompress file', decom_path)
        return ''
    
    return get_file_md5(decom_path)


def convertArr2luatable(arr,index_arr):
    t = []
    for x in arr:
        t1 = []
        for i,y in enumerate(x):
            key = index_arr[i]
            s='{0}="{1}"'.format(key,y)
            t1.append(s)
        
        t.append('{' + ','.join(t1) + '}')
    res = '{' + ','.join(t) + '}'
    return res

def convert2lua(arrs):
    pass
    res = []
    for tps_path in arrs:
        if tps_path.count('race_project') > 0:
            continue
        t = []
        lines = myutils.get_file_lines(tps_path)
        idx = myutils.lines_contaion_words(lines,"textureFileName")
        resName = os.path.basename(FileName_re.findall(lines[idx+1])[0])

        t.append(resName)
        if tps_path.count('face_race_') > 0:
            
            a = int(RaceType_re.sub(r'\1',RaceType_re.findall(tps_path)[0]))
            t.append(a)
        elif tps_path.count('Imperial') > 0:
            t.append(0)
        else:
            t.append(-1)
        res.append(t)

    luatbl = convertArr2luatable(res,['resName','raceType'])
    with open('luatbl.lua','w') as f:
        f.write(luatbl)
    return luatbl
        
        

def check_dir(dir_path,res,fix,pub):
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.isfile(sourceF):
            if myutils.file_extension(sourceF) == ".tps":
                bn = os.path.basename(sourceF)
                if not bn in res:
                    lines = myutils.get_file_lines(sourceF)
                    idx = myutils.lines_contaion_words(lines,"premultiplyAlpha")
                    if idx:
                        if lines[idx+1].count('false') > 0:
                            # tf = sourceF.replace(os.getenv('ClientDir'),'${ClientDir}')
                            # tf = tf.replace(os.getenv('CcbDyRes'),'${CcbDyRes}')
                            res.append(sourceF)
                            if fix:
                                lines[idx+1] = lines[idx+1].replace('false','true')
                                myutils.write_file_lines(sourceF,lines)

                            if pub:
                                subprocess.call(['TexturePacker',sourceF])

        elif os.path.isdir(sourceF):
            check_dir(sourceF,res,fix,pub)

def get_file_md5(file_path):
    if not os.path.exists(file_path):
        return ''
    md5 = subprocess.check_output(['md5',file_path])
    md5 = MD5_re.findall(md5)[0]
    return md5

def is_tpsfile_pma_check(tps_file):
    lines = myutils.get_file_lines(tps_file)
    idx = myutils.lines_contaion_words(lines,"premultiplyAlpha")
    tps_pma = lines[idx+1].count('true') > 0
    return tps_pma

def reverse_tps_pma(tps_file):
    lines = myutils.get_file_lines(tps_file)
    idx = myutils.lines_contaion_words(lines,"premultiplyAlpha")
    tps_pma = lines[idx+1].count('true') > 0
    if tps_pma:
        lines[idx+1] = lines[idx+1].replace('true','false')
    else:
        lines[idx+1] = lines[idx+1].replace('false','true')
    myutils.write_file_lines(tps_file,lines)

def gen_pkm(tps_file, need_pma):
    lines = myutils.get_file_lines(tps_file)
    idx = myutils.lines_contaion_words(lines,"premultiplyAlpha")
    tps_pma = lines[idx+1].count('true') > 0

    if tps_pma != need_pma:
        reverse_tps_pma(tps_file)

    bn = os.path.basename(tps_file)
    bn = myutils.file_without_extension(bn)
    
    temp_file_name = bn
    subprocess.call(['rm','-rf',temp_file_name+'*'])

    etc_prefix = 'etc'
    res = []
    for i in range(1):
        # etc pack
        temp_file_name_p = temp_file_name
        subprocess.call(['TexturePacker','--texture-format','png','--png-opt-level','0','--opt','RGBA8888','--size-constraints','POT','--sheet',temp_file_name_p+'.png','--data',temp_file_name_p+'.plist',tps_file],stdout=open(os.devnull, 'wb'))
        subprocess.call(['etcpack', temp_file_name_p+'.png', '.', '-c', 'etc1', '-as'],stdout=open(os.devnull, 'wb'))
        md5 = get_file_md5(temp_file_name_p+'.pkm')
        res.append([tps_pma,etc_prefix,md5])

    if tps_pma != need_pma:
        reverse_tps_pma(tps_file)
    print(res)
    adb_path = '/data/data/com.hcg.cok.cn1/files/dresource'
    print('push to',adb_path)
    ret_arr = ['.pkm','.plist','_alpha.pkm']
    for x in ret_arr:
        tf = temp_file_name+x
        subprocess.call(['adb','push',tf,adb_path+'/'+tf])
    return res

def check_pma_of_pkmfile(tps_file):
    lines = myutils.get_file_lines(tps_file)
    idx = myutils.lines_contaion_words(lines,"premultiplyAlpha")
    tps_pma = lines[idx+1].count('true') > 0
    
    temp_file_name = "_temp_check"
    subprocess.call(['rm','-rf',temp_file_name+'*'])

    postfix1 = '_pma' if tps_pma else '_nopma'
    etc_prefix = 'etc'
    tp_prefix = 'tp'
    dot_png = '.png'
    pack_types = ['etc_pma','etc_nopma','tp_pma','tp_nopma']
    res = []
    for i in range(2):
        # etc pack
        temp_file_name_p = temp_file_name+etc_prefix+postfix1
        subprocess.call(['TexturePacker','--texture-format','png','--png-opt-level','0','--opt','RGBA8888','--size-constraints','POT','--sheet',temp_file_name_p+'.png','--data',temp_file_name_p+'.plist',tps_file],stdout=open(os.devnull, 'wb'))
        subprocess.call(['etcpack', temp_file_name_p+'.png', '.', '-c', 'etc1', '-as'],stdout=open(os.devnull, 'wb'))
        md5 = get_file_md5(temp_file_name_p+'.pkm')
        res.append([tps_pma,etc_prefix,md5])
        # TexturePacker pack
        temp_file_name_p = temp_file_name+tp_prefix+postfix1
        subprocess.call(['TexturePacker',tps_file,'--texture-format','pkm','--sheet',temp_file_name_p+'.pkm','--opt','ETC1','--size-constraints','POT','--data',temp_file_name_p+'.plist'],stdout=open(os.devnull, 'wb'))
        md5 = get_file_md5(temp_file_name_p+'.pkm')
        res.append([tps_pma,tp_prefix,md5])

        tps_pma = not tps_pma
        postfix1 = '_pma' if postfix1 == '_nopma' else '_nopma'
        reverse_tps_pma(tps_file)

    subprocess.call(['rm','-rf',temp_file_name+'.*'])
    print(res)
    return res

def find_allextfile_indirectory(dresource_dir, ext, exclude = [], res_in=[]):
    for f in os.listdir(dresource_dir):
        sourceF = os.path.join(dresource_dir,f)
        if os.path.isfile(sourceF) and myutils.file_extension(sourceF) == ext:
            bn = os.path.basename(sourceF)
            is_exlude = False
            for x in exclude:
                if x in bn:
                    is_exlude = True

            if not is_exlude:
                res_in.append(sourceF)
        elif os.path.isdir(sourceF):
            find_allextfile_indirectory(sourceF, ext, exclude, res_in)

def check_android_rawdir(rawdir, ext, exclude = []):
    check_dir_name_ = rawdir
    all_rgb_pkm = []
    find_allextfile_indirectory(check_dir_name_,ext,exclude,all_rgb_pkm)
    all_rgb_pkm_md5 = []
    for x in all_rgb_pkm:
        all_rgb_pkm_md5.append([os.path.basename(x),lz4DecompressMd5(x)])
    return all_rgb_pkm_md5

def check_android_zip(zipfile):
    print('start check zipfile:',zipfile)
    zipfile = zipfile.rstrip()
    if zipfile.count('_android.zip') == 0:
        print('please input an android zipfile')
        return
    check_dir_name_ = "_temp_checkzip_"
    subprocess.call(['rm','-rf',check_dir_name_])
    subprocess.call(['unzip',zipfile,'-d',check_dir_name_],stdout=open(os.devnull, 'wb'))

    all_rgb_pkm_md5 = check_android_rawdir(check_dir_name_,'.pkm',['alpha.pkm'])
    # all_rgb_pkm = []
    # find_allextfile_indirectory(check_dir_name_,'.pkm',['alpha.pkm'],all_rgb_pkm)
    # all_rgb_pkm_md5 = []
    # for x in all_rgb_pkm:
    #     all_rgb_pkm_md5.append([os.path.basename(x),lz4DecompressMd5(x)])
    subprocess.call(['rm','-rf',check_dir_name_])
    return all_rgb_pkm_md5

def find_without_ext(bn, arr):
    bn_noext = myutils.file_without_extension(bn)
    for x in arr:
        if myutils.file_without_extension(x) == bn_noext:
            return x
    return None

def compare_zip_with_tpsdirectory(zipfile,tpsdirectory):
    pass
    all_rgb_pkm = []
    if os.path.isfile(zipfile):
        all_rgb_pkm = check_android_zip(zipfile)
    elif os.path.isdir(zipfile):
        all_rgb_pkm = check_android_rawdir(zipfile,'.pkm',['alpha.pkm'])

    if len(all_rgb_pkm) == 0:
        return
    
    all_tps = []
    find_allextfile_indirectory(tpsdirectory,'.tps',[],all_tps)
    if len(all_tps) == 0:
        return
    
    result = []
    for pkm in all_rgb_pkm:
        y = pkm[0]
        y_md5 = pkm[1]
        find_tps = find_without_ext(y,all_tps)
        if find_tps:
            tm = check_pma_of_pkmfile(find_tps)
            for z in tm:
                if y_md5 == z[2]:
                    # print('md5 of',y,'is',y_md5)
                    result.append([y,z[0],z[1]])
    need_arr = []
    for x in result:
        print(x[0],"has premulti alpha: ", "YES" if x[1] else "NO",',pack type:',x[2])
        if filter_pmaflag(x[1],Global_flag):
            need_arr.append([x[0]])
    if len(need_arr) > 0:
        lua_str = convertArr2luatable(need_arr,['resName'])
        print('lua result table:')
        print(lua_str)
    else:
        print('no res with pma',Global_flag,'found no lua table output.')
            
    return result

def trim_file_name(file_name):
    file_name = os.path.basename(file_name)
    file_name = myutils.file_without_extension(file_name)
    file_name = file_name.replace('_alpha_sk_','')
    file_name = file_name.replace('_alpha_','')
    return file_name

def get_face_from_zipfilename(zipFile):
    dir_path = os.path.dirname(zipFile)
    bn = os.path.basename(zipFile)
    bn_noext = myutils.file_without_extension(bn)

    if not zipFile.endswith('_a.zip') and not zipFile.endswith('_android.zip') and not zipFile.endswith('_ios.zip'):
        a_p = os.path.join(dir_path,bn_noext+'_a.zip')
        android_p = os.path.join(dir_path,bn_noext+'_android.zip')
        if not os.path.exists(a_p) and not os.path.exists(android_p):
            return None
        else:
            first_ = bn_noext.index('_')
            return bn_noext[(first_+1):]
    
    bn_arr = bn.split('_')
    bn_arr = bn_arr[1:-1]
    return '_'.join(bn_arr)

def try_find_face_path(zipfile):
    zipfile = zipfile.rstrip()
    
    ccbPath = os.getenv('CcbDyRes')
    facePath = None
    facePath = get_face_from_zipfilename(zipfile)
    facePath = os.path.join(ccbPath,'dynamicResource',facePath)
    if os.path.exists(facePath):
        return facePath

    return None

def pma_comparewith_source_(all_rgb_pkm, tps_file, doPrint = False):
    tm = check_pma_of_pkmfile(tps_file)
    print('all pack md5 of',tps_file)
    for x in tm:
        print(' use {0} with premultialpha {1} pack, md5 is {2}'.format(x[1],x[0],x[2]))
    trim_tps_file = trim_file_name(tps_file)
    for x in all_rgb_pkm:
        y = x[0]
        y_md5 = x[1]
        if trim_file_name(y) == trim_tps_file:
            for z in tm:
                if y_md5 == z[2]:
                    if doPrint:
                        print('md5 of',y,'is',y_md5)
                        print(y,"has premulti alpha: ", "YES" if z[0] else "NO",',pack type:',z[1])
                    return z[0]
            print('can not detect pma of',y,'mabe it use other packer')
            return 'undetected'

def pma_comparewith_source(zipfile, tps_file, doPrint = False):
    all_rgb_pkm = check_android_zip(zipfile)
    return pma_comparewith_source_(all_rgb_pkm,tps_file,doPrint)

def pma_comparewith_pkm(pkmfile, tps_file, doPrint = False):
    all_rgb_pkm = []
    all_rgb_pkm.append([os.path.basename(pkmfile),lz4DecompressMd5(pkmfile)])
    return pma_comparewith_source_(all_rgb_pkm,tps_file,doPrint)

def recored_zipresult(zipfile, res):
    t_dict = {}
    t_dict['file_name'] = os.path.basename( zipfile)
    t_dict['res'] = res
    with open(Record_file,'a') as f:
        f.write(json.dumps(t_dict) + '\n')

def pma_compare(zipfile, doPrint=False):
    rec_data = Record_data.get(os.path.basename(zipfile))
    if rec_data:
        if doPrint:
            print('result of',zipfile,"is:")
            res = rec_data['res']
            for x in res:
                print(' {0} has premulti alpha: {1}'.format(x[0],'Yes' if x[1] else 'No'))
        return rec_data['res']

    facePath = try_find_face_path(zipfile)
    if not facePath or not os.path.exists(facePath):
        print('find face path failed',zipfile)
        return [[os.path.basename(zipfile),'not find tps file']]
    
    res = compare_zip_with_tpsdirectory(zipfile, facePath)
    # for x in all_rgb_pkm:
    #     y = x[0]
    #     tr = [y]
    #     y_md5 = x[1]
    #     t_tps = y.replace('.pkm','.tps')
    #     tps_file = os.path.join(facePath,t_tps)
    #     if not os.path.exists(tps_file):
    #         print('tps file not exist.',tps_file)
    #         tr.append('not find tps file')
    #         res.append(tr)
    #         continue
    #     tps_pma = check_pma_of_pkmfile(tps_file)
    #     print('md5 of',y,'is',y_md5)
    #     find_it = False
    #     for z in tps_pma:
    #         if z[2] == y_md5:
    #             find_it = True
    #             tr.append(z[0])
    #             print('pack type of',y,'is',z[1])
    #             if filter_pmaflag(z[0],Global_flag):
    #                 with open("__temp_log","a") as f:
    #                     json_str = json.dumps(tr)
    #                     f.write(json_str + '\n')
    #             break
    #     if not find_it:
    #         tr.append('not detect')

    #     res.append(tr)
    if doPrint:
        print('result of',zipfile,"is:")
        for x in res:
            print(' {0} has premulti alpha: {1}'.format(x[0],'Yes' if x[1] else 'No'))

    recored_zipresult(zipfile, res)
    return res

def check_android_zip_dir(dir_path, prefix='dr_', check_count=50):
    tmap = {}
    tn = 0
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if f.startswith(prefix) and sourceF.count('android.zip') == 1 and os.path.isfile(sourceF):
            tmap[os.path.basename(sourceF)] = pma_compare(sourceF)
            tn += 1
            if tn >= check_count:
                break

    return tmap

def public_test_tps_pma():
    dirs = [os.getenv('ClientDir')+'/CCB/IF',os.getenv('CcbDyRes')+'/dynamicResource']
    # dirs = ['/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/face_race_3']

    tpsPath = "/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/race_project/race_3_huaxia/Imperial/_alpha_Imperial_25.tps"
    
    fix = False
    pub = False
    res = []
    for x in dirs:
        check_dir(x,res,fix,pub)

    convert2lua(res)
    if True:
        return

    res_for_pma = []
    for x in res:
        tf = x.replace(os.getenv('ClientDir'),'${ClientDir}')
        tf = tf.replace(os.getenv('CcbDyRes'),'${CcbDyRes}')
        res_for_pma.append(tf)

    myutils.write_file_lines('pma.txt',res_for_pma,'\n')


GLBlendConst = {
    "ZERO"  : 0x0000,
    "ONE"  : 0x0001,
    "SRC_COLOR"  : 0x0300,
    "ONE_MINUS_SRC_COLOR"  : 0x0301,
    "DST_COLOR"  : 0x0306,
    "ONE_MINUS_DST_COLOR"  : 0x0307,
    "SRC_ALPHA"  : 0x0302,
    "ONE_MINUS_SRC_ALPHA"  : 0x0303,
    "DST_ALPHA"  : 0x0304,
    "ONE_MINUS_DST_ALPHA"  : 0x0305,
    "CONSTANT_ALPHA"  : 0x8003,
    "ONE_MINUS_CONSTANT_ALPHA"  : 0x8004,
    "SRC_ALPHA_SATURATE"  : 0x0308,
    "BLEND_COLOR"  : 0x8005
}

def getInteger(line):
    return int(Integer_re.findall(line)[0])
def number2blend(number):
    for k in GLBlendConst:
        if GLBlendConst[k] == number:
            return k
    return "Undefined"

def find_blendOf_plist(plist_file):
    lines = myutils.get_file_lines(plist_file)
    tm = {}
    tm['name'] = os.path.basename(plist_file)

    for i, l in enumerate(lines):
        if l.count('blendFuncSource') == 1:
            tm['src'] = number2blend(getInteger(lines[i+1]))
        elif l.count('blendFuncDestination') == 1:
            tm['dst'] = number2blend(getInteger(lines[i+1]))

        if tm.get('src') and tm.get('dst'):
            return tm

def check_plist_blendFunc(dir_path):
    type_arr = []
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.exists(sourceF) and sourceF.endswith('.plist'):
            pass
            tm = find_blendOf_plist(sourceF)
            info = next((x for x in type_arr if x['src'] == tm['src'] and x['dst'] == tm['dst']), None)
            if not info:
                info = {
                    "src": tm['src'],
                    "dst": tm['dst'],
                    "arr": [tm]
                }
                type_arr.append(info)
            else:
                info['arr'].append(tm)

    return type_arr

def some_test():
    a = check_android_zip('/Users/mac/Documents/my_projects/cok/innerDyRes/dr_face_race_2_android.zip')
    # print(args.instruction)
    # inner_dir = os.getenv('InnerDyRes')
    
    # tpsFile = '/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/halo_iceworld_face/_alpha_sk_halo_iceworld_face_front.tps'
    # zipFile = '/Users/mac/Documents/my_projects/cok/innerDyRes/dr_halo_iceworld_face_android.zip'
    # pma_comparewith_source(zipFile, tpsFile, True)
    # a = pma_compare(os.path.join(inner_dir,'dr_PhoenixFire_face_android.zip'))
    # a = get_face_from_zipfilename(os.path.join(inner_dir,'dr_TimeTTrAnima_face_android.zip'))
    # a = get_face_from_zipfilename(os.path.join(inner_dir,'dr_totem_1_face_ios.zip'))
    # a = get_face_from_zipfilename(os.path.join(inner_dir,'lua_LiBao_shenqijineng_CN_a.zip'))
    # a = get_face_from_zipfilename(os.path.join(inner_dir,'lua_LiBao_shouchoubeiji_default.zip'))
    # a = get_face_from_zipfilename(os.path.join(inner_dir,'lua_weekend.zip'))
    b = 100
    
    # tm = check_pma_of_pkmfile('/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/Wings_crow_face/_alpha_sk_Wings_crow_face.tps')
    # a = 100
    # tm2 = check_android_zip(zipFile)
    # t = MD5_re.findall('MD5 (_temp_check.pkm) = 0e97baa276cbd914924951b8d9e45088\n')[0]
    # a = check_android_zip('/Users/mac/Documents/my_projects/cok/innerDyRes/dr_TimeLimitBuffCell_face_android.zip')
    # res = pma_compare('/Users/mac/Documents/my_projects/cok/innerDyRes/dr_TimeLimitBuffCell_face_android.zip')
    # res = pma_compare('/Users/mac/Documents/my_projects/cok/innerDyRes/dr_face_Valentine_boy_android.zip')

    # inner_dir = os.getenv('InnerDyRes')
    # tmap = check_android_zip_dir(inner_dir, 'dr_Nameplate', 10)
    # myutils.write_dict_tofile('checkmap.txt',tmap)

    # a = GLBlendConst['ZERO']
    # s = number2blend(770)
    # i = getInteger('<integer>770</integer>')
    # q = find_blendOf_plist("/Users/mac/Documents/my_projects/cok/client/IF/Resources/particle/zadantx_2.plist")
    
    
    # qq = check_plist_blendFunc("/Users/mac/Documents/my_projects/cok/client/IF/Resources/particle")
    # myutils.write_dict_tofile("particle_category.txt",qq)
    # os.system('/Users/mac/Documents/my_projects/cok/ccbDyRes/dynAutoPacker/lz4Decompress')
    # subprocess.call(['/Users/mac/Documents/my_projects/cok/ccbDyRes/dynAutoPacker/lz4Decompress'])
    # mm = lz4DecompressMd5('/Users/mac/Documents/my_projects/cok/innerDyRes/dresource 34/_alpha_sk_Wings_crow_face.pkm')
    a = 100

def filter_pmaflag(f, f_str):
    if f_str == 'true':
        return f == True
    elif f_str == 'false':
        return f == False
    
    return False

def handle_output(output_file,arr,pmaflag):
    if len(arr) == 0:
        ss = 'None of the res with pma: {0} found'.format(pmaflag)
        print(ss)
        with open(output_file,'w') as f:
            f.write(ss)
    else:
        if output_file:
            myutils.write_dict_tofile(output_file,arr)
            print('check pma successful, write result to',output_file)
        else:
            print(arr)


def main():
    parser = argparse.ArgumentParser(description='Usage of check_pma.py.')

    parser.add_argument('-f','--file',help='specify one zip file.')
    parser.add_argument('-d','--directory',help='specify one directory.')
    parser.add_argument('-i','--input',help='specify input file, each line indicate one android zip file')
    parser.add_argument('-pma','--checkpma',help='filter res with premultialpha true with pma true, false otherwise',choices=['true', 'false'],default="false")
    parser.add_argument('-tps','--tpsfile',help='specify compared tps file. use with -f mode')
    parser.add_argument('-p','--prefix',help='specify prefix of set of zipfiles. use with -d mode',default="dr_")
    parser.add_argument('-n','--filecount',help='specify how many file should check. use with -d mode',default=20000,type=int)
    parser.add_argument('-o','--output',help='specify output file, use with -d mode')
    parser.add_argument('-tpsdir','--tpsdirectory',help='specify compared tps directory. use with both -f,-d mode')
    parser.add_argument('-lua','--dumplua',help='specify lua format output',choices=['true', 'false'],default="false")
    parser.add_argument('-pkm','--pkmfile',help='specify pkm file')
    parser.add_argument('-android','--genandroid',help='gen pkm for android',choices=['true', 'false'],default="true")
    

    args = parser.parse_args()
    global Global_flag
    global Global_dumplua
    global Record_data

    Global_dumplua = args.dumplua
    Record_data = parse_recorde_file(Record_file)
    with open("__temp_log","w") as f:
        pass

    # if args.tpsfile and args.genandroid:
    #     gen_pkm(args.tpsfile, args.checkpma)
    #     return

    if args.file:
        if args.tpsfile:
            pma_comparewith_source(args.file, args.tpsfile, True)
        elif args.tpsdirectory:
            compare_zip_with_tpsdirectory(args.file, args.tpsdirectory)
        else:
            pma_compare(args.file, True)
    elif args.directory:
        Global_flag = args.checkpma
        print('check directory res with premulti alpha',args.checkpma)
        if args.tpsdirectory:
            compare_zip_with_tpsdirectory(args.directory, args.tpsdirectory)
            return
        tmap = check_android_zip_dir(args.directory, args.prefix, args.filecount)
        res = []
        for x in tmap:
            q = tmap[x]
            for y in q:
                if filter_pmaflag(y[1],args.checkpma):
                    res.append(y)
        handle_output(args.output,res,args.checkpma)
    elif args.pkmfile:
        if args.tpsfile:
            pma_comparewith_pkm(args.pkmfile, args.tpsfile, True)
    elif args.input:
        Global_flag = args.checkpma
        print('check all input res with premulti alpha',args.checkpma)
        lines = myutils.get_file_lines(args.input)
        res = []
        for f in lines:
            t = pma_compare(f.rstrip())
            if t:
                for x in t:
                    if filter_pmaflag(x[1],args.checkpma):
                        res.append(x)
        handle_output(args.output,res,args.checkpma)

def libao_check_(dir_path):

    check_dir_name_ = "_temp_checkzip_"
    
    # /Users/mac/Documents/my_projects/cok/outerDyRes75/lua_LiBao_aijiyanhou_default_a/lua/skeleton/android/_alpha_sk_LiBao_aijiyanhou_default_a_icon.pkm
    res = []
    for f in os.listdir(dir_path):
        sourceF = os.path.join(dir_path,f)
        if os.path.isfile(sourceF) and sourceF.endswith('default_a.zip'):
            time.sleep( 0.01 )
            subprocess.call(['rm','-rf',check_dir_name_])
            time.sleep( 0.01 )
            subprocess.call(['unzip',sourceF,'-d',check_dir_name_],stdout=open(os.devnull, 'wb'))

            check_path = check_dir_name_+'/'+"lua/skeleton/android"
            if os.path.isdir(check_path):
                check_ok_ = False
                for f2 in os.listdir(check_path):
                    pkmfile = os.path.join(check_path,f2)
                    if os.path.isfile(pkmfile) and pkmfile.endswith('a_icon.pkm'):
                        md5 = myutils.get_file_md5(pkmfile)
                        if md5 == '66f9ace13a5a68fdcd83673934248993':
                            check_ok_ = True
                            break
                if check_ok_:
                    # print(f,'is the same')
                    res.append(f)
                else:
                    # print(f,'is not the same!!!!!!!!!!!!!!!')
                    pass
    myutils.write_file_lines('old_libao_warning',res,'\n')       

    
if __name__ == "__main__":
    main()
    # some_test()
    # libao_check_("/Users/mac/Documents/my_projects/cok/outerDyRes75")
    # res = has_transparency("/Users/mac/Documents/my_projects/cok/ccbDyRes/dynamicResource/goods_02/prop/BG_Samurai_select.png")
    # a = 100