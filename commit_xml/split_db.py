# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess,shutil
from lxml import etree as ET
import myutils
import argparse

xml_head = (
'<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'
'<tns:database xmlns:tns="http://www.iw.com/sns/platform/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n')

xml_tail = '\n</tns:database>'

def zipdb_onebyone(dst_path ,ver='output', xmlfile=None):
    dn = os.path.dirname(dst_path)
    bn = os.path.basename(dst_path)
    os.chdir(dn)
    out_path = dst_path + '.rec'
    if os.path.exists(out_path):
        shutil.rmtree(out_path)
    os.mkdir(out_path)

    md5_res = []
    for f in os.listdir(dst_path):
        sourceF = os.path.join(dst_path,f)
        if os.path.isfile(sourceF) and f.endswith('.xml'):
            dst_zipfile = os.path.join(out_path,f+'.zip')
            subprocess.call(['touch', '-t', '202001010000', os.path.join(bn,f)])
            subprocess.call(['zip','-rXD',dst_zipfile,os.path.join(bn,f)],stdout=open(os.devnull, 'wb'))
            if os.path.exists(dst_zipfile):
                md5_res.append(myutils.file_without_extension(f)+'='+myutils.get_file_md5(dst_zipfile))

    xml_name = 'database.local.xml'
    md5_file = os.path.join(out_path,xml_name)
    myutils.write_file_lines(md5_file,md5_res,'\n')

    final_rec_zip = ver+'_'+xml_name+'.zip'
    zip_cmd = ['zip','-j',final_rec_zip,md5_file]
    # spd file
    if xmlfile:
        spd_file = os.path.join(out_path,xml_name+'.spd')
        gen_spd(xmlfile,spd_file)
        zip_cmd.append(spd_file)

    subprocess.call(zip_cmd)
    shutil.move(final_rec_zip,out_path)

    if xmlfile:
        os.remove(spd_file)
        os.remove(md5_file)
        shutil.rmtree(dst_path)

        ob = os.path.basename(out_path)
        print('split xml work done successful.')
        print('please put all zip files under {0} to server.'.format(ob))
        print('after then you can remove {0} as you will'.format(ob))

def build_spd_(k, info):
    if k == '':
        return
    if len(info) == 0:
        return
    ss = '<Group Id="{0}" Count="{1}" Items="{2}"/>'.format(k,len(info),','.join(info))
    return ss

def gen_spd(filename, dst_file=None):
    tree = ET.parse(filename)
    root = tree.getroot()
    spd_name = dst_file if dst_file else filename + '.spd'
    res_map = {}
    ids = None
    for elem in root:
        pass
        if elem.tag == 'Group':
            if not res_map.get(elem.attrib['id']):
                ids = []
                res_map[elem.attrib['id']] = ids
            for x in elem:
                if x.tag == 'ItemSpec':
                    ids.append(x.attrib['id'])

    lines = []
    lines.append(xml_head)
    for x in res_map:
        l = build_spd_(x, res_map[x])
        if l:
            lines.append(l)
    lines.append(xml_tail)
    myutils.write_file_lines(spd_name,lines,'\n')
    try:
        check = ET.parse(spd_name)
    except Exception as e:
        print('malformed xml error information:')
        print(e)
        sys.exit(1)

def split_file_xml(filename):
    tree = ET.parse(filename)
    root = tree.getroot()

    dirname = os.path.dirname(filename)
    dirname2 = os.path.basename(filename) + '.set'
    output_dir = os.path.join(dirname,dirname2)
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.mkdir(output_dir)

    
    for elem in root:
        temprt = ET.Element('p')
        temprt.append(elem)
        content = ET.tostring(elem,pretty_print=True,with_comments=False,method='c14n')
        res = content.rstrip()
        output_file = os.path.join(output_dir,elem.attrib.get('id')+'.xml')
        with open(output_file,'w') as f:
            f.write(res)
    print('split xml file successful.')
def main():

    parser = argparse.ArgumentParser(description='Usage of check_pma.py.')

    parser.add_argument('-s','--split',help='split one large xml to bunch sperate xml.',action='store_true')
    parser.add_argument('-i','--input',help='input file or directory.')
    parser.add_argument('-z','--zip',help='gen all zip by one xml file.', action='store_true')
    parser.add_argument('-v','--version',help='speciy xml version.', default='output')
    parser.add_argument('-spd','--spdxml',help='generate spd of origin xml file.', action='store_true')
    

    args = parser.parse_args()
    if not args.input:
        print('error: need input file or directory')
        return
    if args.split:
        split_file_xml(args.input)
        zipdb_onebyone(args.input + '.set', args.version, args.input)
    elif args.zip:
        zipdb_onebyone(args.input, args.version)
    elif args.spdxml:
        gen_spd(args.input)
    pass

if __name__ == "__main__":
    main()