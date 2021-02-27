module FSharpCompiler.Json.JsonSerializer

let parse(text:string) = 
    if System.String.IsNullOrEmpty text then
        failwith "empty string is illeagal json string."
    else
        JsonDriver.parse text

let stringify tree = JsonRender.stringify tree


