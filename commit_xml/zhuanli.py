# -*- coding:utf-8 -*-
from __future__ import print_function
import os,sys,json,re,subprocess
from bs4 import BeautifulSoup
import requests, codecs, time, random
from urllib import quote
from urllib import unquote
import xlsxwriter
import pandas as pd
import datetime

base_url = 'https://www.qcc.com'
company_id_re = re.compile(r'https://www.qcc.com/firm/(\w+).html.*')

cookie_str = r'QCCSESSID=k3hsrf1md08pppsfmmcfio0o86; zg_did=%7B%22did%22%3A%20%22174ec8efe52155-048ac06c4ab385-316b7305-13c680-174ec8efe533ca%22%7D; UM_distinctid=174ec8f0a716d2-01e87cf038ac41-316b7305-13c680-174ec8f0a72904; Hm_lvt_78f134d5a9ac3f92524914d0247e70cb=1601696641; CNZZDATA1254842228=258650528-1601694951-%7C1601791162; Hm_lpvt_78f134d5a9ac3f92524914d0247e70cb=1601794900; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201601801481364%2C%22updated%22%3A%201601801500868%2C%22info%22%3A%201601696628320%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.qcc.com%22%2C%22zs%22%3A%200%2C%22sc%22%3A%200%2C%22cuid%22%3A%20%22f6da86e6cd5939526faed303de504b8e%22%7D; acw_tc=2ff6109116018019324621969ea14afd9d6a96d37e54ec51b49589e809'

cookie_str = ''

headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36','cookie': cookie_str}

def get_cookie():
    cookies={}
    for line in cookie_str.split(';'):
        name,value=line.strip().split('=',1)
        cookies[name]=value
    return cookies

def get_soup(file_name):
    html = None
    with open(file_name,"r") as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser', from_encoding="utf-8")
    return soup

# 获取公司名字
def get_company_title(soup):
    title = soup.select("#company-top > div.row > div.content > div.row.title.jk-tip > h1")
    title = title[0].text.strip()
    return title

def get_req_event(company_id,company_name,tab_name):
    now = int(round( time.time())) * 1000
    now1 = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    sid = "1601801481364"
    s1 = 'https://tongji.qichacha.com/web_event/web.gif?method=web_event_srv.upload&event={"sln": "itn","pl": "js","sdk": "zg-js","sdkv": "2.0","owner": "zg","ut": "'+now1+'","tz": 28800000,"debug": 0,"ak": "de1d1a35bfa24ce29bbf2c7eb17e6c4f","usr": {"did": "174ec8efe52155-048ac06c4ab385-316b7305-13c680-174ec8efe533ca"},"data": [{"dt": "evt","pr": {"$ct": '+str(now-1)+',"$tz": 28800000,"$cuid": "f6da86e6cd5939526faed303de504b8e","$sid": '+sid+',"$url": "https://www.qcc.com/firm/'+company_id+'.html#base","$ref": "https://www.qcc.com/search?key='+quote(company_name)+'","$referrer_domain": "www.qcc.com","$eid": "企业主页内容点击","_点击来源": "一级Tab","_数据维度": "'+tab_name+'"}}]}&_='+str(now)

    s1 = 'https://tongji.qichacha.com/web_event/web.gif?method=web_event_srv.upload&event={"sln": "itn","pl": "js","sdk": "zg-js","sdkv": "2.0","owner": "zg","ut": "2020-10-4 16:51:40","tz": 28800000,"debug": 0,"ak": "de1d1a35bfa24ce29bbf2c7eb17e6c4f","usr": {"did": "174ec8efe52155-048ac06c4ab385-316b7305-13c680-174ec8efe533ca"},"data": [{"dt": "evt","pr": {"$ct": 1601801500868,"$tz": 28800000,"$cuid": "f6da86e6cd5939526faed303de504b8e","$sid": 1601801481364,"$url": "https://www.qcc.com/firm/75267849edabe9cbeb02d85a2b199568.html#base","$ref": "https://www.qcc.com/search?key=%E6%B9%96%E5%8D%97%E6%B5%8F%E9%98%B3%E6%B2%B3%E9%A5%B2%E6%96%99%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8","$referrer_domain": "www.qcc.com","$eid": "企业主页内容点击","_点击来源": "一级Tab","_数据维度": "基本信息"}}]}&_=1601801500868'

    return s1

