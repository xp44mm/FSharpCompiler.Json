module FSharpCompiler.Json.TupleConverter

open System
open Microsoft.FSharp.Reflection
open FSharp.Idioms

let TupleReader = {
    new ObjReader with
        member _.filter(ty,value) = FSharpType.IsTuple ty
        member _.read(loopRead, ty, value) = 
            let read = TupleType.readTuple ty
            read value
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
