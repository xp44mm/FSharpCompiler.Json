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
    member this.``zero union case``() =
        let x = Zero
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Object(Map.ofList ["Zero",Json.Null])

    [<Fact>]
    member this.``zero union case instantiate``() =
        let x = Json.Object(Map.ofList ["Zero",Json.Null])
        let y = 
            ObjectConverter.write<UionExample> x

        //output.WriteLine(Render.stringify y)
        Should.equal y Zero

    [<Fact>]
    member this.``only one union case``() =
        let x = OnlyOne 1
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Object(Map.ofList ["OnlyOne",Json.Int32 1])

    [<Fact>]
    member this.``only one union case instantiate``() =
        let x = Json.Object(Map.ofList ["OnlyOne",Json.Int32 1])
        let y = 
            ObjectConverter.write<UionExample> x

        //output.WriteLine(Render.stringify y)
        Should.equal y <| OnlyOne 1

    [<Fact>]
    member this.``many params union case``() =
        let x = Pair(1,"")
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Object(Map.ofList ["Pair",Json.Array [Json.Int32 1;Json.String ""]])

    [<Fact>]
    member this.``many params union case instantiate``() =
        let x = Json.Object(Map.ofList ["Pair",Json.Array [Json.Int32 1;Json.String ""]])
        let y = 
            ObjectConverter.write<UionExample> x

        Should.equal y <| Pair(1,"")

