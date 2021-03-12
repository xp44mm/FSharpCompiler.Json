namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.xUnit
open FSharp.Literals

// https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/strings
type FSharpEscapeSequenceTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.``Alert or Bell``() =
        let x = "\a"
        let y = int (x.Chars 0)
        Should.equal y 7

    [<Fact>]
    member this.``Backspace``() =
        let x = "\b"
        let y = int (x.Chars 0)
        Should.equal y 8


    [<Fact>]
    member this.``Form feed``() =
        let x = "\f"
        let y = int (x.Chars 0)
        Should.equal y 12


    [<Fact>]
    member this.``Newline``() =
        let x = "\n"
        let y = int (x.Chars 0)
        Should.equal y 10


    [<Fact>]
    member this.``Carriage return``() =
        let x = "\r"
        let y = int (x.Chars 0)
        Should.equal y 13


    [<Fact>]
    member this.``Horizontal Tab``() =
        let x = "\t"
        let y = int (x.Chars 0)
        Should.equal y 9


    [<Fact>]
    member this.``Vertical tab``() =
        let x = "\v"
        let y = int (x.Chars 0)
        Should.equal y 11


