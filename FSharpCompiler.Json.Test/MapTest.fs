namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit

type MapTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read``() =
        let x = Map.ofList [1,"1";2,"2"]
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y 
        <| Json.Array [Json.Array [Json.Int32 1;Json.String "1"];Json.Array [Json.Int32 2;Json.String "2"]]

    [<Fact>]
    member this.``instantiate``() =
        let x = Json.Array [Json.Array [Json.Int32 1;Json.String "1"];Json.Array [Json.Int32 2;Json.String "2"]]
        let y = ObjectConverter.write<Map<int,string>> x

        //output.WriteLine(Render.stringify y)
        Should.equal y (Map.ofList [1,"1";2,"2"])
