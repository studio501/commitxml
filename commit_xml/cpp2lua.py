from __future__ import division
import sys,os,re
from os import listdir
from os.path import isfile, join

# thanks a lot to https://pythex.org/

# 非空白字符
NoneBlankRe = re.compile(r'\S')

# 正则匹配表达式
# re of '{' and '}'
LeftBraceRe = re.compile(r'{')
RightBraceRe = re.compile(r'}')
MixBraceRe = re.compile(r'[{}]')

# 注释
# CommentInLineRe = re.compile(r'\/\/|\/\*')
CommentCpp = ['//','/*']

# cpp 声明变量语句
DeclarRe = re.compile(r'(\w+)(\s+\*?\s*|\*?\s+)(\w+)\s*;+\s*')

# cpp 定义变量语句 含初始化
DefiniteRe = re.compile(r'(\w+)(\s+\*?\&?\s*|\*?\&?\s+)(\w+)\s*=\s*(.*?)\s*;+\s*')
# cpp 替换定义(初始化) 语句
RepDefiniteRe = re.compile(r'(\w+)(\s+[\*&]?|[\*&]?\s+)(\w+)(.*)')

# cpp 声明 & 定义数组
DecalrArrRe = re.compile(r'(\w+)(\s+\*?\s*|\*?\s+)(\w+)(\[\w+\])\s*;+\s*')
DefiniteArrRe = re.compile(r'(\w+)(\s+\*?\s*|\*?\s+)(\w+)(\[\w+\])\s*=\s*(\{.*?\})\s*;+\s*')

# cpp 赋值语句
AssignmentRe = re.compile(r'(\S+)\s*=\s*(\S+)\s*;+\s*')
# CCARRAY_FOREACH => for _,x in ipairs() do
CCARRAY_FOREACH_Re = re.compile(r'CCARRAY_FOREACH\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)(.*)')
# CCDICT_FOREACH => for _,x in pairs() do
CCDICT_FOREACH_Re = re.compile(r'CCDICT_FOREACH\w*\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)(.*)')
# CCARRAY_FOREACH_REVERSE => for _,x in ripairs() do
CCARRAY_FOREACH_REVERSE_Re = re.compile(r'CCARRAY_FOREACH_REVERSE\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)(.*)')
# for(auto it=x.begin();it!=x.end();++id) = > for _,it in ipairs(x) do
for_iterator_re = re.compile(r'for\s*\(\s*\w+\s+(\w+)\s*=\s*(\w+)\.begin.*\)(.*)')
for_iterator_re2 = re.compile(r'for\s\(.*;\s*(\w+)\s*[!=]=\s*(\w+).end\(\s*\)\s*;.*\)(.*)')
# for(int i=0;i<count;i++) => for i=0,count do
for_normal_re = re.compile(r'for\s*\(\s*\w+\s+(\w+)\s*=\s*(\w+)\s*;\s*\w+\s*([\S])\s*(\w+)\s*;\s*(.*)\s*\)(.*)')
# if or else if => lua if or elseif
if_else_if_re = re.compile(r'(else\s+)?(if)\s*\((.*)\)')
# 转型

# 用户自定接口部分
def _user_la_ForLua(m):
    # r'\1ForLua:call("\2",\3)'
    return '{0}ForLua:call("{1}"{2})'.format(m.group(1),m.group(2),'' if len( m.group(3).split()) == 0 else ', ' + m.group(3) )
def _user_la(m):
    return '{0}:call("{1}"{2})'.format(m.group(1),m.group(2),'' if len( m.group(3).split()) == 0 else ', ' + m.group(3) )

def _user_LocalController_la(m):
    return 'LocalController:call("shared"):call("DBXMLManager"):call("{0}"{1})'.format(m.group(2),'' if len( m.group(3).split()) == 0 else ', ' + m.group(3) )

Equal_Map_of_find = {"=":'',"!":'not '}
    
def _user_find_la(m):
    return '{0}table.findVar( {1}, {2})'.format(Equal_Map_of_find[m.group(3)],m.group(1),m.group(2))

def _user_enum_la(m):
    pass

