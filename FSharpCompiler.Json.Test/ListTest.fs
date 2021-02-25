namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open FSharp.xUnit

type ListTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read list``() =
        let x = [1;2;3]
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Array [Json.Number 1.0;Json.Number 2.0;Json.Number 3.0]

    [<Fact>]
    member this.``write list``() =
        let x = Json.Array [Json.Number 1.0;Json.Number 2.0;Json.Number 3.0]
        let y = ObjectConverter.write<List<int>> x
        //output.WriteLine(Render.stringify y)
        Should.equal y [1;2;3]
    
    [<Fact>]
    member this.``serialize list``() =
        let x = [1;2;3]
        let y = ObjectConverter.serialize x
        //output.WriteLine(Render.stringify y)
        Should.equal y "[1,2,3]"

    [<Fact>]
    member this.``deserialize list``() =
        let x = "[1,2,3]"
        let y = ObjectConverter.deserialize<List<int>> x
        //output.WriteLine(Render.stringify y)
        Should.equal y [1;2;3]

