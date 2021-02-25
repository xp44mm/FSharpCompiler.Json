module FSharpCompiler.Json.Urls.UrljsonAnylizer

open FSharpCompiler.Analyzing

let analyzer = LexicalAnalyzer(UrljsonDFA.dtran,UrljsonDFA.finalLexemes)

let normalize (tokens:seq<UrljsonToken>) =
    analyzer.split(tokens,fun tok -> tok.tag)
    |> Seq.collect(function
        | 0, [STRING lexeme] -> [KEY lexeme]
        | 1, [NULL] -> [KEY "null"]
        | 2, [FALSE] -> [KEY "false"]
        | 3, [TRUE] -> [KEY "true"]
        | 4, [LEFT_PAREN; EXCLAM; RIGHT_PAREN] -> [EMPTY_OBJECT]
        | _, ls -> ls
    )