User_Custom_Part = [
    # CCSafeNotificationCenter
    {"pattern":re.compile(r'(CCSafeNotificationCenter\s*)(::sharedNotificationCenter\s*\(\s*\)\s*->\s*)(postNotification)'),"repl":r'\1:\3'},
    # ::getInstance => .getInstance
    {"pattern":re.compile(r'(::)(getInstance)'),"repl":r'.\2'},
    # ->_string => ''
    {"pattern":re.compile('->_string'),"repl":''},
    # cast => ''
    {"pattern":re.compile(r'(\w+_cast<.*?>)\s*\((.*)\)\s*'),"repl":r'\2'},
    # arr->objectAtIndex(j) => arr[j]
    {"pattern":re.compile(r'(\w+)->objectAtIndex\(\s*(.*?)\s*\)'),"repl":r'\1[\2]'},
    # params->valueForKey("gold")->intValue() => params["gold"]
    {"pattern":re.compile(r'(\w+)->valueForKey\(\s*(\S+?)\s*\)->\w+\(.*?\)'),"repl":r'\1[\2]'},
    # CCCommonUtils::splitString => string.split
    {"pattern":re.compile(r'CCCommonUtils\s*::\s*splitString\(\s*(\w+)\s*,\s*\"(.*)\"\s*,\s*(\w+)\s*\)'),"repl":r"\3 = string.split(\1,'\2')"},
    # CCCommonUtils:: => CCCommonUtilsForLua:call
    {"pattern":re.compile(r'(CCCommonUtils)\s*::\s*(\w+)\((.*?)\)'),"repl":lambda m: _user_la_ForLua(m)},
    # GlobalData::shared() => GlobalData:call
    {"pattern":re.compile(r'(GlobalData)\s*::shared\(\s*\)\s*->\s*(\w+)\((.*?)\)'),"repl":lambda m: _user_la(m)},
    # CCXXX::create(y) => y
    {"pattern":re.compile(r'CC(\w+)\s*::\s*create\s*\((\s*\S+\s*)\)'),"repl":r'\2'},
    # arr->addObject(x) => table.insert(arr,x)
    {"pattern":re.compile(r'(\w+)\s*->\s*addObject\s*\((.*)\)'),"repl":r'table.insert(\1,\2)'},
    # it->first => key
    {"pattern":re.compile(r'(\w+)\s*->\s*first'),"repl":r'\1_key'},
    # it->second => it
    {"pattern":re.compile(r'((\w+)\s*->\s*second)'),"repl":r'\1'},
    # arr->count() => #arr
    {"pattern":re.compile(r'(\w+)\s*->\s*count\(\s*\)'),"repl":r'#\1'},
    # x.find() == x.end() => table.find
    {"pattern":re.compile(r'(\w+)\s*\.\s*find\((\w+)\)\s*([!=])=\s*\1\s*\.\s*end\(\s*\)'),"repl":lambda m: _user_find_la(m)},
    # NULL,nullptr => nil
    {"pattern":re.compile(r'(NULL|nullptr)'),"repl":'nil'},
    # CCLOG => cclog
    {"pattern":re.compile(r'(CCLOG)'),"repl":'-- cclog'},
    # 三元运算符 => lua and or
    {"pattern":re.compile(r'=(.*?)\?(.*?):(.*)'),"repl":r'= \1 and \2 or \3'},
    # .clear() => = {}
    {"pattern":re.compile(r'(\w+)\s*\.\s*clear\(\s*\)'),"repl":r'\1 = {}'},
    # getGroupByKey => CCCommonUtilsForLua:getGroupByKey
    {"pattern":re.compile(r'(LocalController\s*::\s*shared\s*\(\s*\)\s*->\s*DBXMLManager\(\s*\))\s*->\s*getGroupByKey\s*\((.*)\)'),"repl":r'CCCommonUtilsForLua:getGroupByKey( \2 )'},
    # LocalController = > lua LocalController
    {"pattern":re.compile(r'(LocalController\s*::\s*shared\s*\(\s*\)\s*->\s*DBXMLManager\(\s*\))\s*->\s*(\w+)\s*\((.*)\)'),"repl":lambda m: _user_LocalController_la(m)},
    # string append => lua string.join
    # (\w+)\s*\.append\(\s*"(.*)"\s*\)
    {"pattern":re.compile(r'(\w+)\s*\.append\(\s*"(.*)"\s*\)'),"repl":r"string.join('',\1,'\2')"},
    # cmd class => utils.requestServer
    # (.*)new\s+(\w+)Command\((.*)\)
    {"pattern":re.compile(r'(.*)new\s+(\w+)(Command|Cmd)\((.*)\)'),"repl":r"utils.requestServer('\2',nil,nil,function (tbl) end)"},
    # enum => enum
    # \s*enum\s+(\w+)\s*[{]?\n+(\s*(\w+)\s*,?\n+)+\s*\}\s*;
    {"pattern":re.compile(r'enum\s+(\w+)\s*[{]?\n+(\s*(\w+)\s*,?\n+)+\s*\}\s*;'),"repl":r"utils.requestServer('\2',nil,nil,function (tbl) end)"},
]


# cpp CCArray,CCDictionary => {}
Arr_Dic_Re = re.compile(r'((CCArray|CCDictionary):+create\(\s*\))')


# cpp 去掉 iterator of map. eg: it->second => it 或者 (*it).second => it
CppMapIterator1Re = re.compile(r'(\w+)->(second)')
CppMapIterator2Re = re.compile(r'\(\s*\*(\w+)\s*\)\.(second)')

# cpp -> 和 . 先使用 CppArrow2Func 再 CppArrow2Value
CppArrow2Func = re.compile(r'(->)(\w+\(.*?\))')
CppArrow2Value = re.compile(r'(->)(\w+)')
DbSemi2One = re.compile(r'(::)')


# cpp 语句结束符 ;
Cpp_end_line_Re = re.compile(r';\s*$')
# 去掉 cpp 语句 ;
Cpp_trim_end_semil_Re = re.compile(r'(.*)(;)\s*$')

# cpp 函数
Cpp_Normal_Fun_Re = re.compile(r'(\w+)(\s+)(\w+)\((.*)\)')
Cpp_ClassMember_Fun_Re = re.compile(r'(.*?)\s*\n*\s*[*&]?\s*\n*\s*(\w+)\s*\n*\s*::\s*\n*\s*(\w+)\s*\n*\s*\(\s*\n*\s*((?:.*?\n*){0,100}?)\n*\s*\n*\)\s*\n*\{',re.MULTILINE)
Switch_Re = re.compile(r'^\s*switch(\s*)\((.*)\)')
For_Gramma_Re = re.compile(r'^\s*for\s*\n*\s*\n*\((.*)\n*(.*)\n*(.*)\)\{?',re.MULTILINE)

If_Gramma_Re = re.compile(r'^\s*if\s*\n*\s*\((.*?)\)\s*\n*(\{+)\s*\n*',re.MULTILINE)
ElseIf_Gramma_Re = re.compile(r'^\s*\}?\s*else if\s*\n*\s*\((.*?)\)\s*\n*(\{+)\s*\n*',re.MULTILINE)
Else_Gramma_Re = re.compile(r'^\s*\}?\s*else\s*\n*\s*\n*(\{+)\s*\n*',re.MULTILINE)

