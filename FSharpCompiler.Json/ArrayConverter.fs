module FSharpCompiler.Json.ArrayConverter

open System
open FSharp.Idioms

let ArrayReader = {
    new ObjReader with
        member _.filter(ty,value) = ty.IsArray && ty.GetArrayRank() = 1
        member _.read(loopRead, ty, value) = 
            let elemType,elements = ArrayType.readArray ty value
            ObjReader.readArrayElements loopRead elemType elements

}

let ArrayWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = ty.IsArray && ty.GetArrayRank() = 1
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            match json with
            | Json.Array elements ->
                let elementType = ArrayType.getElementType ty
                let arr = (Array.CreateInstance:Type*int->Array)(elementType, elements.Length)

                elements
                |> List.map(fun e -> loopWrite elementType e)
                |> List.iteri(fun i v -> arr.SetValue(v, i))

                box arr

            | _ -> failwith "ArrayWriter.write()"
}
