# -*- coding:utf-8 -*-
from __future__ import print_function
import os,sys,json
import xlsxwriter

def file_without_extension(path):
    return os.path.splitext(os.path.basename(path))[0]

def get_data(json_dt):
    res = []
    # level
    res.append(json_dt["result"]["userLevel"]["level"])
    # prevLevelReward
    res.append(json_dt["result"]["userLevel"]["prevLevelReward"])
    # balanceInCoins
    res.append(json_dt["result"]["userStatus"]["balanceInCoins"])
    # freeSpins
    res.append(json_dt["result"]["spinResult"]["freeSpins"])
    # totalFreeSpins
    res.append(json_dt["result"]["spinResult"]["totalFreeSpins"])
    # totalBet
    res.append(json_dt["result"]["spinResult"]["totalBet"])
    # winAmount
    res.append(json_dt["result"]["spinResult"]["winAmount"])

    return res

def write_xlsx(file_path,json_data):
    workbook = xlsxwriter.Workbook(file_path)
    worksheet = workbook.add_worksheet()
    col_val = ["level","prevLevelReward","balanceInCoins","freeSpins","totalFreeSpins","totalBet","winAmount"]
    for i,x in enumerate( col_val):
        worksheet.write(0,i,x)
    for i,x in enumerate(json_data):
        res = get_data(x)
        for j,y in enumerate(res):
            worksheet.write(i+1,j,y)
    workbook.close()

def read_txt(file_path):
    with open(file_path,'r') as f:
        contents = f.read()

        bracket_stack = []
        range_arr = []
        for i,c in enumerate(contents):
            if c == '{':
                if len(bracket_stack) == 0:
                    range_arr.append([i])
                bracket_stack.append(c)
            elif c == '}':
                bracket_stack.pop()
                if len(bracket_stack) == 0:
                    range_arr[-1].append(i+1)
        json_arr = []
        try:
            for x in range_arr:
                json_arr.append(json.loads( contents[x[0]:x[1]],encoding="utf-8"))
        except Exception as e:
            print(u'解析内容出错')
            return None
        return json_arr

def main():
    pass
    if len(sys.argv) >= 2:
        for pt in sys.argv[1:]:
            json_arr = read_txt(pt)
            if json_arr:
                dir_name = os.path.dirname(pt)
                b_name = file_without_extension(pt)
                new_name = os.path.join(dir_name,b_name+".xlsx")
                write_xlsx(new_name,json_arr)
            else:
                print(u'不能解析',pt,'请核实文件内容')


if __name__ == "__main__":
    main()