Empty_Re = re.compile(r'^\s*\{\}?$')
Enum_Re = re.compile(r'\s*enum\{?')
Class_Re = re.compile(r'\s*class\s+(\w+)\s*:\n*\s*public\s+(\w+)\s*\n*\{',re.MULTILINE)

SingleWord_If_Re = re.compile(r'^\s*if\s*\n*\s*\((.*)\)\s*\n*(.*;)',re.MULTILINE)
SingleWord_ElseIf_Re = re.compile(r'^\s*\}?\s*else if\s*\n*\s*\((.*)\)\s*\n*(.*;)',re.MULTILINE)
SingleWord_Else_Re = re.compile(r'^\s*\}?\s*else\s*\n*\s*\n*(.*;)',re.MULTILINE)
SingleWord_Re_Arr = [SingleWord_If_Re,SingleWord_ElseIf_Re,SingleWord_Else_Re]

# block 类型
BlockRe2Type =  {Cpp_Normal_Fun_Re:"normal_function",
                Cpp_ClassMember_Fun_Re:"cls_mem_function",
                Switch_Re:"switch_gramma",
                For_Gramma_Re:"for_gramma",
                If_Gramma_Re:"if_gramma",
                ElseIf_Gramma_Re:"elseif_gramma",
                Else_Gramma_Re:"else_gramma",
                SingleWord_If_Re:"if_gramma_sg",
                SingleWord_ElseIf_Re:"elseif_gramma_sg",
                SingleWord_Else_Re:"else_gramma_sg",
                Empty_Re:"empty_block",
                Enum_Re:"enum_block",
                Class_Re:"class_block",

                }

# 以{ 结尾
End_With_Left_Brace = re.compile(r'\{(\s*)$')
End_With_Right_Brace = re.compile(r'\}(\s*)$')
# 以{ 开头
Start_With_Left_Brace = re.compile(r'^(\s*)\{')

# 头文件 .h member func
Header_H_memFunc = re.compile(r'(.*?)\s+(\w+)\s*\(.*?\)\s*;')
# 头文件 .h member func
Header_H_memValue = re.compile(r'(.*?)\s+(\w+)\s*;')

# 公用函数
def isStringNil(str):
	return (not str) or str == '' or len(str.split()) == 0

def append_by_table(tb1,tb2):
	for x in tb2:
		tb1.append(x)

def table_is_empty(tb):
	return not tb or len(tb) == 0

def read_file(fileName):
    file_data = None
    with open(fileName,'r') as f:
        file_data = f.readlines()
    return file_data

def trim_cpp_comment_full(line):
    for x in CommentCpp:
        pos = line.find(x)
        if pos > -1:
            return line[:pos],line[pos:]

    return line,''

def trim_cpp_comment(line):
    content_part,comment_part = trim_cpp_comment_full(line)
    return content_part

class Line_class():
    def __init__(self,line,sign_re=None):
        self.m_line = line
        self.m_luaLine = line
        self.m_sign_re = sign_re
        self.m_had_convert = False

        # trim left blank
        self.m_leftBlank,self.m_noLeftBlankLine = self.getLine_leftblank(line)
        # trim comment
        self.m_no_comment_part,self.m_comment_part = trim_cpp_comment_full(self.m_noLeftBlankLine)
        # change lauguage rule
        self.getLuaLine()
        # trim semicolum
        self.m_luaLine = self.trimSemi(self.m_luaLine)
    def reset_convert_flag(self):
        self.m_had_convert = False

    def isValid(self):
        if not self.m_sign_re:
            return True

        trim_comment_line = self.getTrimCommentLine()
        sign_res = self.m_sign_re.findall(trim_comment_line)
        return len(sign_res) == 1

    def getTrimCommentLine(self):
        return trim_cpp_comment(self.m_line)
    
    def getLine_leftblank(self,srcStr):
        res = NoneBlankRe.search(srcStr)
        if res:
            start_idx = res.start()
            if start_idx > -1:
                return srcStr[:start_idx],srcStr[start_idx:]
        
        return '',srcStr
    def handleArrow(self,srcStr):

        # # ::getInstance => .getInstance
        # r1 = re.compile(r'(::)(getInstance)')
        # srcStr = r1.sub(r'.\2',srcStr)
        
        # # ->_string => ''
        # srcStr = re.sub('->_string','',srcStr)

        # # cast => ''
        # srcStr = re.sub(r'(\w+_cast<.*?>)\s*\((.*)\)\s*',r'\2',srcStr)
        
        # # arr->objectAtIndex(j) => arr[j]
        # srcStr = re.sub(r'(\w+)->objectAtIndex\(\s*(.*?)\s*\)',r'\1[\2]',srcStr)

        # # params->valueForKey("gold")->intValue() => params["gold"]
        # r1 = re.compile(r'(\w+)->valueForKey\(\s*(\S+?)\s*\)->\w+Value\(.*?\)')
        # srcStr = r1.sub(r'\1[\2]',srcStr)

        # User cumstom handles
        for x in User_Custom_Part:
            re_cp = x["pattern"]
            repl = x["repl"]
            srcStr = re_cp.sub(repl,srcStr)

            # self.m_luaLine = self.m_sign_re.sub(lambda m : tFun(m),self.m_luaLine)


        srcStr = CppMapIterator1Re.sub(r'\1' ,srcStr)
        srcStr = CppMapIterator2Re.sub(r'\1' ,srcStr)

        srcStr = CppArrow2Func.sub(r':\2',srcStr)
        srcStr = CppArrow2Value.sub(r'.\2',srcStr)

        srcStr = DbSemi2One.sub(':',srcStr)

        return srcStr

    def trimSemi(self,srcStr):
        return Cpp_trim_end_semil_Re.sub(r'\1',srcStr)

    def getLuaLine(self):
        if not self.m_had_convert:
            self.m_had_convert = True

            self.trans2lua()
        return self.m_leftBlank + self.m_luaLine

    def trans2lua(self):
        self.m_luaLine = self.handleArrow(self.m_no_comment_part)


class DeclarInLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,DeclarRe)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = DeclarRe.sub(r'local \3',self.m_no_comment_part)

class DefiniteInLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,DefiniteRe)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.handleArrow(self.m_no_comment_part)
            self.m_luaLine = RepDefiniteRe.sub(r'local \3\4',self.m_luaLine)
            self.m_luaLine = Arr_Dic_Re.sub(r'{}',self.m_luaLine)

class DeclarArrInLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,DecalrArrRe)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.m_sign_re.sub(r'local \3 = {}',self.m_no_comment_part)

class DefiniteArrInLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,DefiniteArrRe)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.handleArrow(self.m_no_comment_part)
            self.m_luaLine = self.m_sign_re.sub(r'local \3 = \5',self.m_luaLine)

class AssignmentInLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,AssignmentRe)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.handleArrow(self.m_no_comment_part)
            self.m_luaLine = self.m_sign_re.sub(r'\1 = \2',self.m_luaLine)

class CCARRAY_FOREACH_InLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,CCARRAY_FOREACH_Re)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.handleArrow(self.m_no_comment_part)
            def tFun(m):
                if m.group(3).count('}') == 1:
                    s = re.sub(r'\{([^;]*)(;+)\}',r'\1',m.group(3))
                    return 'for _,{0} in ipairs( {1} ) do {2} end'.format(m.group(2),m.group(1),s)
                else:
                    return 'for _,{0} in ipairs( {1} ) do'.format(m.group(2),m.group(1))
            self.m_luaLine = self.m_sign_re.sub(lambda m : tFun(m),self.m_luaLine)

class CCARRAY_FOREACH_REVERSE_InLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,CCARRAY_FOREACH_REVERSE_Re)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.handleArrow(self.m_no_comment_part)
            def tFun(m):
                if m.group(3).count('}') == 1:
                    s = re.sub(r'\{([^;]*)(;+)\}',r'\1',m.group(3))
                    return 'for _,{0} in ripairs( {1} ) do {2} end'.format(m.group(2),m.group(1),s)
                else:
                    return 'for _,{0} in ripairs( {1} ) do'.format(m.group(2),m.group(1))
            self.m_luaLine = self.m_sign_re.sub(lambda m : tFun(m),self.m_luaLine)


class CCDICT_FOREACH_InLine(Line_class):
    def __init__(self,line,sign_re = CCDICT_FOREACH_Re):
        Line_class.__init__(self,line,sign_re)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.handleArrow(self.m_no_comment_part)
            def tFun(m):
                if m.group(3).count('}') == 1:
                    s = re.sub(r'\{([^;]*)(;+)\}',r'\1',m.group(3))
                    return 'for {3},{0} in pairs( {1} ) do {2} end'.format(m.group(2),m.group(1),s,m.group(1) + '_key')
                else:
                    return 'for {2},{0} in pairs( {1} ) do'.format(m.group(2),m.group(1),m.group(1) + '_key')
            self.m_luaLine = self.m_sign_re.sub(lambda m : tFun(m),self.m_luaLine)

class for_iterator_InLine(Line_class):
    def __init__(self,line):
        self.m_sign_re2 = for_iterator_re2
        Line_class.__init__(self,line,for_iterator_re)

    def trans2lua(self):
        use_rep = self.m_sign_re
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 0:
            use_rep = self.m_sign_re2
            sign_res = use_rep.findall(self.m_no_comment_part)

            
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.handleArrow(self.m_no_comment_part)
            def tFun(m):
                if m.group(3).count('}') == 1:
                    s = re.sub(r'\{([^;]*)(;+)\}',r'\1',m.group(3))
                    return 'for {3},{0} in ipairs( {1} ) do {2} end'.format(m.group(1),m.group(2),s,m.group(1) + '_key')
                else:
                    return 'for {2},{0} in ipairs( {1} ) do'.format(m.group(1),m.group(2),m.group(1) + '_key')
            self.m_luaLine = use_rep.sub(lambda m : tFun(m),self.m_luaLine)

    def isValid(self):
        trim_comment_line = self.getTrimCommentLine()
        sign_res = self.m_sign_re.findall(trim_comment_line)
        if len(sign_res) == 1:
            return True

        sign_res = self.m_sign_re2.findall(trim_comment_line)
        if len(sign_res) == 1:
            return True

        return False
        


class for_normal_InLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,for_normal_re)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.handleArrow(self.m_no_comment_part)
            def tFun(m):
                inc = m.group(5)
                inc_str = ''
                if inc.count('++') == 1:
                    inc_str = ''
                elif inc.count('--') == 1:
                    inc_str = ', -1'
                elif inc.count('+=') == 1:
                    inc_str = re.sub(r'\w+\s*\+=\s*(\w+)',r', \1',inc)
                elif inc.count('-=') == 1:
                    inc_str = re.sub(r'\w+\s*\-=\s*(\w+)',r', -\1',inc)
                

                if m.group(6).count('}') == 1:
                    s = re.sub(r'\{([^;]*)(;+)\}',r'\1',m.group(6))
                    return 'for {0} = {1}, {2}{3} do {4} end'.format(m.group(1),m.group(2),m.group(4),inc_str,s)
                else:
                    return 'for {0} = {1}, {2}{3} do'.format(m.group(1),m.group(2),m.group(4),inc_str)
            self.m_luaLine = self.m_sign_re.sub(lambda m : tFun(m),self.m_luaLine)

