module FSharpCompiler.Json.RecordConverter

open System
open FSharp.Idioms
open Microsoft.FSharp.Reflection

let RecordReader = {
    new ObjReader with
        member _.filter(ty,value) = FSharpType.IsRecord ty
        member _.read(loopRead, ty, value) = 
            let read = RecordType.readRecord ty

            read value
            |> Array.map(fun(pi,value) -> pi.Name, loopRead pi.PropertyType value)
            |> List.ofArray
            |> Json.Object

}

let RecordWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = FSharpType.IsRecord ty
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            match json with
            | (Json.Object _) as job ->
                let values =
                    RecordType.getRecordFields(ty)
                    |> Array.map(fun pi -> loopWrite pi.PropertyType job.[pi.Name])
                FSharpValue.MakeRecord(ty,values)
            | _ -> failwith "RecordWriter.write()"
}
