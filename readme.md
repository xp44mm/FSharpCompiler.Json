# FSharpCompiler.Json

`FSharpCompiler.Json` is a easy to use and configurable JSON framework for F#.

- Flexible JSON serializer for converting between F# and JSON.

- DU `Json` type for manually reading and writing JSON.

- High performance, faster than .NET's built-in JSON serializers.

## Getting FSharpCompiler.Json over NuGet

The simplest way of integrating `FSharpCompiler.Json` to your project is by using NuGet. You can install it by opening the package manager console (PM) and typing in the following statement:

```powershell
Install-Package FSharpCompiler.Json
```

You can also use the graphical library package manager ("Manage NuGet Packages for Solution"). Searching for "FSharpCompiler.Json" in the official NuGet online feed will find this library.

## Get Started

序列化

```
open FSharpCompiler.Json
Render.stringify ([1], [true])
```

result:

```
[1], [true]
```

When instance is about `Nullable<'t>`, `None` directly or indirectly, you should provide type info for stringify method:

```
let obj = box (Nullable 20)
Render.stringifyNullableType (typeof<Nullable<int>>) obj
```

解序列化

配置

读者

写者