class if_else_if_InLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,if_else_if_re)

    def trans2lua(self):
        sign_res = self.m_sign_re.findall(self.m_no_comment_part)
        if len(sign_res) == 1:
            pass
            self.m_luaLine = self.handleArrow(self.m_no_comment_part)
            def tFun(m):
                head_str = m.group(1).rstrip() + m.group(2) if m.group(1) else m.group(2)
                content_str = m.group(3)
                content_str = re.sub('!=','~=',content_str)
                content_str = re.sub('&&',' and ',content_str)
                content_str = re.sub(r'\|\|',' or ',content_str)
                return head_str + ' ' + content_str
            self.m_luaLine = self.m_sign_re.sub(lambda m : tFun(m),self.m_luaLine)

Line_parse_order = [
    CCARRAY_FOREACH_InLine,
    CCARRAY_FOREACH_REVERSE_InLine,
    CCDICT_FOREACH_InLine,
    for_iterator_InLine,
    for_normal_InLine,
    if_else_if_InLine,
    DeclarArrInLine,
    DefiniteArrInLine,
    DeclarInLine,
    DefiniteInLine,
    AssignmentInLine,


    Line_class,
]

# 一行里的 花括号匹配
class BraceInLine():
    def __init__(self,line):
        self.m_line = line
        self.m_braceArr = MixBraceRe.findall(line)
        self.m_hasBrace = len(self.m_braceArr) > 0

    def changeStack(self,outerStack):
        if self.has_brace():
            for x in self.m_braceArr:
                if x == '{':
                    outerStack.append(x)
                else:
                    if len(outerStack) > 0:
                        outerStack.pop()

                    if len(outerStack) == 0:
                        break


    def has_brace(self):
        return self.m_hasBrace

    

# cpp 里一个code block
class Cpp_code_block():
    def __init__(self,lines_arr,currentIdx,sign_re=None,class_def=[]):
        self.m_blockType = "default"
        self.m_lines_arr = lines_arr
        self.m_currentIdx = currentIdx
        self.m_blockStartIdx = currentIdx

        self.m_sign_re = sign_re
        self.m_class_def = class_def
        self.m_validBlock = None

        self.checkValidBlock()

    def get_head_gap(self):
        # return '\n'.join(self.m_lines_arr[self.m_currentIdx:min(self.m_blockStartIdx+1,len(self.m_lines_arr))])
        return self.m_multi_line_head

    def parse_block_type(self):
        if not self.m_sign_re:
            return
        
        if self._isValidBlock():
            lines_arr = self.m_lines_arr
            currentIdx = max(self.m_currentIdx,self.m_blockStartIdx) #self.m_currentIdx
            first_line,_ = self.get_first_line(lines_arr,currentIdx)
            
            t_trim_line = trim_cpp_comment(first_line)
            pts = [self.m_multi_line_head,t_trim_line]
            for trim_line in pts:
                sign_res = self.m_sign_re.findall(trim_line)
                if len(sign_res) == 1:
                    if self.m_sign_re == Else_Gramma_Re:
                        if trim_line.count('else if') == 1:
                            return
                    self.m_blockType = BlockRe2Type[self.m_sign_re] or 'must_set'
                    break

    def get_block_type(self):
        return self.m_blockType if self._isValidBlock() else 'none'

    def is_followd_by_left_brace(self):
        lines_arr = self.m_lines_arr
        currentIdx = self.m_currentIdx

        self.m_blockStartIdx = currentIdx
        multi_line_endIdx = currentIdx
        trim_lines = []
        for i in range(currentIdx,len(lines_arr)):
            t_line = lines_arr[i]
            trim_lines.append(trim_cpp_comment(t_line))
            if t_line.count('{') == 1:
                multi_line_endIdx = i
                self.multi_line_endIdx = multi_line_endIdx
                break

        multi_lines = '\n'.join(trim_lines)
        self.m_multi_line_head = multi_lines
        re_res = self.m_sign_re.findall(multi_lines)
        if len(re_res) == 1:
            return True


        # first_line,first_idx = self.get_first_line(lines_arr,currentIdx)
        # re_res = End_With_Left_Brace.findall(trim_cpp_comment(first_line))
        # self.m_blockStartIdx = first_idx
        # if len(re_res) == 1:
        #     return True

        
        
        # if first_idx+1 < len(lines_arr):
        #     next_line,next_line_idx = self.get_first_line(lines_arr,first_idx+1)
        #     next_line = trim_cpp_comment(next_line)
        #     re_res = Start_With_Left_Brace.findall(next_line)
        #     if len(re_res) == 1:
        #         return True
        #     another_check_endbrace_chance = self.m_sign_re == ElseIf_Gramma_Re or self.m_sign_re == Else_Gramma_Re
        #     if another_check_endbrace_chance:
        #         re_res = End_With_Left_Brace.findall(trim_cpp_comment(next_line))
        #         if len(re_res) == 1:
        #             self.m_blockStartIdx = next_line_idx
        #             return True
        #         if next_line.count('{') == next_line.count('}'):
        #             re_res = End_With_Right_Brace.findall(trim_cpp_comment(next_line))
        #             if len(re_res) == 1:
        #                 self.m_blockStartIdx = next_line_idx
        #                 return True

        return False

    def get_first_line(self,lines_arr,currentIdx):
        line_idx = currentIdx
        for i in range(currentIdx,len(self.m_lines_arr)):
            t_line = self.m_lines_arr[i]
            if isStringNil(t_line):
                continue

            line_idx = i
            return t_line,line_idx

    
    def checkValidBlock(self):
        if not self.is_followd_by_left_brace():
            return
        # print("checkValidBlock,,,",self.m_currentIdx)
        # for i in range(self.m_currentIdx,len(self.m_lines_arr)):
        brace_stack = []
        check_flag = False
        start_block_idx = max(self.m_currentIdx,self.m_blockStartIdx)
        start_idx = start_block_idx
        end_idx = start_idx
        for i in range(start_block_idx,len(self.m_lines_arr)):
            t_line = self.m_lines_arr[i]
            if isStringNil(t_line):
                continue

            brace_in_line = BraceInLine(t_line)

            if brace_in_line.has_brace():
                if not check_flag:
                    check_flag = True
                    start_idx = i
                    brace_stack.append('{')

                    if t_line.count('{') == t_line.count('}'):
                        re_res = End_With_Right_Brace.findall(trim_cpp_comment(t_line))
                        if len(re_res) == 1:
                            end_idx = i
                            brace_stack.pop()
                else:
                    brace_in_line.changeStack(brace_stack)
                if len(brace_stack) == 0:
                    end_idx = i
                    break
        self.m_validBlock = [start_idx,end_idx]

        self.parse_block_type()

    def getValidBlock(self):
        return self.m_validBlock

    def _isValidBlock(self):
        return (self.m_validBlock and len(self.m_validBlock) == 2)

    def isValidBlock(self):
        return self._isValidBlock() and (
            not self.m_sign_re or self.m_blockType != 'default'
        )
    def head_line_to_lua(self):
        return Line_class(self.m_multi_line_head).getLuaLine()

