from __future__ import division
import sys,os,re
from os import listdir
from os.path import isfile, join

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
DeclarRe = re.compile(r'^\w+\s+\*?\&?\w+\s*;+\s*$')

# cpp 定义变量语句 含初始化
DefiniteRe = re.compile(r'^(\w+)\s+\*?\&?(\w+)\s*=\s*(\S+)\s*;+\s*$')

# cpp 去掉 iterator of map. eg: it->second => it 或者 (*it).second => it
CppMapIterator1Re = re.compile(r'(\w+)->(second)')
CppMapIterator2Re = re.compile(r'\(\s*\*(\w+)\s*\)\.(second)')

# cpp -> 和 . 先使用 CppArrow2Func 再 CppArrow2Value
CppArrow2Func = re.compile(r'(->)(\w+\(.*?\))')
CppArrow2Value = re.compile(r'(->)(\w+)')


# cpp 语句结束符 ;
Cpp_end_line_Re = re.compile(r';\s*$')

# cpp 函数
Cpp_Normal_Fun_Re = re.compile(r'(\w+)(\s+)(\w+)\((.*)\)')
Cpp_ClassMember_Fun_Re = re.compile(r'(\w+)(\s+)(\w+)::(\w+)\((.*)\)')
Switch_Re = re.compile(r'^\s*switch(\s*)\((.*)\)')
For_Gramma_Re = re.compile(r'^\s*for(\s*)\((.*)\)')
If_Gramma_Re = re.compile(r'^\s*\}?if(\s*)\((.*)\)\s*\{?\s*\}?\s*$')
ElseIf_Gramma_Re = re.compile(r'^\s*\}?\s*else if(\s*)\((.*)\)')
Else_Gramma_Re = re.compile(r'^\s*\}?\s*else')
Empty_Re = re.compile(r'^\s*\{\}?$')

SingleWord_If_Re = re.compile(r'^\s*if\s*\((.*)\)')
SingleWord_ElseIf_Re = re.compile(r'^\s*\}?\s*else if\s*\((.*)\)')
SingleWord_Else_Re = re.compile(r'^\s*\}?\s*else')
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

                }

# 以{ 结尾
End_With_Left_Brace = re.compile(r'\{(\s*)$')
End_With_Right_Brace = re.compile(r'\}(\s*)$')
# 以{ 开头
Start_With_Left_Brace = re.compile(r'^(\s*)\{')

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

def trim_cpp_comment(line):
    for x in CommentCpp:
        pos = line.find(x)
        if pos > -1:
            return line[:pos]

    return line

class Line_class():
    def __init__(self,line,sign_re):
        self.m_line = line
        self.m_sign_re = sign_re

    def isValid(self):
        if not self.m_sign_re:
            return True

        trim_comment_line = self.getTrimCommentLine()
        sign_res = self.m_sign_re.findall(trim_comment_line)
        return len(sign_res) == 1

    def trans2lua(self):
        return self.m_line

    def getTrimCommentLine(self):
        return trim_cpp_comment(self.m_line)
    
    def getLine_leftblank(self):
        res = NoneBlankRe.search(self.m_line)
        if res:
            start_idx = res.start()
            return self.m_line[:start_idx] if start_idx > -1 else ''

    def handleArrow(self,srcStr):
        srcStr = CppMapIterator1Re.sub(r'\1' ,srcStr)
        srcStr = CppMapIterator2Re.sub(r'\1' ,srcStr)

        srcStr = CppArrow2Func.sub(r':\2',srcStr)
        srcStr = CppArrow2Value.sub(r'.\2',srcStr)

        return srcStr

class DeclarInLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,DeclarRe)

