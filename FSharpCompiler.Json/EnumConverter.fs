module FSharpCompiler.Json.EnumConverter

open System
open FSharp.Literals
open FSharp.Idioms

let private read (ty:Type) (value:obj) =
    if ty.IsDefined(typeof<FlagsAttribute>,false) then
        let reader = EnumType.readFlags ty
        reader value
        |> Array.map(Json.String)
        |> Array.toList
        |> Json.Elements
    else
        Json.String <| Enum.GetName(ty,value)

let private write (ty:Type) (json:Json) =
    let enumUnderlyingType = EnumType.getEnumUnderlyingType ty
    let values = EnumType.getValues ty

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
    |> EnumType.fromUInt64 enumUnderlyingType


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