# 单个语句block 主要用于 if else
class single_word_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx,sign_re):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,sign_re)
    
    def checkValidBlock(self):
        if not self.has_key_word():
            return
        
        start_idx = max(self.m_currentIdx,self.m_blockStartIdx)
        end_idx = start_idx

        start_ct_idx = start_idx
        for i in range(start_ct_idx,len(self.m_lines_arr)):
            t_line = self.m_lines_arr[i]
            if isStringNil(t_line):
                continue
            
            has_semi = len(Cpp_end_line_Re.findall(trim_cpp_comment(t_line))) == 1
            if has_semi:
                end_idx = i

                break
        self.m_validBlock = [start_idx,end_idx]

        self.parse_block_type()

    def parse_block_type(self):
        if not self.m_sign_re:
            return
        
        if self._isValidBlock():
            # lines_arr = self.m_lines_arr
            # currentIdx = max(self.m_currentIdx,self.m_blockStartIdx)
            # first_line,_ = self.get_first_line(lines_arr,currentIdx)
            # sign_res = self.m_sign_re.findall(trim_cpp_comment(first_line))
            sign_res = self.m_sign_re.findall(self.m_multi_line_head)
            if len(sign_res) == 1:
                if self.m_sign_re == SingleWord_If_Re and first_line.count('else if') == 1:
                    return
                self.m_blockType = BlockRe2Type[self.m_sign_re] or 'must_set'
    
    def has_key_word(self):
        lines_arr = self.m_lines_arr
        currentIdx = self.m_currentIdx

        self.m_blockStartIdx = currentIdx
        multi_line_endIdx = currentIdx
        trim_lines = []
        for i in range(currentIdx,len(lines_arr)):
            t_line = lines_arr[i]
            trim_lines.append(trim_cpp_comment(t_line))
            if t_line.count(';') == 1:
                multi_line_endIdx = i
                self.multi_line_endIdx = multi_line_endIdx
                break

        multi_lines = '\n'.join(trim_lines)
        self.m_multi_line_head = multi_lines
        re_res = self.m_sign_re.findall(multi_lines)
        if len(re_res) == 1:
            return True
        


        # first_line,first_idx = self.get_first_line(lines_arr,currentIdx)
        # self.m_blockStartIdx = first_idx
        # for x in SingleWord_Re_Arr:
        #     re_res = x.findall(first_line)
        #     if len(re_res) == 1:
        #         return True
        

        # next_line,next_line_idx = self.get_first_line(lines_arr,first_idx+1)
        # self.m_blockStartIdx = next_line_idx
        # for x in SingleWord_Re_Arr:
        #     re_res = x.findall(next_line)
        #     if len(re_res) == 1:
        #         return True

        return False

# 空block {}
class empty_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,Empty_Re)

# 普通函数block
class function_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx,sign_re=None,class_def=[]):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,sign_re or Cpp_Normal_Fun_Re,class_def)

# 类成员函数block
class mem_function_block(function_block):
    def __init__(self, lines_arr,currentIdx,class_def):
        function_block.__init__(self,lines_arr,currentIdx,Cpp_ClassMember_Fun_Re,class_def)

    def start_parse(self):
        lines_arr = self.m_lines_arr
        valid_block = self.getValidBlock()
        head_gap = self.get_head_gap()

        result = []
        def mem_fn_(m):
            pass
            params = re.sub(r'(?:\s*.*?[*&]?\s+[*&]?(\w+\s*,?))',r'\1',m.group(4))
            return 'function {0}:{1}( {2} )'.format(m.group(2),m.group(3),params)
        self.m_mem_func_name = self.m_sign_re.sub(lambda m: mem_fn_(m),head_gap)
        result.append(self.m_mem_func_name)

        block_arr = [if_else_block,for_block,switch_block,empty_block]
        # lineparse_arr = []
        i = valid_block[0] + 1
        while i < valid_block[1] + 1:
            t_block = None
            if i == 4:
                a = 100
                b = 10
            while True:
                for block_type in block_arr:
                    block = block_type(lines_arr,i)
                    if block.isValidBlock():
                        t_block = block
                        break
                



                # line
                break

            inc_delta = 1
            if t_block:
                result.append(t_block.head_line_to_lua())
                pass
            else:
                pass
                for x in Line_parse_order:
                    if x == DefiniteInLine:
                        tb = 20
                    tx = x(lines_arr[i])
                    if tx.isValid():
                        lua_line = tx.getLuaLine()
                        result.append(lua_line)
                        break

            i = i + inc_delta
            

        q = 100

    

