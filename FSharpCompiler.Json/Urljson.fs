module FSharpCompiler.Json.Urls.Urljson

open FSharpCompiler.Json
open System

let rec stringify (json:Json) = 
    match json with
    | Json.Object pairs ->
        pairs
        |> List.map(fun (k,v) -> Tilde.toKey k + "!" + stringify v )
        |> String.concat "*"
        |> sprintf "(%s)"

    | Json.Array ls ->
        ls
        |> List.map(fun v -> stringify v )
        |> String.concat "*"
        |> sprintf "(%s)"

    | Json.Null -> "null"
    | Json.False -> "false"
    | Json.True -> "true"
    | Json.String x -> Tilde.toLiteral x
    | Json.Number c -> System.Convert.ToString c

/// convert from value to string in json format
let serialize<'t> (value:'t) = 
    value |> ObjectConverter.read |> stringify

let deserializeObj (ty:Type) (text:string) = 
    text |> UrljsonDriver.parse |> ObjWriter.writeObj ObjectConverter.writers ty

/// convert from string instantiate value
let deserialize<'t> (text:string) = 
    text |> UrljsonDriver.parse |> ObjectConverter.write<'t>


