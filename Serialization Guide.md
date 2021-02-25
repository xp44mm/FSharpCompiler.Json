# Serialization Guide

The `FSharpCompiler.Json` can serialize a wide variety of F# objects. This guide looks at how it works, first at a high level and then in more detail.

## Summary

At a high level, the `FSharpCompiler.Json` will convert primitive .NET values into primitive F# literals, will convert .NET arrays, tuples, lists, sets and maps to JSON arrays, and will convert records to JSON objects.

`FSharpCompiler.Json` will throw an error if it encounters incorrect JSON when deserializing a value. For example, if the `serialize` method encounters a JSON property with an `int` of values and the type of matching .NET property is not a `int`, then an error will be thrown, and vice-versa.

Complex Types

```F#
F#   Json
Array Json.Array
Tuple Json.Array
List  Json.Array
Set   Json.Array
Map   Json.Array
Record Json.Object
DU     Json.Object
DBNull.Value Json.Null
None Json.Null
```

Primitive Types

```F#
Nullable() Json.Null
null                       Json.Null
false                      Json.False
true                       Json.True
System.String              Json.String
System.Char                Json.String
System.SByte               Json.Number
System.Byte                Json.Number
System.Int16               Json.Number
System.Int32               Json.Number
System.Int64               Json.Number
System.IntPtr              Json.Number
System.UInt16              Json.Number
System.UInt32              Json.Number
System.UInt64              Json.Number
System.UIntPtr             Json.Number
System.Single              Json.Number
System.Double              Json.Number
System.Decimal             Json.Number

```

Others

```F#
Enum           Json.String
Flags Enum     Json.Array [Json.String...]
Guid           Json.String
DateTimeOffset Json.String
TimeSpan       Json.String
```

