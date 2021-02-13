# Serialization Guide

The `FSharpCompiler.Json` can serialize a wide variety of F# objects. This guide looks at how it works, first at a high level and then in more detail.

## Summary

At a high level, the `FSharpCompiler.Json` will convert primitive .NET values into primitive F# literals, will convert .NET arrays, tuples, lists, sets and maps to JSON arrays, and will convert records to JSON objects.

`FSharpCompiler.Json` will throw an error if it encounters incorrect JSON when deserializing a value. For example, if the `serialize` method encounters a JSON property with an `int` of values and the type of matching .NET property is not a `int`, then an error will be thrown, and vice-versa.

Complex Types

```F#
F#   Json
Array Json.Elements
Tuple Json.Elements
List  Json.Elements
Set   Json.Elements
Map   Json.Elements
Record Json.Fields
DU     Json.Fields
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
System.Char                Json.Char
System.SByte               Json.SByte
System.Byte                Json.Byte
System.Int16               Json.Int16
System.Int32               Json.Int32
System.Int64               Json.Int64
System.IntPtr              Json.IntPtr
System.UInt16              Json.UInt16
System.UInt32              Json.UInt32
System.UInt64              Json.UInt64
System.UIntPtr             Json.UIntPtr
System.Numerics.BigInteger Json.BigInteger
System.Single              Json.Single
System.Double              Json.Double
System.Decimal             Json.Decimal

```

Others

```F#
Enum           Json.String
Flags Enum     Json.Elements [Json.String...]
Guid           Json.String
DateTimeOffset Json.String
TimeSpan       Json.String
```

