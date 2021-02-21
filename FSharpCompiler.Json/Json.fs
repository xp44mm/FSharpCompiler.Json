namespace FSharpCompiler.Json


[<RequireQualifiedAccess>]
type Json =
| Object of Map<string,Json>
| Array  of Json list
| Null
| False
| True
| String of string
| Number of float 

    member t.Item with get(idx:int) =
        match t with
        | Json.Array ls -> ls.[idx]
        | _ -> failwith "only for array"

    member t.Item with get(key:string) =
        match t with
        | Json.Object mp -> mp.[key]
        | _ -> failwith "only for object"
            