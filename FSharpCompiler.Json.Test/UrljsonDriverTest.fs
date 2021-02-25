namespace FSharpCompiler.Json.Urls

open Xunit
open Xunit.Abstractions

open FSharp.Literals
open FSharp.xUnit
open FSharpCompiler.Json

type UrljsonDriverTest(output:ITestOutputHelper) =
    let show res =
        res
        |> Render.stringify
        |> output.WriteLine

    [<Fact>]
    member this.``empty object``() =
        let x = "(!)"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.Object Map.empty

    [<Fact>]
    member this.``empty array``() =
        let x = "()"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.Array []

    [<Fact>]
    member this.``null``() =
        let x = "null"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.Null

    [<Fact>]
    member this.``false``() =
        let x = "false"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.False

    [<Fact>]
    member this.``true``() =
        let x = "true"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.True

    [<Fact>]
    member this.``empty string``() =
        let x = "~~"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.String ""

    [<Fact>]
    member this.``number``() =
        let x = "0"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.Number 0.0

    [<Fact>]
    member this.``single field object``() =
        let x = "(a!0)"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.Object(Map.ofList["a",Json.Number 0.0])

    [<Fact>]
    member this.``many field object``() =
        let x = "(a!0*b!null)"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.Object(Map.ofList["a",Json.Number 0.0;"b",Json.Null;])

    [<Fact>]
    member this.``singleton array``() =
        let x = "(0)"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.Array [Json.Number 0.0]

    [<Fact>]
    member this.``many elements array``() =
        let x = "(0*1)"
        let y = UrljsonDriver.parse x
        //show y
        Should.equal y 
        <| Json.Array [Json.Number 0.0;Json.Number 1.0]

