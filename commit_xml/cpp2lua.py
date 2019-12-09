from __future__ import division
import sys,os,re
from os import listdir
from os.path import isfile, join

# 正则匹配表达式
# re of '{' and '}'
LeftBraceRe = re.compile(r'{')
RightBraceRe = re.compile(r'}')
MixBraceRe = re.compile(r'[{}]')

# 注释
# CommentInLineRe = re.compile(r'\/\/|\/\*')
CommentCpp = ['//','/*']

# cpp 函数
Cpp_Normal_Fun_Re = re.compile(r'(\w+)(\s+)(\w+)\((.*)\)')
Cpp_ClassMember_Fun_Re = re.compile(r'(\w+)(\s+)(\w+)::(\w+)\((.*)\)')
Switch_Re = re.compile(r'(^\s*switch|^switch)(\s*)\((.*)\)')
For_Gramma_Re = re.compile(r'(^\s*for|^for)(\s*)\((.*)\)')
If_Gramma_Re = re.compile(r'(^\s*?if|^if)(\s*)\((.*)\)')
ElseIf_Gramma_Re = re.compile(r'(^\s*\}?\s*else if|^\}?\s*else if)(.*)\((.*)\)')
# Else_Gramma_Re = re.compile(r'(^\s*\}?\s*else|^\}?\s*else)')
Else_Gramma_Re = re.compile(r'^\s*\}?\s*else\s*\{?$')
Empty_Re = re.compile(r'^\s*{')

# block 类型
BlockRe2Type =  {Cpp_Normal_Fun_Re:"normal_function",
                Cpp_ClassMember_Fun_Re:"cls_mem_function",
                Switch_Re:"switch_gramma",
                For_Gramma_Re:"for_gramma",
                If_Gramma_Re:"if_gramma",
                ElseIf_Gramma_Re:"elseif_gramma",
                Else_Gramma_Re:"else_gramma",
                Empty_Re:"empty_block",
                }

# 以{ 结尾
End_With_Left_Brace = re.compile(r'(.*)\{(\s*)')
# 以{ 开头
Start_With_Left_Brace = re.compile(r'(\s*)\{')

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
# 一行里的 花括号匹配
class BraceInLine():
    def __init__(self,line):
        self.m_line = line
        # self.m_arr = [[],[]]
        self.m_braceArr = MixBraceRe.findall(line)
        # if line.count('{') > 0:
        #     self.m_arr[0] = LeftBraceRe.findall(line)
        
        
        # if line.count('}') > 0:
        #     self.m_arr[1] = RightBraceRe.findall(line)

        # self.m_hasBrace = line.count('{') > 0 or line.count('}') > 0
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

    # def detec_front_right_brace():
    #     res = []
    #     for x in self.m_braceArr:
    #         if x == '}':
    #             res.append(x)
    #         else:
    #             break

    #     return res

    # def judge_side(self,tell_end):
        
    #     left_len = len(self.m_arr[0])
    #     right_len = len(self.m_arr[1])
    #     detect_front_right = self.detec_front_right_brace()
    #     len_front_is_right = len(detect_front_right)

    #     if left_len == right_len:
    #         if left_len == 0:
    #             # return 'empty'
    #             if tell_end and len_front_is_right > 0:
    #                 return [-len_front_is_right,'right']

    #             return [0,'empty']
    #         else:
    #             # return 'neutral'
    #             return [0,'neutral']
    #     else:
    #         # return 'left' if right_len < left_len else 'right'
    #         # neg : 'right'
    #         # pos : 'left'
    #         return [left_len - right_len,'left' if right_len < left_len else 'right']

    # def brace_after_match(self,tell_end):

    #     braces = []
    #     side_res = self.judge_side(tell_end)
    #     side_ct = side_res[0]
    #     side_sign = side_res[1]
    #     t_char = '{' if side_ct > 0 else '}'
    #     for i in range(abs(side_ct)):
    #         braces.append(t_char)
        
    #     self.m_afterMatch = [side_sign,braces]
    #     return [side_sign,braces]


    def has_brace(self):
        return self.m_hasBrace

# cpp 里一个code block
class Cpp_code_block():
    def __init__(self,lines_arr,currentIdx,sign_re=None):
        self.m_blockType = "default"
        self.m_lines_arr = lines_arr
        self.m_currentIdx = currentIdx
        self.m_sign_re = sign_re
        self.m_validBlock = None

        self.checkValidBlock()

    def parse_block_type(self):
        if not self.m_sign_re:
            return
        
        if self._isValidBlock():
            lines_arr = self.m_lines_arr
            currentIdx = self.m_currentIdx
            first_line,_ = self.get_first_line(lines_arr,currentIdx)
            sign_res = self.m_sign_re.findall(trim_cpp_comment(first_line))
            if len(sign_res) == 1:
                self.m_blockType = BlockRe2Type[self.m_sign_re] or 'must_set'

    def get_block_type(self):
        return self.m_blockType if self._isValidBlock() else 'none'

    def is_followd_by_left_brace(self):
        lines_arr = self.m_lines_arr
        currentIdx = self.m_currentIdx
        first_line,first_idx = self.get_first_line(lines_arr,currentIdx)
        re_res = End_With_Left_Brace.findall(first_line)
        if len(re_res) == 1:
            return True
        

        next_line,_ = self.get_first_line(lines_arr,first_idx+1)
        re_res = Start_With_Left_Brace.findall(next_line)
        if len(re_res) == 1:
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
        start_idx = self.m_currentIdx
        end_idx = start_idx
        for i in range(self.m_currentIdx,len(self.m_lines_arr)):
            t_line = self.m_lines_arr[i]
            if isStringNil(t_line):
                continue

            brace_in_line = BraceInLine(t_line)

            if brace_in_line.has_brace():
                if not check_flag:
                    check_flag = True
                    start_idx = i
                    brace_stack.append('{')
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

# if-else block
class if_else_block():
    def __init__(self, lines_arr,currentIdx):
        pass
        if_block = if_block_(lines_arr,currentIdx)
        if if_block.get_block_type() == 'if_gramma':
            self.m_blockType = 'if_block'
            block_arr = [if_block]
            self.m_block_arr = block_arr

            if_block_line_range = if_block.getValidBlock()

            line_idx = if_block_line_range[1]
            while True:
                pass
                end_flag = True
                possible_else = else_block_(lines_arr,line_idx)
                if possible_else.isValidBlock():
                    block_arr.append(possible_else)
                    break
                
                possible_elseif = elseif_block_(lines_arr,line_idx)
                if possible_elseif.isValidBlock():
                    block_arr.append(possible_elseif)
                    line_idx = possible_elseif.getValidBlock()[1]
                    end_flag = False
                
                if end_flag:
                    break

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


    # t_str = "}else {//abcd"
    # r = Else_Gramma_Re.findall(trim_cpp_comment( t_str))
    # r2 = ElseIf_Gramma_Re.findall(t_str)

    # if True:
    #     return

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
