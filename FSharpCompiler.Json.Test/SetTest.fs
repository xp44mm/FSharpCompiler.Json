namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit

type SetTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read set``() =
        let x = set [1;2;3]
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Array [Json.Number 1.0;Json.Number 2.0;Json.Number 3.0]

    [<Fact>]
    member this.``set instantiate``() =
        let x = Json.Array [Json.Number 1.0;Json.Number 2.0;Json.Number 3.0]
        let y = ObjectConverter.write<Set<int>> x

        //output.WriteLine(Render.stringify y)
        Should.equal y (set[1;2;3])

