module FSharpCompiler.Json.UnionConverter

open FSharp.Idioms
open Microsoft.FSharp.Reflection

let UnionReader = {
    new ObjReader with
        member _.filter(ty,_) = FSharpType.IsUnion ty
        member _.read(loopRead, ty, value) =
            let reader = UnionType.readUnion ty
            let name,fields = reader value
            //简化
            let unionFields =
                if Array.isEmpty fields then 
                    // union case is paramless
                    Json.Null
                elif fields.Length = 1 then 
                    // union case is single param
                    loopRead <|| fields.[0]
                else 
                    // union case is tuple
                    ObjReader.readTupleFields loopRead fields

            Map.ofList [name,unionFields]
            |> Json.Fields
}

let UnionWriter = {
    new ObjWriter with
        member this.filter(ty,json) = FSharpType.IsUnion ty
        member this.write(loopWrite,ty,json) =
            match json with
            | Json.Fields fields ->
                let jkey, jvalue =  fields |> Map.toList |> List.exactlyOne

                let unionCaseInfo =
                    UnionType.getUnionCases ty
                    |> Array.find(fun c -> c.Name = jkey)

                let uionFieldTypes =
                    UnionType.getCaseFields unionCaseInfo
                    |> Array.map(fun info -> info.PropertyType)

                match uionFieldTypes with
                | [||] ->
                    FSharpValue.MakeUnion(unionCaseInfo, Array.empty)
                | [|fieldType|] ->
                    FSharpValue.MakeUnion(unionCaseInfo, Array.singleton(loopWrite fieldType jvalue))
                | _ ->
                    let fields =
                        match jvalue with
                        | Json.Elements elements ->
                            elements
                            |> Array.ofList
                            |> Array.zip uionFieldTypes
                            |> Array.map(fun (t,j) -> loopWrite t j)
                        | _ -> failwith "Json structure does not match"
                    FSharpValue.MakeUnion(unionCaseInfo, fields)
            | _ -> failwith "Json structure does not match"
}