def get_company_startTime(company_id,company_name):
    url = get_req_event(company_id,company_name,"基本信息")
    print(url)
    req = requests.get(url,cookies=get_cookie(),headers=headers)
    req_text = req.content
    print(req_text)
    soup = BeautifulSoup(req_text, 'lxml', from_encoding="utf-8")
    ss = soup.select("#Cominfo > table")[0].select('tr')
    res = ss[0].select('td')[5].text.strip()
    return res


def get_id(url):
    pass
    id = "75267849edabe9cbeb02d85a2b199568"
    company = "湖南浏阳河饲料有限公司"
    j = 1
    req_text = requests.get(url,cookies=get_cookie(),headers=headers).content
    print(req_text)

    soup = BeautifulSoup(req_text, 'lxml')

    s = soup.select("#company-top > div.row > div.content > div.row.title.jk-tip > a")
    s = s[0].text.strip()
    a = 100

def get_company_id():
    s = quote('湖南浏阳河饲料有限公司')
    df = ['湖南浏阳河饲料有限公司']
    


    ids = [] #用来储存公司ID
    for key in df[0:]:
        print(key)#公司名称
        url = 'https://www.qcc.com/search?key='+key
        id = get_id(url)#获取公司ID函数
        id = id.split('firm_')[1].split('.html')[0]
        ids.append(id)
        time.sleep(0.44+random.random())#适当控制爬取速度，防止被封
    
    a = 100

def get_selector(soup,select_path):
    tmp = soup.select(select_path)
    tmp = tmp[0].text.strip()
    return tmp

def time_less_than_n_year(year_str,delta=3):
    pass
    now_year = int( datetime.datetime.now().strftime("%Y"))
    prev_year = int( year_str.split('-')[0])
    return now_year - prev_year > delta

def get_zhuanli_arr(soup):
    pass
    tbl = soup.select("body > table")
    arr = []
    for x in tbl:
        tr = x.select('tr')
        i_ctr = 0
        for y in tr:
            t = []
            th = y.select('th' if i_ctr == 0 else 'td')
            for z in th:
                t.append(z.text.strip())
            if i_ctr > 0 and (t[3] == '撤回' or t[3] == '权利终止' or time_less_than_n_year(t[7],3)):
                pass
            else:
                arr.append(t)
            i_ctr += 1

        break
    return arr

def get_logo_arr(soup):
    tbl = soup.select("body > div:nth-child(2) > table")
    arr = []
    for x in tbl:
        tr = x.select('tr')
        i_ctr = 0
        for y in tr:
            t = []
            th = y.select('th' if i_ctr == 0 else 'td')
            th_len = len(th)
            for iz,z in enumerate( th ):
                if i_ctr > 0 and iz == th_len -1:
                    if t[3] == u'已注册':
                        ahref = z.select('a')[0]
                        a_url = base_url + ahref['href']
                        t.append(get_registed_date(a_url))
                    else:
                        t.append('-')
                else:
                    t.append(z.text.strip())
            arr.append(t)
            i_ctr += 1

        break
    return arr

def get_logo(company,id,url):
    req = requests.get(url,cookies=get_cookie(),headers=headers)
    req_text = req.content
    # print(req_text)
    # html.parser
    soup = BeautifulSoup(req_text, 'lxml', from_encoding="utf-8")
    zhuanlis = get_logo_arr(soup)
    return zhuanlis

def get_message(company,id,url):
    req = requests.get(url,cookies=get_cookie(),headers=headers)
    req_text = req.content
    soup = BeautifulSoup(req_text, 'lxml', from_encoding="utf-8")
    zhuanlis = get_zhuanli_arr(soup)
    return zhuanlis


