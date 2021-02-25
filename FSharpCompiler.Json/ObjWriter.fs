namespace FSharpCompiler.Json

open System
open System.Numerics
open Microsoft.FSharp.Core

/// write to fsharp value from json
type ObjWriter =
    abstract filter: targetType:Type * json:Json -> bool
    abstract write: loopWrite:(Type -> Json -> obj) * targetType:Type * json:Json -> obj

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module ObjWriter =
    let assertType<'t> (ty:Type) (value:obj) =
        let t = typeof<'t>
        if ty = t then value else failwithf "type should be `%s`"  t.Name

    ///
    let fallbackWrite (loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
        match json with
        | Json.Null  -> null
        | Json.False -> box false    |> assertType<bool> ty
        | Json.True  -> box true     |> assertType<bool> ty
        | Json.String x ->
            if ty = typeof<string> then
                box x
            elif ty = typeof<char> then
                if x = "" then
                    failwith "empty string can't write to char error."
                box x.[0]
            else
                failwithf "type should be `%s`"  ty.Name
        | Json.Number x -> 
            // https://docs.microsoft.com/en-us/dotnet/standard/base-types/conversion-tables
            if ty = typeof<sbyte> then
                Convert.ToSByte x
                |> box
    
            elif ty = typeof<byte> then
                Convert.ToByte x
                |> box
    
            elif ty = typeof<int16> then
                Convert.ToInt16 x
                |> box
    
            elif ty = typeof<uint16> then
                Convert.ToUInt16 x
                |> box
  
            elif ty = typeof<int> then
                Convert.ToInt32 x
                |> box

            elif ty = typeof<uint32> then
                Convert.ToUInt32 x
                |> box

            elif ty = typeof<int64> then
                Convert.ToInt64 x
                |> box
    
            elif ty = typeof<uint64> then
                Convert.ToUInt64 x
                |> box
    
            elif ty = typeof<single> then
                Convert.ToSingle x
                |> box
    
            elif ty = typeof<float> then
                Convert.ToDouble x
                |> box
    
            elif ty = typeof<decimal> then
                Convert.ToDecimal x
                |> box
    
            elif ty = typeof<nativeint> then
                IntPtr(Convert.ToInt64 x)
                |> box
    
            elif ty = typeof<unativeint> then
                UIntPtr(Convert.ToUInt64 x)
                |> box
    
            else
                failwithf "type should be `%s`"  ty.Name

        | Json.Object _ -> failwith "not allowed type"
        | Json.Array _ -> failwith "not allowed type"

    /// write to obj from json.
    let rec writeObj (writers:#seq<ObjWriter>) (ty:Type) (json:Json) =
        let write =
            writers
            |> Seq.tryFind(fun w -> w.filter(ty,json))
            |> Option.map(fun w -> w.write)
            |> Option.defaultValue fallbackWrite

        write(writeObj writers, ty, json)