# switch block
class switch_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,Switch_Re)

# for block
class for_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,For_Gramma_Re)

    def head_line_to_lua(self):
        for_res = for_iterator_InLine(self.m_multi_line_head)
        return for_res.getLuaLine()


# if block
class if_block_(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,If_Gramma_Re)

# else if block
class elseif_block_(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,ElseIf_Gramma_Re)

# else block
class else_block_(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,Else_Gramma_Re)

# if block single key
class if_block_single_key_(single_word_block):
    def __init__(self, lines_arr,currentIdx):
        single_word_block.__init__(self,lines_arr,currentIdx,SingleWord_If_Re)

# else if block single key
class elseif_block_single_key_(single_word_block):
    def __init__(self, lines_arr,currentIdx):
        single_word_block.__init__(self,lines_arr,currentIdx,SingleWord_ElseIf_Re)

# else block single key
class else_block_single_key_(single_word_block):
    def __init__(self, lines_arr,currentIdx):
        single_word_block.__init__(self,lines_arr,currentIdx,SingleWord_Else_Re)

# enum block
class enum_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,Enum_Re)

# class block
class class_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        self.m_member_res = [Header_H_memFunc,Header_H_memValue]
        self.m_memFuncs = None
        self.m_memValues = None
        Cpp_code_block.__init__(self,lines_arr,currentIdx,Class_Re)

    def is_followd_by_left_brace(self):
        lines_arr = self.m_lines_arr
        currentIdx = self.m_currentIdx
        first_line,first_idx = self.get_first_line(lines_arr,currentIdx)
        for i in range(first_idx,len(lines_arr)):
            re_res = End_With_Left_Brace.findall(trim_cpp_comment(lines_arr[i]))
            if len(re_res) == 1:
                self.m_blockStartIdx = i
                return True

        return False

    def parse_block_type(self):
        if not self.m_sign_re:
            return
        
        if self._isValidBlock():
            lines_arr = self.m_lines_arr

            currentIdx = self.m_currentIdx
            idx_arr = []
            for i in range(self.m_currentIdx,self.m_blockStartIdx+1):
                idx_arr.append(trim_cpp_comment(lines_arr[i]))

            first_line = '\n'.join(idx_arr)
            sign_res = self.m_sign_re.findall(first_line)
            if len(sign_res) == 1:
                self.m_blockType = BlockRe2Type[self.m_sign_re] or 'must_set'
                self.m_className = self.m_sign_re.sub(r'\1',first_line)
    
    def getMembers(self):
        if self.m_memFuncs != None and self.m_memValues != None:
            return self.m_memFuncs,self.m_memValues
        
        self.m_memFuncs = []
        self.m_memValues = []
        for i in range(self.m_blockStartIdx+1,len(self.m_lines_arr)):
            t_line = self.m_lines_arr[i]
            for j,mem_re in enumerate(self.m_member_res):
                mem_res = mem_re.findall(t_line)
                if len(mem_res) == 1:
                    t_arr = self.m_memFuncs if j == 0 else self.m_memValues
                    t_arr.append(mem_re.sub(r'\2',t_line))
                    break

        return self.m_memFuncs,self.m_memValues




# if-else block
class if_else_block():
    def __init__(self, lines_arr,currentIdx):
        self.m_grammaMap = {
            "if":{"arr":[if_block_,if_block_single_key_],"gramKey":"if_gramma"},
            "else if":{"arr":[elseif_block_,elseif_block_single_key_],"gramKey":"elseif_gramma"},
            "else":{"arr":[else_block_,else_block_single_key_],"gramKey":"else_gramma"},
        }
        self.m_block_arr = []
        pass
        if_block = self.try_get_block('if',lines_arr,currentIdx)
        # if_block_(lines_arr,currentIdx)
        if if_block:
            self.m_blockType = 'if_block'
            block_arr = [if_block]
            self.m_block_arr = block_arr

            if_block_line_range = if_block.getValidBlock()

            line_idx = if_block_line_range[1]
            while True:
                pass
                end_flag = True
                possible_else = self.try_get_block('else',lines_arr,line_idx)
                if possible_else:
                    block_arr.append(possible_else)
                    break
                
                possible_elseif = self.try_get_block('else if',lines_arr,line_idx)
                # elseif_block_(lines_arr,line_idx)
                if possible_elseif:
                    block_arr.append(possible_elseif)
                    line_idx = possible_elseif.getValidBlock()[1]
                    end_flag = False
                
                if end_flag:
                    break
    def try_get_block(self,blockName,lines_arr,currentIdx):
        gramm_arr = self.m_grammaMap[blockName]
        if gramm_arr:
            for x in gramm_arr['arr']:
                t = x(lines_arr,currentIdx)
                if t.isValidBlock() and t.get_block_type().count(gramm_arr['gramKey']) == 1:
                    return t
        return None


    def get_block_type(self):
        return self.m_blockType if self.isValidBlock() else 'none'

    def get_first_line(self,lines_arr,currentIdx):
        line_idx = currentIdx
        for i in range(currentIdx,len(self.m_lines_arr)):
            t_line = self.m_lines_arr[i]
            if isStringNil(t_line):
                continue

            line_idx = i
            return t_line,line_idx

    def getValidBlock(self):
        return self.m_block_arr and self.m_block_arr[0]

    def getValidBlockArr(self):
        return self.m_block_arr

    def isValidBlock(self):
        return not table_is_empty(self.m_block_arr) and self.m_block_arr[0].isValidBlock()