def get_all_logo(company,id):
    messages = []#存储公司专利信息
    for j in range(1,501):#最多500页专利信息
        url = 'https://www.qcc.com/company_getinfos?unique='+id + '&companyname=' + company +'&p='+ str(j) + '&tab=assets&box=shangbiao&sbappdateyear=&sbstatus=&sbflowno=&sbintcls='
        out_put = []
        try:
            message = get_logo(company,id,url)#获取专利信息函数
        except AttributeError:
            break
        if j == 1:
            messages.extend(message)
        else:
            messages.extend(message[1:])
        if(len(message)<21 or j==500):
            break
        time.sleep(0.24+random.random())
    time.sleep(0.56+random.random())

    return messages

def get_zhuanli(company,id):
    messages = []#存储公司专利信息
    for j in range(1,501):#最多500页专利信息
        url = 'https://www.qcc.com/company_getinfos?unique='+id + '&companyname=' + company +'&p='+ str(j) + '&tab=assets&box=zhuanli&zlpublicationyear=&zlipclist=&zlkindcode=&zllegalstatus='
        out_put = []
        try:
            message = get_message(company,id,url)#获取专利信息函数
        except AttributeError:
            break
        if j == 1:
            messages.extend(message)
        else:
            messages.extend(message[1:])
        if(len(message)<11 or j==500):
            break
        time.sleep(0.24+random.random())
    time.sleep(0.56+random.random())

    return messages

# 获取成立时间
def get_start_time(soup):
    title = soup.select("#Cominfo > table > tbody > tr:nth-child(1) > td:nth-child(6)")
    title = title[0].text.strip()
    return title

# 获取专利信息
def get_zhuanli_xingxi(soup):
    i = 1
    res = []

    diyige = ['#zhuanlilist > table > tbody > tr:nth-child({}) > th.tx','#zhuanlilist > table > tbody > tr:nth-child({}) > td.tx']
    leftge = ['#zhuanlilist > table > tbody > tr:nth-child({}) > th:nth-child({})','#zhuanlilist > table > tbody > tr:nth-child({}) > td:nth-child({})']

    biao_jie_shu = False
    while True:
        j = 1
        raw = []
        while True:
            if j == 1:
                t = soup.select(diyige[0 if i == 1 else 1].format(i))
                if len(t) == 0:
                    biao_jie_shu = True
                    break
                raw.append(t[0].text.strip())
            else:
                t = soup.select(leftge[0 if i == 1 else 1].format(i,j))
                if len(t) == 0:
                    break
                raw.append(t[0].text.strip())
            j += 1
        if biao_jie_shu:
            break
        i+=1
        res.append(raw)
    return res

def merge_col(worksheet,merge_format,cur_row,zhuanli_len,val,col_num):
    worksheet.merge_range(data=val,first_row=cur_row,last_row=cur_row+zhuanli_len-1,first_col=col_num,last_col=col_num)
    # worksheet.write(val,row=cur_row,col=col_num)
    return col_num+1

# https://www.qcc.com/brandDetail/8f2e5323ffffa59b7f2700e045332764.html

