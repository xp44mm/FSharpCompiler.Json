module FSharpCompiler.Json.Urls.Tilde

open FSharp.Idioms
open System.Text.RegularExpressions
open System

/// ~xyz~ -> xyz
let parseLiteral (literal:string) =
    let rec loop inp =
        seq {
            match inp with
            | "" -> ()
            | PrefixChar '\\' rest ->
                match rest with
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
                | _ -> // 容错
                    yield '\\'
                    yield! loop rest

            | Prefix "~~" (x,rest) ->
                yield '~'
                yield! loop rest

            | _ ->
                yield inp.[0]
                yield! loop inp.[1..]
        }

    System.String(
        loop literal.[1..literal.Length-2] 
        |> Array.ofSeq
    )

/// xyz -> ~xyz~
let toLiteral (value:string) =
    let chars = value.ToCharArray()
    let needDouble = function
    | 'b' | 'f' | 'n' | 'r' | 't' | 'u' | '\\' | '\b' | '\f' | '\n' | '\r' | '\t'
        -> true
    | c -> false

    chars
    |> Array.mapi(fun i c ->
        match c with
        | '\\' -> 
            if i < chars.Length - 1 && needDouble chars.[i+1] then
                @"\\"
            else
                @"\"
        | '\b' -> @"\b"
        | '\f' -> @"\f"
        | '\n' -> @"\n"
        | '\r' -> @"\r"
        | '\t' -> @"\t"

        | '~'  -> "~~"
        | c -> c.ToString(System.Globalization.CultureInfo.InvariantCulture)
    )
    |> String.concat ""
    |> fun s -> "~" + s + "~"

let toKey (name:string) =
    //鍵名有空白字符，标点，运算符
    if name = "" || Regex.IsMatch(name, "[\s()*!~]") then
        toLiteral name
    else name