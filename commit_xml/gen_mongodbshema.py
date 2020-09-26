import subprocess
import os,sys,shutil,json

def read_json_fromfile(file_path):
    with open(file_path,"r") as f:
        lines = f.readlines()
        return json.loads(lines[1])

def find_wanted_tbl(json_data,key):
    for x in json_data:
        if x["k"] == key:
            return x

def numstr2key(ck,numstr):
    for key in ck:
        if ck[key] == numstr:
            return key

def replace_numstr2key1(ck,ck_val,out):
    for x in ck_val["v"]:
        t1 = ck_val["v"][x]
        t2 = ck["v"][x]

        t3 = {}
        for y in t1:
            ty = t1[y]
            if type(ty) == int or type(ty) == float:
                if ty == 0:
                    t3[numstr2key(t2,y)] = {"type":"Number","default":0}
                else:
                    t3[numstr2key(t2,y)] = "Number"
            else:
                if ty == "":
                    t3[numstr2key(t2,y)] = {"type":"String","default":""}
                else:
                    t3[numstr2key(t2,y)] = "String"
        out[x] = t3

def replace_numstr2key2(ck,ck_val,out):
    for x in ck_val["v"]:
        t1 = ck_val["v"][x]
        t2 = ck["v"][x]

        t3 = {}

        for z in t1:
            for y in t1[z]:
                ty = t1[z][y]
                if type(ty) == int or type(ty) == float:
                    if ty == 0:
                        t3[numstr2key(t2,y)] = {"type":"Number","default":0}
                    else:
                        t3[numstr2key(t2,y)] = "Number"
                else:
                    if ty == "":
                        t3[numstr2key(t2,y)] = {"type":"String","default":""}
                    else:
                        t3[numstr2key(t2,y)] = "String"
            break

        out[x] = [t3]

        
def main():
    file_path = "/Users/tangwen/Documents/my_projects/js_project/new_account/web_sockets_guide4/server.ftaro.com_000009_server.bin.decode.push"

    json_data = read_json_fromfile(file_path)

    ck = find_wanted_tbl(json_data,"ck")
    c1 = find_wanted_tbl(json_data,"c1")
    c2 = find_wanted_tbl(json_data,"c2")

    out = {}
    replace_numstr2key1(ck,c1,out)
    replace_numstr2key2(ck,c2,out)
    print(out)
    a = 100
    pass

if __name__ == "__main__":
    main()   