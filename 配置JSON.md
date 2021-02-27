# 配置JSON

内置的JSON功能可以满足基本的F#数据类型序列化的需求。当然，如果你需要，是可以增加或删除读写器来实现功能或改进性能的。F#序列化和反序列化不是直接打印成文本的，而是先将F#数据类型转化为树结构，树结构再打印成文本。

## 核心类型`Json`

这个树结构是：

```F#
[<RequireQualifiedAccess>]
type Json =
| Object of list<string*Json>
| Array  of Json list
| Null
| False
| True
| String of string
| Number of float 
```

该类型位于`FSharpCompiler.Json`名字空间，如果是对象可以用字段名称索引字段值，如：

```F#
let x = Json.Object ["name",Json.String "abcdefg"; "age", Json.Number 18.0]
let y = x.["name"]
Should.equal y <| Json.String "abcdefg"
```

如果是数组可以用索引来引用元素值：

```F#
let x = Json.Array [Json.Number 1.0;Json.Number 2.0;Json.Number 3.0]
let y = x.[1]
Should.equal y <| Json.Number 2.0
```

`Json`类型是JSON的树形表达，可以解析JSON文本：

```F#
let x = """{"a":0,"b":null}"""
let y = JsonSerializer.parse x
//show y
Should.equal y 
<| Json.Object ["a",Json.Number 0.0;"b",Json.Null;]
```

也可以序列化为JSON文本：

```F#
let x = Json.Array [Json.Number 0.0;Json.Number 1.0] 
let y = JsonSerializer.stringify x
Should.equal y "[0,1]"
```