class DefiniteInLine(Line_class):
    def __init__(self,line):
        Line_class.__init__(self,line,DefiniteRe)

    def trans2lua(self):
        trim_comment_line = self.getTrimCommentLine()
        sign_res = self.m_sign_re.findall(trim_comment_line)
        if len(sign_res) == 1:
            pass


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
    def __init__(self,lines_arr,currentIdx,sign_re=None):
        self.m_blockType = "default"
        self.m_lines_arr = lines_arr
        self.m_currentIdx = currentIdx
        self.m_blockStartIdx = currentIdx

        self.m_sign_re = sign_re
        self.m_validBlock = None

        self.checkValidBlock()

    def parse_block_type(self):
        if not self.m_sign_re:
            return
        
        if self._isValidBlock():
            lines_arr = self.m_lines_arr
            currentIdx = max(self.m_currentIdx,self.m_blockStartIdx) #self.m_currentIdx
            first_line,_ = self.get_first_line(lines_arr,currentIdx)
            trim_line = trim_cpp_comment(first_line)
            sign_res = self.m_sign_re.findall(trim_line)
            if len(sign_res) == 1:
                if self.m_sign_re == Else_Gramma_Re:
                    if trim_line.count('else if') == 1:
                        return
                self.m_blockType = BlockRe2Type[self.m_sign_re] or 'must_set'

    def get_block_type(self):
        return self.m_blockType if self._isValidBlock() else 'none'

    def is_followd_by_left_brace(self):
        lines_arr = self.m_lines_arr
        currentIdx = self.m_currentIdx
        first_line,first_idx = self.get_first_line(lines_arr,currentIdx)
        re_res = End_With_Left_Brace.findall(trim_cpp_comment(first_line))
        self.m_blockStartIdx = first_idx
        if len(re_res) == 1:
            return True
        
        if first_idx+1 < len(lines_arr):
            next_line,next_line_idx = self.get_first_line(lines_arr,first_idx+1)
            re_res = Start_With_Left_Brace.findall(next_line)
            if len(re_res) == 1:
                return True
            another_check_endbrace_chance = self.m_sign_re == ElseIf_Gramma_Re or self.m_sign_re == Else_Gramma_Re
            if another_check_endbrace_chance:
                re_res = End_With_Left_Brace.findall(trim_cpp_comment(next_line))
                if len(re_res) == 1:
                    self.m_blockStartIdx = next_line_idx
                    return True
                if next_line.count('{') == next_line.count('}'):
                    re_res = End_With_Right_Brace.findall(trim_cpp_comment(next_line))
                    if len(re_res) == 1:
                        self.m_blockStartIdx = next_line_idx
                        return True

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
                # brace_res = brace_in_line.brace_after_match(check_flag)
                # if brace_res[0] != 'neutral' :
                #     if brace_res[0] == 'left':
                #         if not check_flag:
                #             check_flag = True
                #             start_idx = i
                #         append_by_table(brace_stack,brace_res[1])
                #     else:
                #         for vi in range(len(brace_res[1])):
                #             brace_stack.pop()

                #         if len(brace_stack) == 0 and check_flag:
                #             end_idx = i
                #             break
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
            lines_arr = self.m_lines_arr
            currentIdx = max(self.m_currentIdx,self.m_blockStartIdx)
            first_line,_ = self.get_first_line(lines_arr,currentIdx)
            sign_res = self.m_sign_re.findall(trim_cpp_comment(first_line))
            if len(sign_res) == 1:
                if self.m_sign_re == SingleWord_Else_Re and first_line.count('else if') == 1:
                    return
                self.m_blockType = BlockRe2Type[self.m_sign_re] or 'must_set'
    
    def has_key_word(self):
        lines_arr = self.m_lines_arr
        currentIdx = self.m_currentIdx
        first_line,first_idx = self.get_first_line(lines_arr,currentIdx)
        self.m_blockStartIdx = first_idx
        for x in SingleWord_Re_Arr:
            re_res = x.findall(first_line)
            if len(re_res) == 1:
                return True
        

        next_line,next_line_idx = self.get_first_line(lines_arr,first_idx+1)
        self.m_blockStartIdx = next_line_idx
        for x in SingleWord_Re_Arr:
            re_res = x.findall(next_line)
            if len(re_res) == 1:
                return True

        return False

# 空block {}
class empty_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,Empty_Re)

# 普通函数block
class function_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx,sign_re=None):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,sign_re or Cpp_Normal_Fun_Re)

# 类成员函数block
class mem_function_block(function_block):
    def __init__(self, lines_arr,currentIdx):
        function_block.__init__(self,lines_arr,currentIdx,Cpp_ClassMember_Fun_Re)


# switch block
class switch_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,Switch_Re)

# for block
class for_block(Cpp_code_block):
    def __init__(self, lines_arr,currentIdx):
        Cpp_code_block.__init__(self,lines_arr,currentIdx,For_Gramma_Re)

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


# if-else block
class if_else_block():
    def __init__(self, lines_arr,currentIdx):
        self.m_grammaMap = {
            "if":{"arr":[if_block_,if_block_single_key_],"gramKey":"if_gramma"},
            "else if":{"arr":[elseif_block_,elseif_block_single_key_],"gramKey":"elseif_gramma"},
            "else":{"arr":[else_block_,else_block_single_key_],"gramKey":"else_gramma"},
        }
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


    t_str = "auto &a = it->second->refreshVisibleFlag()->f1()->good ;"
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

    # a = if_block_single_key_(func_str.split('\n'),0)
    # a1 = a.get_block_type()
    # b = elseif_block_single_key_(func_str.split('\n'),2)
    # b1 = b.get_block_type()
    # c = else_block_single_key_(func_str.split('\n'),4)
    # c1 = c.get_block_type()

    func_str = '''CCArray *AchievementController::getVisbleAchievement(){
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

    {// 空代码块
        auto a = 100;
    }
    return arr;
}'''

    a = if_else_block(func_str.split('\n'),5)
    b = a.get_block_type()
    a = function_block(func_str.split('\n'),0)
    b = a.get_block_type()

    # a = mem_function_block(func_str.split('\n'),0)
    # b = a.get_block_type()

    tc = empty_block(func_str.split('\n'),13)
    b = tc.isValidBlock()
    t1 = tc.getValidBlock()
    # a = tc.is_followd_by_left_brace()
    # t1 = BraceInLine(r'abcd {{{{{{{{{{}')
    # print(t1.get_brace_arr())
    # side = t1.judge_side()

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
