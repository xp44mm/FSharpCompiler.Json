module FSharpCompiler.Json.GuidConverter

open System
open FSharp.Literals

let GuidReader = {
    new ObjReader with
        member _.filter(ty,value) = ty = typeof<Guid>
        member _.read(loopRead, ty, value) = value.ToString() |> Json.String
}

let GuidWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = ty = typeof<Guid>
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            match json with
            | Json.String guid -> box <| Guid.Parse(guid)
            | _ -> failwith (Render.stringify json)
}
