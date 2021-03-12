# FSharpCompiler.Json

`FSharpCompiler.Json` is a easy to use and configurable JSON framework for F#.

- Flexible JSON serializer for converting between F# and JSON.

- DU `Json` type for manually reading and writing JSON.

- High performance, faster than .NET's built-in JSON serializers.

## Getting `FSharpCompiler.Json` over NuGet

The simplest way of integrating `FSharpCompiler.Json` to your project is by using NuGet. You can install it by opening the package manager console (PM) and typing in the following statement:

```powershell
Install-Package FSharpCompiler.Json
```

You can also use the graphical library package manager ("Manage NuGet Packages for Solution"). Searching for name of this package in the official NuGet online feed will find this library.

## Get Started

JSON字符串字面量中不能包括如下字符：`\a`，`\b`，`\v`。

JSON字符串字面量对如下字符使用字符本身，而不是转义：`'`，`/`。

see also:

- [Serializing and Deserializing JSON.md](./Serializing and Deserializing JSON.md)



