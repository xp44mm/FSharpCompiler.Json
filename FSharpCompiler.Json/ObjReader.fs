namespace FSharpCompiler.Json

open System
open FSharp.Literals

/// read from fsharp value to json
type ObjReader = 
    abstract filter: valueType:Type * value:obj -> bool
    abstract read: loopRead:(Type -> obj -> Json) * valueType:Type * value:obj -> Json

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module ObjReader =
    /// 读取数组的元素
    let readArrayElements (loopRead:Type -> obj -> Json) (elemType:Type) (elements:obj[]) =
        let ls =
            elements
            |> List.ofArray
            |> List.map(loopRead elemType)
    
        Json.Array ls

    /// 读取元组的字段
    let readTupleFields (loopRead:Type -> obj -> Json) fields =
        fields
        |> List.ofArray
        |> List.map(fun(ftype,field)-> loopRead ftype field)
        |> Json.Array

    let fallbackRead(loopRead, ty, value) =
        if ty = typeof<bool> then
            let b = unbox<bool> value
            if b then Json.True else Json.False
    
        elif ty = typeof<sbyte> then
            let value = unbox<sbyte> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<byte> then
            let value = unbox<byte> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<int16> then
            let value = unbox<int16> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<uint16> then
            let value = unbox<uint16> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<int> then
            let value = unbox<int> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<uint32> then
            let value = unbox<uint32> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<int64> then
            let value = unbox<int64> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<uint64> then
            let value = unbox<uint64> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<nativeint> then
            let value = unbox<nativeint> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<unativeint> then
            let value = unbox<unativeint> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<single> then
            let value = unbox<single> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<float> then
            let value = unbox<float> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<decimal> then
            let value = unbox<decimal> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<bigint> then
            let value = unbox<bigint> value
            Json.Number <| value.ToString()
    
        elif ty = typeof<char> then
            String [| unbox<char> value |]
            |> Json.String
    
        elif ty = typeof<string> then
            unbox<string> value
            |> Json.String

        elif isNull value then
            Json.Null
        elif ty = typeof<obj> && value.GetType() <> typeof<obj> then
            loopRead (value.GetType()) value
        else
            Json.String (Render.stringify value)

    /// read from obj to json
    let rec readObj (readers:#seq<ObjReader>) (ty:Type) (value:obj) =
        let read =
            readers
            |> Seq.tryFind(fun reader -> reader.filter(ty,value))
            |> Option.map(fun x -> x.read)
            |> Option.defaultValue fallbackRead

        read(readObj readers, ty, value)

    
    