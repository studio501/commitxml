# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess,json
import myutils
import argparse

FileName_re = re.compile(r'<filename>(.*?)</filename>')
RaceType_re = re.compile(r'face_race_(\d)')
MD5_re = re.compile(r'.*=\s+(\w+)\n')
Integer_re = re.compile(r'<\w+>(\d+)</.*?>')

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
        subprocess.call(['TexturePacker','--texture-format','png','--png-opt-level','0','--opt','RGBA8888','--size-constraints','POT','--sheet',temp_file_name_p+'.png','--data',temp_file_name_p+'.plist',tps_file])
        subprocess.call(['etcpack', temp_file_name_p+'.png', '.', '-c', 'etc1', '-as'])
        md5 = get_file_md5(temp_file_name_p+'.pkm')
        res.append([tps_pma,etc_prefix,md5])
        # TexturePacker pack
        temp_file_name_p = temp_file_name+tp_prefix+postfix1
        subprocess.call(['TexturePacker',tps_file,'--texture-format','pkm','--sheet',temp_file_name_p+'.pkm','--opt','ETC1','--size-constraints','POT','--data',temp_file_name_p+'.plist'])
        md5 = get_file_md5(temp_file_name_p+'.pkm')
        res.append([tps_pma,tp_prefix,md5])

        tps_pma = not tps_pma
        postfix1 = '_pma' if postfix1 == '_nopma' else '_nopma'
        reverse_tps_pma(tps_file)

    subprocess.call(['rm','-rf',temp_file_name+'.*'])
    print(res)
    return res

def check_android_zip(zipfile):
    zipfile = zipfile.rstrip()
    if zipfile.count('_android.zip') == 0:
        print('please input an android zipfile')
        return
    check_dir_name_ = "_temp_checkzip_"
    subprocess.call(['rm','-rf',check_dir_name_])
    subprocess.call(['unzip',zipfile,'-d',check_dir_name_])

    all_rgb_pkm = []
    dresource_dir = os.path.join(check_dir_name_,'dresource')
    for f in os.listdir(dresource_dir):
        sourceF = os.path.join(dresource_dir,f)
        if os.path.isfile(sourceF) and myutils.file_extension(sourceF) == ".pkm" and sourceF.count('alpha.pkm') == 0:
            all_rgb_pkm.append([os.path.basename(sourceF),lz4DecompressMd5(sourceF)])
    subprocess.call(['rm','-rf',check_dir_name_])
    return all_rgb_pkm

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

def try_find_face_path(all_rgb_pkm, zipfile):
    zipfile = zipfile.rstrip()
    if len(all_rgb_pkm) == 0:
        return
    
    ccbPath = os.getenv('CcbDyRes')
    facePath = None
    facePath = get_face_from_zipfilename(zipfile)
    facePath = os.path.join(ccbPath,'dynamicResource',facePath)
    if os.path.exists(facePath):
        return facePath

    for x in all_rgb_pkm:
        y = x[0]
        y = y.replace('.pkm','')
        y = y.replace('_alpha_sk_','')
        y = y.replace('_alpha_','')
        facePath = os.path.join(ccbPath,'dynamicResource',y)
        if os.path.exists(facePath):
            return facePath
    
    return None
    

def pma_comparewith_source(zipfile, tps_file, doPrint = False):
    all_rgb_pkm = check_android_zip(zipfile)

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

def pma_compare(zipfile, doPrint=False):
    all_rgb_pkm = check_android_zip(zipfile)
    if not all_rgb_pkm:
        return
    
    facePath = try_find_face_path(all_rgb_pkm, zipfile)
    if not facePath or not os.path.exists(facePath):
        print('find face path failed',zipfile)
        return [[os.path.basename(zipfile),'not find tps file']]
    
    
    res = []
    for x in all_rgb_pkm:
        y = x[0]
        tr = [y]
        y_md5 = x[1]
        t_tps = y.replace('.pkm','.tps')
        tps_file = os.path.join(facePath,t_tps)
        if not os.path.exists(tps_file):
            print('tps file not exist.',tps_file)
            tr.append('not find tps file')
            res.append(tr)
            continue
        tps_pma = check_pma_of_pkmfile(tps_file)

        find_it = False
        for z in tps_pma:
            if z[2] == y_md5:
                find_it = True
                tr.append(z[0])
                break
        if not find_it:
            tr.append('not detect')

        res.append(tr)
    if doPrint:
        print('result of',zipfile,"is:")
        for x in res:
            print(' {0} has premulti alpha: {1}'.format(x[0],'Yes' if x[1] else 'No'))
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
        print('None of the res with pma: {0} found'.format(pmaflag))
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
    

    args = parser.parse_args()
    if args.file:
        if args.tpsfile:
            pma_comparewith_source(args.file, args.tpsfile, True)
        else:
            pma_compare(args.file, True)
    elif args.directory:
        print('check directory res with premulti alpha',args.checkpma)
        tmap = check_android_zip_dir(args.directory, args.prefix, args.filecount)
        res = []
        for x in tmap:
            q = tmap[x]
            for y in q:
                if filter_pmaflag(y[1],args.checkpma):
                    res.append(y)
        handle_output(args.output,res,args.checkpma)
    elif args.input:
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

if __name__ == "__main__":
    main()