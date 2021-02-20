﻿module FSharpCompiler.Json.JsonRender

open FSharp.Idioms


let rec stringify = function
| Json.Object mp ->
    mp
    |> Map.toArray
    |> Array.map(fun(k,v)->
       StringLiteral.toStringLiteral k + ":" + stringify v
    )
    |> String.concat ","
    |> sprintf "{%s}"
| Json.Array ls ->
    ls
    |> List.map(fun v -> stringify v )
    |> String.concat ","
    |> sprintf "[%s]"
| Json.Null -> "null"
| Json.False -> "false"
| Json.True -> "true"
| Json.String x -> StringLiteral.toStringLiteral x
| Json.Number c -> c


