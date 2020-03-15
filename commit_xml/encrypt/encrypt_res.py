# -*- coding: utf-8 -*
#该脚本用于加密png图片 使用python3以上版本解释执行
 
import os,sys,json
import time

def open_json_file(f):
    with open(f,'r') as load_f:
        load_dict = json.load(load_f)
        return load_dict

js_data = open_json_file(sys.argv[1])
CUR_DIR = sys.argv[2]
# os.getcwd();
# print("cur_dir:",CUR_DIR)
#CUR_DIR = 'C:\\Users\\chenguanzhou\\Desktop'
_KEY = js_data.get('key')
# 'jiaozi2013' #指定加密秘钥,英文
_ENCRYSIG = js_data.get('sign')
# 'jiaozhi'
_PNGSIG = bytes([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])
_PNGIEND = bytes([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82])
 #获取filesig是否是png
def isPNGSig(bytes_8):
    return bytes_8 == _PNGSIG
 
def isPNG(absPath):#判断是否是PNG图片
    """
    :param absPath: 文件的绝对路径
    :return: {Bool}
    """
    isFile = os.path.isfile(absPath)
    hasPNGSig = False
    fileExt = os.path.splitext(absPath)[1]
    isPngExt = (fileExt == ".png" or fileExt == ".PNG")
    if isFile and isPngExt:
        with open(absPath,"rb") as file:
            hasPNGSig = isPNGSig(file.read(8)[:8])
    return isFile and isPngExt and hasPNGSig
 
def preProcessPng(pngData):#预处理图片数据
    """
    剪掉png的signature(8bytes),IEND(12Bytes)
    :param pngData:
    :return:
    """
    assert type(pngData) == bytes
    lostHeadData = pngData[8:]
    iendData = lostHeadData[-12:]
    if iendData == _PNGIEND:#防止Png已经进行过外部软件的压缩,丢掉了IEND
        return lostHeadData[:-12]
    else:
        return lostHeadData
 
def encryption(fileData,key):#加密操作 ascii占一个字节
    """
    加密png数据
    :param fileData:{bytes}预处理后的png数据
    :param key:{str}秘钥
    :return:{bytes}加密后的数据
    """
    assert type(key) is str
    k = bytes(key,"utf8")
    klen= len(k)
    kindex = 0
    fileData = bytearray(fileData)
    for i,v in enumerate(fileData):
        if kindex >= klen:
            kindex = 0
        fileData[i] = v ^ k[kindex]#加密
        kindex = kindex + 1
    return bytes(_ENCRYSIG,"utf8") + fileData
 
#处理图片
def processPNG(filePath):
    global filenum
    fileData = None
    with open(filePath,'rb') as file:
        fileData = encryption(preProcessPng(file.read()),_KEY)
    os.remove(filePath)
    with open(filePath,'wb') as file: #覆盖新文件
        file.write(fileData)
    filenum = filenum + 1
 
 
 
def traverseDir(absDir):#遍历当前目录以及递归的子目录，找到所有的png图片
    """
    :param absDir: 要遍历的路径
    :return: None
    """
    assert (os.path.isdir(absDir) and os.path.isabs(absDir))
    dirName = absDir
    for fileName in os.listdir(absDir):
        absFileName = os.path.join(dirName,fileName)
        print("isPNG:",absFileName)
        if os.path.isdir(absFileName):#递归查找文件夹
            print("absFileName:",absFileName)
            traverseDir(absFileName)
        elif isPNG(absFileName):
            print("isPNG:",absFileName)
            processPNG(absFileName)
        else:
            pass
 
 
 #------------------- 主函数-------------------------#
start_clock = time.clock()
filenum = 0
#traverseDir(os.path.join(CUR_DIR,"png2"))
traverseDir(CUR_DIR)
end_clock = time.clock()
time = (end_clock - start_clock)*1000
print("encrypt %d Png Pictures"%filenum)
print("use time %fms"%time)

print("js_data",js_data)