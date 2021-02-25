namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit

type UionExample =
| Zero
| OnlyOne of int
| Pair of int * string

type UnionTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read zero union case``() =
        let x = Zero
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Object(Map.ofList ["Zero",Json.Null])

    [<Fact>]
    member this.``write zero union case``() =
        let x = Json.Object(Map.ofList ["Zero",Json.Null])
        let y = ObjectConverter.write<UionExample> x
        //output.WriteLine(Render.stringify y)
        Should.equal y Zero


    [<Fact>]
    member this.``serialize zero union case``() =
        let x = Zero
        let y = ObjectConverter.serialize x
        //output.WriteLine(Render.stringify y)
        Should.equal y """{"Zero":null}"""

    [<Fact>]
    member this.``deserialize zero union case``() =
        let x = """{"Zero":null}"""
        let y = ObjectConverter.deserialize<UionExample> x
        //output.WriteLine(Render.stringify y)
        Should.equal y Zero





    [<Fact>]
    member this.``read only-one union case``() =
        let x = OnlyOne 1
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Object(Map.ofList ["OnlyOne",Json.Number 1.0])

    [<Fact>]
    member this.``write only-one union case``() =
        let x = Json.Object(Map.ofList ["OnlyOne",Json.Number 1.0])
        let y = ObjectConverter.write<UionExample> x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| OnlyOne 1

    [<Fact>]
    member this.``serialize only-one union case``() =
        let x = OnlyOne 1
        let y = ObjectConverter.serialize x
        //output.WriteLine(Render.stringify y)
        Should.equal y """{"OnlyOne":1}"""

    [<Fact>]
    member this.``deserialize only-one union case``() =
        let x = """{"OnlyOne":1}"""
        let y = ObjectConverter.deserialize<UionExample> x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| OnlyOne 1




    [<Fact>]
    member this.``read many params union case``() =
        let x = Pair(1,"")
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Object(Map.ofList ["Pair",Json.Array [Json.Number 1.0;Json.String ""]])

    [<Fact>]
    member this.``write many params union case``() =
        let x = Json.Object(Map.ofList ["Pair",Json.Array [Json.Number 1.0;Json.String ""]])
        let y = ObjectConverter.write<UionExample> x
        Should.equal y <| Pair(1,"")

    [<Fact>]
    member this.``serialize many params union case``() =
        let x = Pair(1,"")
        let y = ObjectConverter.serialize x
        //output.WriteLine(Render.stringify y)
        Should.equal y """{"Pair":[1,""]}"""

    [<Fact>]
    member this.``deserialize many params union case``() =
        let x = """{"Pair":[1,""]}"""
        let y = ObjectConverter.deserialize<UionExample> x
        Should.equal y <| Pair(1,"")