def test():
    pass

    # t_str = 'CCARRAY_FOREACH(arr, obj) {xxx}'
    t_str = '''class AchievementController :
public CCObject
{
public:
    static AchievementController *getInstance();
    LUA_ALL_EXPORT_DEF()
    
    void init();
    void updateAchievement(CCArray *arr);
    void updateAchievement(CCDictionary *dict, bool postNotification = true);
    void initMedalInfo(CCArray *arr);
    void updateMyMedalInfo();
    void refreshAllAchievementVisibleFlag();
    CCArray *getVisbleAchievement();
    __Array *getSortedAchievement();
    std::string getKeyByItemId(std::string itemId);
    std::map<std::string, CCSafeObject<AchievementInfo> > m_infos;
    std::map<string, MedalInfo> m_myMedalInfos;
    std::map<string, MedalInfo> m_otherMedalInfos;
    bool isDataBack;
    bool isNeedPostCompleteAchievementToGoogle;
    void purgeData();
    void getReward(std::string itemId);
    void getDataFromServer();
    void getMedalDataFormServer();
    void doWhenComplete(std::string itemId);
    void doOpenGooglePlay();
    void doOpenGooglePlayAchievement();
    void postCompleteAchievement(CCObject *obj = NULL);
    void postCompleteAchievementToGoogle();
    std::map<std::string, int> allCompelete;
    int openFlag;
    bool firstOpen;
    void setOpenFlag(int i);
    void getOtherMedalInfo(CCArray* a);
    CCArray* getOtherMedalInfo();
    CCArray* getMyMedalInfo();
    float getAchieveProgress();
    void getAchieveProgress(pair<int, int>& p);
    int getMedalComCnt();
    int getMedalTotalCnt();
    string getMedalIconName(string medalId, int type);
    void changePlayerMedalId();
    void firstOpenPopup();
    int getRewardAchieve();
    void getMedalIconColor(string medalId, map<int, vector<float>> &colorMap);
};'''
    t_str_cpp = '''CCArray *AchievementController::
    getVisbleAchievement(int a){
    CCArray *arr = CCArray::create();
    double nowTime = GlobalData::shared()->getWorldTime();
    for (auto it = m_infos.begin(); it != m_infos.end(); it++) {
        if(it->second->isVisible){
            if (nowTime>=it->second->start && nowTime<=it->second->end) {//在时间范围内
                arr->addObject(CCString::create(it->first));
            }else if (it->second->state == ACHIEVEMENT_COMPELETE){//能领
                arr->addObject(CCString::create(it->first));
            }
        }
    }
    return arr;
}'''
    t_str1 = "int a[10] = { 0 }  ;"

    # ta = if_else_block(t_str_cpp.split('\n'),4)
    # tb = ta.get_block_type()

    ta = class_block(t_str.split('\n'),0)
    ta1,ta2 = ta.getMembers()

    tb = mem_function_block(t_str_cpp.split('\n'),0,[ta])
    tb.start_parse()

    ta = Line_class(t_str)
    taa = ta.getLuaLine()
    tb = DefiniteArrInLine(t_str1)


    t_str2 = "auto &a = (*it).second->refreshVisibleFlag()->f2().abcd ;"
    ta = re.compile(r'(\w+)->(second)')
    tb = re.compile(r'\(\s*\*(\w+)\s*\)\.(second)')

    tc = re.compile(r'(->)(\w+\(.*?\))')
    td = re.compile(r'(->)(\w+)')

    a = ta.sub(r'\1' ,t_str)
    b = tb.sub(r'\1' ,t_str2)

    taa = tc.sub(r':\2',a)
    taaa = td.sub(r'.\2',taa)

    tq = Line_class(t_str)
    tq1 = tq.handleArrow(t_str)

    tbb = tc.sub(r':',b)
    tbbb = td.sub(r'.',tbb)
    # a = t_str.replace('->second','')
    # t_str.find(r'\s')
    r2 = ElseIf_Gramma_Re.findall(t_str)

    if True:
        return

    # a = BlockRe2Type[Cpp_ClassMember_Fun_Re]


    # t_str = "void   \t   AchievementController::getDataFromServer(int a,int c){  "
    # t_str2 = "void   good_day(int a,int c)"
    # # t1 = End_With_Left_Brace.findall(t_str)
    # tv = Cpp_code_block(t_str)
    # a = tv.is_followd_by_left_brace()

    # 0:'void   \t   AchievementController::getDataFromServer(int a,int c)'

    # t2 = Cpp_Normal_Fun_Re.findall(t_str2)

    # if 需要 处理
    # if(true) return;
    # if(true) {return;}

    func_str = '''if(a<b) 
    {
        x=1;
    }//hahah
    else if(a==b) {
        x = 2;
        //to do ....
    }
    else x=3;//good'''

    a = if_else_block(func_str.split('\n'),0)
    a1 = a.get_block_type()
    c = 10



    pass

def main():
    pass



    # test file
    # cpp_file_name = "/Users/mac/Documents/my_projects/cok/client/IF/Classes/controller/AchievementController.cpp"
    # file_data = read_file(cpp_file_name)
    # print(file_data)


    # cpp_block = Cpp_code_block(file_data,100)



if __name__ == '__main__':
    TestFlag = True
    if TestFlag:
        test()
    else:
        if len(sys.argv) == 1:
            main()
        else:
            print('@param1: origin lua file')
        pass
