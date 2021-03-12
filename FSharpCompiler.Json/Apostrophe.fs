module FSharpCompiler.Json.Urls.Apostrophe

open FSharp.Idioms
open System.Text.RegularExpressions
open System
open System.Globalization

/// 'xyz' -> xyz
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
                | PrefixChar '\'' rest ->
                    yield '\''
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
                | Prefix "\u[0-9A-Fa-f]{4}" (x,rest) ->
                    let ffff = x.[2..]
                    let value = Convert.ToInt16(ffff,16)
                    yield Convert.ToChar value
                    yield! loop rest
                | _ -> // 容错
                    yield '\\'
                    yield! loop rest
            | _ ->
                yield inp.[0]
                yield! loop inp.[1..]
        }

    System.String(
        loop literal.[1..literal.Length-2] 
        |> Array.ofSeq
    )

/// xyz -> 'xyz'
let toLiteral (value:string) =
    let chars = value.ToCharArray()

    chars
    |> Array.mapi(fun i c ->
        match c with
        | '\\' -> @"\\"
        | '\'' -> @"\'"
        | '\b' -> @"\b"
        | '\f' -> @"\f"
        | '\n' -> @"\n"
        | '\r' -> @"\r"
        | '\t' -> @"\t"
        | c when c < '\u0010' -> 
            @"\u000" + Convert.ToString(Convert.ToInt16(c),16)
        | c when c < '\u0020' -> 
            @"\u00" + Convert.ToString(Convert.ToInt16(c),16)
        | c ->
            c.ToString(CultureInfo.InvariantCulture)
    )
    |> String.concat ""
    |> fun s -> "'" + s + "'"

let toKey (name:string) =
    //鍵名有空白字符，标点，运算符需要括起来
    if name = "" || Regex.IsMatch(name, @"[\u0000-\u001f\s()*!']") then
        toLiteral name
    else name