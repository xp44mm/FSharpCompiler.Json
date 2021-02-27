namespace FSharpCompiler.Json.Urls

open Xunit
open Xunit.Abstractions
open System
open FSharp.xUnit
open FSharp.Literals

type TildeTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``parseLiteral empty``() =
        let x = "~~"
        let y = Tilde.parseLiteral x
        Should.equal y ""

    [<Fact>]
    member this.``toLiteral empty``() =
        let x = ""
        let y = Tilde.toLiteral x
        Should.equal y "~~"


    [<Fact>]
    member this.``parseLiteral tilde``() =
        let x = "~~~~"
        let y = Tilde.parseLiteral x
        Should.equal y "~"

    [<Fact>]
    member this.``toLiteral tilde``() =
        let x = "~"
        let y = Tilde.toLiteral x
        Should.equal y "~~~~"

    [<Fact>]
    member this.``parseLiteral Escape Characters``() =
        let x = """~\\\b\f\n\r\t\w~"""
        let y = Tilde.parseLiteral x
        Should.equal y "\\\b\f\n\r\t\w"

    [<Fact>]
    member this.``toLiteral Escape Characters``() =
        let x = String [|'\\';'\b';'\f';'\n';'\r';'\t';'\\';'w'|]
        let y = Tilde.toLiteral x
        Should.equal y """~\\\b\f\n\r\t\w~"""

    [<Fact>]
    member this.``parseLiteral Unicode character``() =
        let x = """~\u00a9~"""
        let y = Tilde.parseLiteral x
        Should.equal y "©"

    [<Fact>]
    member this.``toLiteral Unicode character``() =
        let x = "©" 
        let y = Tilde.toLiteral x
        Should.equal y "~©~"
