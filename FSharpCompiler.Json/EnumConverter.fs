module FSharpCompiler.Json.EnumConverter

open System
open FSharp.Literals
open System.Reflection
open System
open System.Collections.Concurrent
open System.Reflection
open FSharp.Literals

/// 
let toUInt64 (ty:Type) =
    if ty = typeof<sbyte> then
        unbox<sbyte> >> uint64
    elif ty = typeof<byte> then
        unbox<byte> >> uint64
    elif ty = typeof<int16> then
        unbox<int16> >> uint64
    elif ty = typeof<uint16> then
        unbox<uint16> >> uint64
    elif ty = typeof<int32> then
        unbox<int32> >> uint64
    elif ty = typeof<uint32> then
        unbox<uint16> >> uint64
    elif ty = typeof<int64> then
        unbox<int64> >> uint64
    elif ty = typeof<uint64> then
        unbox<uint64>
    elif ty = typeof<nativeint> then
        unbox<nativeint> >> uint64
    elif ty = typeof<unativeint> then
        unbox<unativeint> >> uint64
    else
        failwith "Unknown Enum Underlying Type."
        
/// 
let fromUInt64 (ty:Type) (src:uint64) =
    src |>
    if ty = typeof<sbyte> then
        sbyte >> box
    elif ty = typeof<byte> then
        byte >> box
    elif ty = typeof<int16> then
        int16 >> box
    elif ty = typeof<uint16> then
        uint16 >> box
    elif ty = typeof<int32> then
        int32 >> box
    elif ty = typeof<uint32> then
        uint16 >> box
    elif ty = typeof<int64> then
        int64 >> box
    elif ty = typeof<uint64> then
        box
    elif ty = typeof<nativeint> then
        nativeint >> box
    elif ty = typeof<unativeint> then
        unativeint >> box
    else
        failwith "Unknown Enum Underlying Type."


let underlyingTypes = ConcurrentDictionary<Type, Type>(HashIdentity.Structural)
let nameValuePairs  = ConcurrentDictionary<Type, (string*uint64)[]>(HashIdentity.Structural)
let values = ConcurrentDictionary<Type, Map<string,uint64>>(HashIdentity.Structural)

let getEnumUnderlyingType (enumType:Type) =
    let valueFactory (enumType:Type) = enumType.GetEnumUnderlyingType()
    underlyingTypes.GetOrAdd(enumType,valueFactory)

let getNameValuePairs (enumType:Type) =
    let valueFactory (enumType:Type) = 
        let underlyingType = getEnumUnderlyingType enumType
        Enum.GetNames(enumType)
        |> Array.map(fun name ->
            let value =     
                enumType.GetField(
                    name, BindingFlags.Public ||| BindingFlags.Static
                    ).GetValue(null)
                |> toUInt64 underlyingType
            name, value
        )
    nameValuePairs.GetOrAdd(enumType,valueFactory)

let getValues(enumType:Type) =
    let valueFactory (enumType:Type) = 
        getNameValuePairs enumType
        |> Map.ofArray
    values.GetOrAdd(enumType,valueFactory)

///[<Flags>] Enum 的值
let flagsReader =
    let dic = ConcurrentDictionary<Type, obj -> string[]>(HashIdentity.Structural)
    let valueFactory (ty:Type) =
        let enumUnderlyingType = getEnumUnderlyingType ty
        let zeroPairs,positivePairs = 
            getNameValuePairs ty
            |> Array.partition(fun (name,value) -> value = 0UL)

        let zeroNames = zeroPairs |> Array.map fst

        let reader (inpEnum:obj) =
            let inpValue = toUInt64 enumUnderlyingType inpEnum
            let flagNames =
                positivePairs
                |> Array.filter(fun(flag,flagValue) -> inpValue &&& flagValue = flagValue)
                |> Array.map fst

            if Array.isEmpty flagNames then zeroNames else flagNames
        reader

    fun (ty:Type) -> dic.GetOrAdd(ty, Func<_,_> valueFactory)

let private read (ty:Type) (value:obj) =
    if ty.IsDefined(typeof<FlagsAttribute>,false) then
        let reader = flagsReader ty
        reader value
        |> Array.map(Json.String)
        |> Array.toList
        |> Json.Elements
    else
        Json.String <| Enum.GetName(ty,value)

let private write (ty:Type) (json:Json) =
    let enumUnderlyingType = getEnumUnderlyingType ty
    let values = getValues ty

    if ty.IsDefined(typeof<FlagsAttribute>,false) then
        match json with
        | Json.Elements flags ->
            flags
            |> List.map(function
                | Json.String flag -> values.[flag] 
                | json -> failwith (Render.stringify json)
            )
            |> List.reduce(|||)
        | _ -> failwith (Render.stringify json)
    else
        match json with
        | Json.String enum -> values.[enum]
        | _ -> failwith (Render.stringify json)
    |> fromUInt64 enumUnderlyingType


let EnumReader = {
    new ObjReader with
        member _.filter(ty,_) = ty.IsEnum
        member _.read(loopRead, ty, value) = read ty value
}

let EnumWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = ty.IsEnum
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) = write ty json
}
