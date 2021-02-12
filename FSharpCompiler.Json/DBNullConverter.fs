module FSharpCompiler.Json.DBNullConverter

open System

let DBNullReader = {
    new ObjReader with
        member _.filter(ty,value) = ty = typeof<DBNull> || DBNull.Value.Equals value
        member _.read(loopRead, ty, value) = Json.Null
}

let DBNullWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = ty = typeof<DBNull>
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) = box DBNull.Value
}
