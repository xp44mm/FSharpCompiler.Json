module FSharpCompiler.Json.JsonRender

open FSharp.Literals.StringUtils
open System.Globalization

let decimalpoint (s:string) =
    if s.Contains "." || s.Contains "E" || s.Contains "e" then
        s
    else
        s + ".0"

let rec stringify = function
| Json.Object mp ->
    mp
    |> Map.toArray
    |> Array.map(fun(k,v)->
        toStringLiteral k + ":" + stringify v
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
| Json.String x -> toStringLiteral x
| Json.Number c -> c


