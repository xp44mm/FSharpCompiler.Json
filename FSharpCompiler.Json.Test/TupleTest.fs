namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open FSharp.xUnit

type TupleTest(output: ITestOutputHelper) =
        
    [<Fact>]
    member this.``serialize array``() =
        let x = (1,"x")
        let y = ObjectConverter.serialize x
        //output.WriteLine(Render.stringify y)
        Should.equal y """[1,"x"]"""

    [<Fact>]
    member this.``deserialize array``() =
        let x = """[1,"x"]"""
        let y = ObjectConverter.deserialize<int*string> x
        //output.WriteLine(Render.stringify y)
        Should.equal y (1,"x")

    [<Fact>]
    member this.``read array``() =
        let x = (1,"x")
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Array [Json.Number 1.0;Json.String "x"]

    [<Fact>]
    member this.``write array``() =
        let x = Json.Array [Json.Number 1.0;Json.String "x"]
        let y = ObjectConverter.write<int*string> x
        //output.WriteLine(Render.stringify y)
        Should.equal y (1,"x")
