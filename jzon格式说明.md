### 用JZON格式

JZON是由JSON格式演变而来，他们的结构是一致的。JZON是为了压缩json格式的长度，在尽量保持可读性的情况下。

当JSON格式的数据放到url的查询字符串中的时候，其中的关键字或标点符号会被转义，由一个字符变成几个字符，长度变长，而且，失去可读性。为了减少查询字符串的长度，采用替代格式。

#### 格式说明

javaScript格式：

对象成员的键名，在不影响解析的情况下，可以不加引号作为标识符，也可以加引号变成字符串常量，不影响解析的结果。不加引号标识符的规则：

* 首字符不能是括号`{}[]`、冒号`:`、逗号`,`、双引号`"`等标点符号，也不能是空格。

* 随后的字符不能是括号`{}[]`、冒号`:`、逗号`,`等标点符号，也不能是空格。双引号`"`可以有。

JZON标识符省略引号的规则，包括JavaScript标识符，并比javaScript省略引号规则更宽松。

JavaScript标识符

在JavaScript中所有的我们可以自主命名的都可以称之为 标识符。例如：变量名、函数名、属性名都属于标识符。

命名一个标识符需要遵守如下规则：

1、标识符中可以含有字母，数字，下划线`_`，`$`

2、标识符不能以数字开头。

3、标识符不能是关键字或是保留字。

F# Identifier  Names

There are some rules governing identifier names. Identifiers must start with an underscore ( `_` ) or a letter, and can then contain any alphanumeric character, underscore, or a single quotation mark ( ' ). Keywords cannot be used as identifiers.

Url格式：

为了防止查询字符串在Url中被转义，增加url字符串长度，降低可读性，进行如下的替代：

键值分隔符`:`替换为`*`

成员分隔符`,`替换为`!`

对象`{}`或数组`[]`都被替换为`()`。

为了区分空数组和空对象，空数组`[]`被替换为`()`，空对象`{}`被替换为`(*)`。

字符串`"`替换为`~`包围字符串值，字符串中的单引号和双引号不加反斜杠转义，字符串中的波浪线字面量需要转义为双波浪线。其他转义同JSON格式不变。即字符串`"\"~\\ \/ \b \f \n \r \t \u0000"`将表达为`~"~~\\ \/ \b \f \n \r \t \u0000~`。

符号替换后标识符的规则更改为：

* 首字符不能是小括号`()`、星号`*`、叹号`!`、波浪线`~`等标点符号，也不能是空格。

* 随后的字符不能是小括号`()`、星号`*`、叹号`!`等标点符号，也不能是空格。波浪线`~`可以有。

其他基元类型：数字`number`，布尔真`true`，布尔假`false`，空`null`，他们都和JSON格式一样。没有变化。

### 生成查询字符串

通过url传递对象数据使用查询字符串。这是标准用法。各种现有开发工具都支持解析。查询字符串以`?`开头，以`&`分隔开相邻参数，以`=`分隔参数名与参数值。

当对象涉及多层嵌套是查询字符串的参数名变得冗余。所以我们传递对象的第一层成员用查询字符串格式，当对象成员仍然是对象时（包括数组），用JZON格式。

* 如果成员值为`null`、`function`、`undefined`，则整个成员（包括参数名称）不出现在查询字符串的参数列表中。例如，`{x:null,y:0}`将表示为`?y=0`

* 如果成员值为字符串类型，则参数值为成员值，不加引号。例如，`{x:"abc"}`将表示为`?x=abc`

* 如果成员值为基元类型，对应的参数值是该成员值的字符串化表示。

* 如果成员值为对象或数组，则用jzon格式字符化为参数值。即使是基元数组也用jzon格式字符化，而不是多个同名参数顺序排列。

* 对象或数组的jzon格式一定被括号包围，可以压缩掉环绕的括号，解析时再添加括号。

### 编写控制器的操作方法

查询字符串解析时，需要知道每个参数的类型，缺省类型为`string`，即不解析。

当参数名是简单的，参数值是基元类型时，JZON格式与查询字符串相同。也就是可以使用asp.net core 自带的匹配功能，如`?x=0&y=true&z=abc`，可以传给`action(x:float,y:bool,z:string)`。

查询字符串用多个相同名称的字段表示简单数组，而JZON格式不同，它将简单数组序列化并放到一个字段中。

### 示例一：

当一个对象的成员全部都是基元类型时，兼容forms格式的字符串。
生成的请求的查询字符串：

```F#
?press=100760&temp=40.2&humid=6.2
```

这个字符串与forms形式的字符串没有什么不同，所以可以使用ASP.NET默认的解析方法。客户端的请求：

```javascript
 const airVol = {
     press: 100760,
     temp: 40.2,
     humid: 6.2,
 };

 ajax.getJSON(mainUrl('desulphur', 'airVol') + queryString(airVol))

```

一个对象被表示为查询字符串，在这里对象是`airVol`，`queryString()`将其序列化成上面列出的查询字符串。

函数`queryString`已经被定义好，源代码位于queryString文件夹下面。

控制器的操作方法：

```F#
[<HttpGet>]
member __.airVol(press:float, temp:float, humid:float) =
    Atmosphere.airVol press temp humid
```



### 示例二：

当
生成的请求的查询字符串：

```F#
?sinlet=kind*~rectangle~!rectangle*(width*10!height*10)&soutlet=kind*~rectangle~!rectangle*(width*15!height*15)&angle=15
```
翻译成javascript对象：

```javascript
{
     sinlet: {"kind":"rectangle","rectangle":{"width":10,"height":10}},
     soutlet: {"kind":"rectangle","rectangle":{"width":15,"height":15}},
     angle: 15
 }
```

控制器的操作方法：

```F#
[<HttpGet>]
member this.Reducer() =
    task {
        let input = QueryCollection.toObject<Reducer.Input>(this.Request.Query)
        let result = Reducer.calc input
        return result
    }
```

这个控制器的特点，第一没有输入参数，查询数据直接通过`this.Request.Query`获取。第二，将获取的数据通过一个函数直接转换成目标对象。这个函数是`QueryCollection.toObject<>()`，已经定义好了。

下面看看类型的定义：

```F#
type Input =
    {
        sinlet:Shape
        soutlet:Shape
        angle: float
    }
```

这个类型是F#记录，对应着json对象。`Shape`类型的序列化是自定义的，通过`ShapeConverter`，它在`Startup`中被注册，继承自`JsonConverter<>`，详见json.net用法。