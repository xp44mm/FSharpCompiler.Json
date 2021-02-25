module FSharpCompiler.Json.Urls.UrljsonDriver

open FSharpCompiler.Parsing

let parser =
    SyntacticParser(
        UrljsonParsingTable.rules,
        UrljsonParsingTable.kernelSymbols,
        UrljsonParsingTable.parsingTable)

let parseTokens (tokens:seq<UrljsonToken>) =
    let parsingTree = parser.parse(tokens, fun tok -> tok.tag)
    UrljsonTranslation.translateValue parsingTree

let parse(text:string) =
    let tokens = 
        UrljsonToken.tokenize text
        |> UrljsonAnylizer.normalize
    parseTokens tokens
