module FSharpCompiler.Json.RecordConverter

open System
open FSharp.Literals
open Microsoft.FSharp.Reflection

let RecordReader = {
    new ObjReader with
        member _.filter(ty,value) = FSharpType.IsRecord ty
        member _.read(loopRead, ty, value) = 
            let reader = Readers.recordReader ty
            let fields = reader value
    
            fields
            |> Array.map(fun(nm,tp,value) -> nm, loopRead tp value)
            |> Set.ofArray
            |> Json.Fields

}

let RecordWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = FSharpType.IsRecord ty
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            match json with
            | Json.Fields jFields ->
                let recordFields = 
                    FSharpType.GetRecordFields(ty)

                let mp = recordFields |> Array.mapi (fun i pi -> pi.Name,i) |> Map.ofArray

                let values =
                    jFields
                    |> Set.toArray
                    |> Array.map(fun(key,jvalue)->mp.[key],jvalue)
                    |> Array.sort //将值对齐反射
                    |> Array.zip recordFields
                    |> Array.mapi(fun i (pi,(j,jValue)) -> 
                        if i = j then
                            loopWrite pi.PropertyType jValue
                        else failwith "record fields is not matched")

                FSharpValue.MakeRecord(ty,values)
            | _ -> failwith "RecordWriter.write()"
}
