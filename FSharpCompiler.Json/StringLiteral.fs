module FSharpCompiler.Json.StringLiteral

open FSharp.Idioms
open System.Text.RegularExpressions
open System
open System.Globalization

/// unprintable control codes -> utf-16 | else -> directly map
let toUtf16 (c:Char) =
    match int c with 
    | charCode when charCode < 16 ->
        "\\u000" + Convert.ToString(charCode,16)
    | charCode when charCode < 32 ->
        "\\u00" + Convert.ToString(charCode,16)
    | _ -> c.ToString(CultureInfo.InvariantCulture)

/// xyz -> "xyz"
let toLiteral (value:string) =
    value.ToCharArray()
    |> Array.mapi(fun i c ->
        match c with
        | '\\' -> @"\\" // 並不會智能省略轉義符合
        | '"' -> "\\\""
        | '\b' -> @"\b"
        | '\f' -> @"\f"
        | '\n' -> @"\n"
        | '\r' -> @"\r"
        | '\t' -> @"\t"
        | c -> toUtf16 c
    )
    |> String.concat ""
    |> sprintf "\"%s\""

/// "xyz" -> xyz
let parseLiteral (literal:string) =
    let rec loop inp =
        seq {
            match inp with
            | "" -> ()
            | PrefixChar '\\' rest ->
                match rest with
                | PrefixChar '"' rest ->
                    yield '"'
                    yield! loop rest
                | PrefixChar '\\' rest ->
                    yield '\\'
                    yield! loop rest
                | PrefixChar 'b' rest ->
                    yield '\b'
                    yield! loop rest
                | PrefixChar 'f' rest ->
                    yield '\f'
                    yield! loop rest
                | PrefixChar 'n' rest ->
                    yield '\n'
                    yield! loop rest
                | PrefixChar 'r' rest ->
                    yield '\r'
                    yield! loop rest
                | PrefixChar 't' rest ->
                    yield '\t'
                    yield! loop rest
                | Prefix "u[0-9A-Fa-f]{4}" (x,rest) ->
                    let ffff = x.[1..]
                    let value = System.Convert.ToInt32(ffff,16)
                    yield System.Convert.ToChar value
                    yield! loop rest
                | rest -> // 落单的后斜杠容错
                    yield '\\'
                    yield! loop rest
            | inp ->
                yield inp.[0]
                yield! loop inp.[1..]
        }

    System.String(
        loop literal.[1..literal.Length-2]
        |> Array.ofSeq
    )

