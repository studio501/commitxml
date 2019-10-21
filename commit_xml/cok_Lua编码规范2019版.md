# Lua 编码规范 #

## 版本 ##
- 项目中使用 ToLua 插件来实现 Lua 和 C# 的桥接。目前为止，插件支持的 Lua 语言版本为 5.1，兼容部分 Lua 5.2 的语法特性。
- 使用 [middleclass](https://github.com/kikito/middleclass) 插件在 Lua 中模拟面向对象编程。

## 文件名和文件粒度

- 文件名采用 Pascal 命名风格（每个单词首字母大写，单词之间无下划线，文件名首字母大写）
- 文件编码用**不带 BOM 头的 UTF-8**，换行符使用 **CR/LF**。(用编辑器或 IDE 保证)
- 每个函数不要超过 500行

## 语言特性

- 表的长度：使用 `#` 操作符来代替 `table.getn` 方法。

  ```lua
  t = {}

  -- 应避免的用法。
  local len = table.getn(t)

  -- 推荐用法。
  local len = #t
  ```
- 表判空和字符串判空
```lua
local t = {}
...
local is_empty = (not t) or next(t) == nil

local str = ''
...
local is_empty = (not t) or str == ''
```
- 字符串连接
```lua
-- 连接多个字串为一个整串,应该先将子串放在一个表里,
-- 之后用 table.concat 进行连接
local str1,str2,str3,str4
...
local str_arr = { str1,str2,str3,str4 }
return table.concat(str_arr)
-- 注 table.concat 第二个参数可选, 为子串之间的连接符

```
- 使用迭代器访问表
```lua
local = t
...
-- 不推荐
for i=1,#t do
	  ...
end

-- 推荐
for i,v in ipairs(t) do
  	...
end

-- 另外以非number为index 的表使用 pairs 遍历,倒序访问使用 ripairs
```

- 使用unpack 进行参数传递
```lua
-- 项目中函数定义大多接受多个参数而不单个表 如 getLang
-- 不推荐
local txt_arr
local text_id
...

if #txt_arr == 1 then
		return getLang(text_id,txt_arr[1])
elseif #txt_arr == 2 then
  	return getLang(text_id,txt_arr[1],txt_arr[2])
-- could be a bounch of elseif ...
end

-- 推荐
return getLang(text_id,unpack(txt_arr))
```

- 使用math.max,math.min 可接受多个参数
```lua
-- 假设t 有100个元素
local t
...
-- 不推荐1 循环遍历找极值
-- 不推荐2 排序后找极值

-- 推荐
local max_ele = math.max(unpack(t))
```

- 对不再使用的表引用手动置 nil 方便Lua 进行垃圾回收
```lua
function SettingView:onCleanup()
  	self.m_data = nil
end

-- 两个表互相引用 应该使用其中一个为 weak 防止对象一直被持有
local a = {}
local b = {}
a.indexB = b
b.indexA = a

setmetatable(a, { __mode = "v" })
```

- 1111111111使用迭代器访问表
```lua

```

- 1111111111使用迭代器访问表
```lua

```

- 1111111111使用迭代器访问表
```lua

```

- 1111111111使用迭代器访问表
```lua

```

- 1111111111使用迭代器访问表
```lua

```
- **禁止**随意使用全局变量和函数，避免全局函数和全局变量泛滥的情况。

## 代码外观

### 列宽

代码列宽尽量控制在一屏可显示（120字符以内）

### 换行

当表达式超出或即将超出规定的列宽，遵循以下规则进行换行

- 在逗号后换行。

- 在操作符前换行。

当以上规则会导致代码混乱的时候自己采取更灵活的换行规则。

### 缩进

- **4 空格**，（tab应该设置为4空格）

### 空行

空行是为了将逻辑上相关联的代码分块，以便提高代码的可阅读性。每处空行不要超过 **1 行**。

### 空格

在以下情况中要使用到空格

- 多个参数用逗号隔开，每个逗号后都应加一个空格。

  ```lua
  for k, v in pairs(myTable) do
  end

  for i = 1, 100 do
  end

  local function f(a, b, c)
  end
  ```

- 除了 `.` 之外，所有的二元操作符都应用空格与它们的操作数隔开。一元操作符与操作数间不需要空格。

  ```lua
  local s = a + b - c

  t = { [1] = 1, [2] = 4, [3] = 9 }
  local len = #t
  ```

- 单行定义的表（如上面的 `t`），花括号与其包裹内容之间应有一个空格。
- 连接运算符".."两边要有空格
```lua
	return "abcd" .. "efgh"
```

### 圆括号

- 尽量不要在判断条件的地方使用圆括号，除非是为了标记清楚运算的优先级。

  ```lua
  -- 应避免的用法。
  if (a == 3 and b == 4) then
  end

  -- 推荐的用法。
  if a == 3 and b == 4 then
  end
  ```

### 比较运算规范
- 关系运算符两边最好用空格。
```lua
（1）nil ： a == nil

（2）int 或 string: a == 163 或 a == "Wingszero"

（3）Boolean: if a 或 if not a 

（4）杜绝比较不同类型的对象
```

## 程序注释

- 普通注释：使用 `--` 加一个空格开头的注释，可以根据需要，决定放在语句上面一行还是同一行的后面。

  ```lua
  local a = 3 -- 声明了一个局部变量。

  -- 这也是一个局部变量。
  local b = 4
  ```
- 全局变量要有较详细的注释，包括对其功能、取值范围、哪些函数存取它以及存取它时的注意事项等的说明。

- 文档型注释：标记类、共有属性、全局函数等，同样使用 `--` 加一个空格开头的注释，部分编辑器对于```---```格式的注释会有特殊显示

  ```lua
  --- 好友数据。
  local FriendData = Class('FriendData')

  --- @desc 初始化。
  --- @param id 好友的用户 ID。
  --- @param name 好友的名字。
  --- @return 自身。
  function FriendData:initialize(id, name)
      -- 较复杂的函数原型，可以用 @desc, @param, @return 等标记来作为描述、参数、返回值等的说明。
  end

  --- 更新名字。
  function FriendData:UpdateName(name)
      -- 较简单的函数原型，保留一个函数描述即可。
  end

  return FriendData
  ```

- 尽量不使用 `--[[` 这样的多行注释。使用编辑器使用的多行注释方式来进行注释添加。
- 注意：注释的原则是有助于对程序的阅读理解，注释也不宜太多。注释可以是中文或英文，但最好用英文，防止产生乱码问题。


## 命名规范

根据 Lua 变量在逻辑上的含义，依照大体与 C++ 相同的命名规则，注意以下几点：

### 局部变量

根据其含义来决定使用的大小写规则，首字母尽量使用小写。
### table变量
- table变量的数据较多时考虑用如下形式增强可读性
```lua
--  不推荐
local ids = {
  57426,  
  57427,
  57428,
}
-- 推荐
local ids = {
	[1] = 57426,
	[2] = 57427,
	[3] = 57428,
}

-- 另外在lua中模拟c++宏的机制可考虑使用 utils.toNumberEnum 方法
local ConsecField = utils.toNumberEnum({
    {"StartIdx",1},
    {"Duration"},
    {"StartDateDesc"},
    {"EndDateDesc",99},
    {"IsNowOpen"}
})

assert( ConsecField.Duration == 2 )
assert( ConsecField.EndDateDesc == 99 )
```

### 类或的成员变量（非函数）

- 公有的成员变量应加m_ 前缀 Camel 大小写（首字母小写，其后每单词首字母大写）
```lua
funtion ActivityController:ctor( acitvityId )
	self.m_acitvityId = acitvityId
end
```

- 受保护或私有的成员变量应加 `_` 前缀，外部应自觉避免使用。

  ```lua
  function ActivityController:initialize()
      self._behaviours = {}
  end
  ```
  
- 私有静态成员变量，应该直接用局部变量代替。
```lua
-- 该_instance 只能通过 getInstance获得,其它公有方法修改
local _instance = nil 
function TournamentController.getInstance()
    if _instance == nil then
        _instance = TournamentController.new()
        guiCommonGlobal.controllerAutoPurge(_instance)
    end
    return _instance
end
```

### 类成员函数

- 不论其含义是静态与否，成员变量应定义为 Pascal 大小写（各单词首字母大写，其余小写）

- 不专门规定受保护的成员函数。

- 私有成员函数应该直接用局部函数解决。如不想使用局部函数应命名加上前缀 _ 表明这是个私有方法

  ```lua
  --- 私有方法。
  local function OnSignClick(self)
      local dailySign = GameManager.DailySignLogic
      dailySign:AskSignInfo(dailySign.ForcePopupType.ForcePopup)
  end

  --- 调用私有方法的共有方法。
  function GameHallWindow:OnClick(btnObj)
      if self._btnSign.gameObject == btnObj then
          OnSignClick(self)
  end
    
  -- 自己定义的私有方法外部避免直接调用
  funciton GameHallWindow:_ajustOffSet()
  		--body
  end
  ```

## 全局或局部函数

使用 Pascal 命名法。

```lua
function StringToNum(str)
end

local function ExecuteCmd(self, cmd)
end
```

## 语句

### 每行一个语句

每行最多包含一个语句。（于是应该避免使用分号）

### 复合语句

子语句应该换行。即使子语句只有一条甚至没有，`end` 也应该换行。

```lua
if a < 0 then
    print(-a)
end
```

### return 语句

尽量不使用括号。

```lua
return name
return id, name
```

## 函数

所有函数的定义（包括全局函数、匿名函数、成员函数），end 都要换行，其中的内容都要缩进。

```lua
actNode:runAction(cc.Sequence:create(cc.CallFunc:create(function ()
        --do something
      end),cc.DelayTime:create(1),cc.CallFunc:create(function()
        --do otherthing
      end)))
```

## 模拟面向对象

### 类和对象

- 对于明确有面向对象特点的内容，使用 class 方法来模拟面向对象。

  ```lua
  -- dog class
  local Dog = class("Dog")
  function Dog:ctor()
    	self:bark()
  end
  
  function Dog:bark()
   		print("Dog:bark")
  end
  
  -- yellow dog class
  local superClass = Dog
  local YellowDog = class("YellowDog",superClass)
  function YellowDog:bark()
    	print("YellowDog:bark")
  end
  
  local dogInst1 = Dog:new()
  local dogInst2 = YellowDog:new()
  
  -- will output
  Dog:bark
  YellowDog:bark
  ```

- 调用基类方法

  ```lua
  function YellowDog:bark()
      superClass.bark(self)
    	print("YellowDog:bark")
  end
  
  local yellowDog = YellowDog:new()
  -- will output
  Dog:bark
  YellowDog:bark
  ```

### 多继承

有多继承要求可使用 class 方法,但要避免父类拥有同名成员

```lua
-- normal dog
local Dog = class("Dog")
function Dog:walk()
  	print("Dog:walk()")
end

-- a dancer feature
local DancerLiker = class("DancerLiker")
function DancerLiker:walk()
		return "DancerLiker:walk()"
end

function DancerLiker:pride()
  	print("DancerLiker:pride()")
end

-- Fenchi is a normal dog but she walks like a dancer
-- So let Fenchi own this walk method
local Fenchi = class("Fenchi",Dog,DancerLiker)
local fenchi = Fenchi:new()
fenchi:walk() -- still a normal dog walk
fenchi:pride() -- will output DancerLiker:pride()
```