def write_xlsx(company_data,dst_file):
    xl_file = pd.ExcelFile("template.xlsx")
    sheets = xl_file.sheet_names
    sheet_name = sheets[0]
    data = pd.read_excel("template.xlsx", sheet_name=sheet_name, usecol=[0, 1], header=None)

    title = data[0][0]
    head = data.iloc[1]
    workbook = xlsxwriter.Workbook(dst_file)
    worksheet = workbook.add_worksheet()

    merge_format = workbook.add_format({
    'bold': 1,
    'border': 1,
    'align': 'center',
    'valign': 'vcenter',
    'fg_color': 'yellow'})

    cur_row = 0
    worksheet.merge_range('A1:O1', 'Merged Range', merge_format)
    worksheet.write('A1', title)

    cur_row += 1
    for i in range(len(head)):
        worksheet.write(cur_row, i, head[i])
    
    cur_row += 1
    for ic,c in enumerate(company_data):
        zhuanli = c["zhuanli"][1:]
        zhuanli_len = len(zhuanli)

        logo = c["logo"][1:]
        logo_len = len(logo)

        col_num = 0
        col_num = merge_col(worksheet,merge_format,cur_row,zhuanli_len,ic+1,col_num)
        col_num = merge_col(worksheet,merge_format,cur_row,zhuanli_len,c["title"],col_num)
        col_num = merge_col(worksheet,merge_format,cur_row,zhuanli_len,c["start_time"],col_num)
        
        test = type(c["title"])
        col_num = merge_col(worksheet,merge_format,cur_row,zhuanli_len,'是',col_num)
        col_num = merge_col(worksheet,merge_format,cur_row,zhuanli_len,'是',col_num)
        col_num = merge_col(worksheet,merge_format,cur_row,zhuanli_len,'2020年',col_num)
        col_num = merge_col(worksheet,merge_format,cur_row,zhuanli_len,'发明专利',col_num)

        for j in range(zhuanli_len):
            worksheet.write(cur_row, col_num, zhuanli[j][4] + zhuanli[j][1])
            worksheet.write(cur_row, col_num+1, zhuanli[j][3])
            worksheet.write(cur_row, col_num+2, zhuanli[j][7])
            if j < logo_len:
                worksheet.write(cur_row, col_num+3, logo[j][2]) 
                worksheet.write(cur_row, col_num+4, logo[j][6])
                worksheet.write(cur_row, col_num+5, logo[j][3])
                worksheet.write(cur_row, col_num+6, logo[j][7])
            cur_row += 1

    workbook.close()

    a = 100

def read_json_file(f):
    with open(f, 'r') as load_f:
        load_dict = json.load(load_f, "utf-8")
        return load_dict

def get_web_data(json_path,dst_file):
    company_data = read_json_file(json_path)
    res = []
    for td in company_data:
        company = td[0]
        print(u'开始获取',company,'...')
        url = td[1]
        company_id = parse_company_id(url)
        if not company_id:
            print("can not find company id for ",url)
            continue

        t_info = {}
        t_info["zhuanli"] = get_zhuanli(company,company_id)
        t_info["logo"] = get_all_logo(company,company_id)
        t_info["title"] = company

        # basic_soup = get_soup("jibenxingxi.html")
        # start_time = get_start_time(basic_soup)
        t_info["start_time"] = ''
        res.append(t_info)
        print(u'获取',company,u'成功!')
    
    write_xlsx(res,dst_file)

def parse_company_id(url):
    if len(company_id_re.findall(url)) == 1:
        return company_id_re.sub(r'\1',url)
    return None

def get_registed_date(url):
    req = requests.get(url,cookies=get_cookie(),headers=headers)
    req_text = req.content
    soup = BeautifulSoup(req_text, 'html.parser', from_encoding="utf-8")
    res = soup.select('#searchlist > table:nth-child(4) > tbody > tr:nth-child(8) > td:nth-child(4)')
    res = res[0].text.strip()
    return res

def main(json_path,dst_file):
    ss = sys.getdefaultencoding()
    reload(sys)
    sys.setdefaultencoding('utf-8')
    web_data = get_web_data(json_path,dst_file)
    sys.setdefaultencoding(ss)
    pass

if __name__ == "__main__":
    
    global cookie_str
    if len(sys.argv) >= 3:
        pwd = os.getcwd()
        os.chdir(pwd)
        
        config_file = sys.argv[1]
        cookie_file = sys.argv[2]
        dst_file = "output.xlsx"
        with open(cookie_file,"r") as f:
            cookie_str = f.read().rstrip()
        
        if len(sys.argv) == 4:
            dst_file = sys.argv[3]
        main(sys.argv[1],dst_file)
        print(u"工作结束!")
    else:
        print('usage: python zhuanli.py config.json cookie dstpath')