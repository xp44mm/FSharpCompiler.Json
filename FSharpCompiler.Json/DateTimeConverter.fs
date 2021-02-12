module FSharpCompiler.Json.DateTimeConverter

open System
open FSharp.Literals

[<Obsolete("use DateTimeOffset instead")>]
let DateTimeReader = {
    new ObjReader with
        member _.filter(ty,_) = ty = typeof<DateTime>
        member _.read(loopRead, ty, value) =
            value.ToString()
            |> Json.String

}
