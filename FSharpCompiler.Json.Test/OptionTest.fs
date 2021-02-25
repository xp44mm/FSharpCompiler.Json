namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit

type OptionTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.``read none``() =
        let x = None
        let y = ObjectConverter.read<int option> x
        Should.equal y Json.Null

    [<Fact>]
    member this.``write none``() =
        let x = Json.Null
        let y = ObjectConverter.write<int option> x

        //output.WriteLine(Render.stringify y)
        Should.equal y None

    [<Fact>]
    member this.``read some``() =
        let x = Some 1
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Number 1.0

    [<Fact>]
    member this.``write some``() =
        let x = Json.Number 1.0
        let y = ObjectConverter.write<int option> x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Some 1

    [<Fact>]
    member this.``serialize none``() =
        let x = None
        let y = ObjectConverter.serialize x
        Should.equal y "null"

    [<Fact>]
    member this.``deserialize none``() =
        let x = "null"
        let y = ObjectConverter.deserialize<_ option> x
        //output.WriteLine(Render.stringify y)
        Should.equal y None

    [<Fact>]
    member this.``serialize some``() =
        let x = Some 1
        let y = ObjectConverter.serialize x
        //output.WriteLine(Render.stringify y)
        Should.equal y "1"

    [<Fact>]
    member this.``deserialize some``() =
        let x = "1"
        let y = ObjectConverter.deserialize<int option> x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Some 1



