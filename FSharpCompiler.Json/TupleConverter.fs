﻿module FSharpCompiler.Json.TupleConverter

open System
open FSharp.Literals
open Microsoft.FSharp.Reflection

let TupleReader = {
    new ObjReader with
        member _.filter(ty,value) = FSharpType.IsTuple ty
        member _.read(loopRead, ty, value) = 
            let reader = Readers.tupleReader ty
            let elements = reader value
            let elementTypes = FSharpType.GetTupleElements(ty)
            Array.zip elementTypes elements
            |> ObjReader.readTupleFields loopRead
}

let TupleWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = FSharpType.IsTuple ty
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            match json with
            | Json.Elements elements ->
                let elements = Array.ofList elements
                let elementTypes = FSharpType.GetTupleElements(ty)
                let values =
                    Array.zip elementTypes elements
                    |> Array.map(fun(tp,json)-> loopWrite tp json)
                FSharpValue.MakeTuple(values,ty)
            | _ -> failwith "TupleWriter.write()"
}
