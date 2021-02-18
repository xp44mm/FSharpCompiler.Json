module FSharpCompiler.Json.Urls.UrljsonAnylizer

open FSharpCompiler.Analyzing

let analyzer = LexicalAnalyzer(UrljsonDFA.dtran,UrljsonDFA.finalLexemes)

let normalize (tokens:seq<UrljsonToken>) =
    analyzer.split(tokens,fun(tok:UrljsonToken)-> tok.tag)
    |> Seq.collect(function
        | 0, [STRING lexeme] -> [KEY lexeme]
        | 1, [LEFT_PAREN; STAR; RIGHT_PAREN] -> [EMPTY_OBJECT]
        | _, ls -> ls
    )
