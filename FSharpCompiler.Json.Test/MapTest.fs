namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open FSharp.xUnit

type MapTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read map``() =
        let x = Map.ofList [1,"1";2,"2"]
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y 
        <| Json.Array [Json.Array [Json.Number 1.0;Json.String "1"];Json.Array [Json.Number 2.0;Json.String "2"]]

    [<Fact>]
    member this.``write map``() =
        let x = Json.Array [Json.Array [Json.Number 1.0;Json.String "1"];Json.Array [Json.Number 2.0;Json.String "2"]]
        let y = ObjectConverter.write<Map<int,string>> x
        //output.WriteLine(Render.stringify y)
        Should.equal y (Map.ofList [1,"1";2,"2"])

    [<Fact>]
    member this.``serialize map``() =
        let x = Map.ofList [1,"1";2,"2"]
        let y = ObjectConverter.serialize x
        //output.WriteLine(Render.stringify y)
        Should.equal y """[[1,"1"],[2,"2"]]"""

    [<Fact>]
    member this.``deserialize map``() =
        let x = """[[1,"1"],[2,"2"]]"""
        let y = ObjectConverter.deserialize<Map<int,string>> x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Map.ofList [1,"1";2,"2"]



