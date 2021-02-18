namespace FSharpCompiler.Json.Urls

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit

type UrljsonAnalyzerTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.``key``() =
        let x = "(~xyz~*~123~)"
        let toks = UrljsonToken.tokenize x |> UrljsonAnylizer.normalize |> Seq.toList

        output.WriteLine(Render.stringify toks)
        let res = [LEFT_PAREN;KEY "~xyz~";STAR;STRING "~123~";RIGHT_PAREN]
        Should.equal toks res
    [<Fact>]
    member this.``empty object``() =
        let x = "((~xyz~!(*))"
        let toks = UrljsonToken.tokenize x |> UrljsonAnylizer.normalize |> Seq.toList

        output.WriteLine(Render.stringify toks)
        let res = [LEFT_PAREN;LEFT_PAREN;STRING "~xyz~";EXCLAM;EMPTY_OBJECT;RIGHT_PAREN]
        Should.equal toks res
