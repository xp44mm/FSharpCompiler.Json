namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit
open System.Collections.Generic

type TupleTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read array``() =
        let x = (1,"x")
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Array [Json.Int32 1;Json.String "x"]

    [<Fact>]
    member this.``array instantiate``() =
        let x = Json.Array [Json.Int32 1;Json.String "x"]
        let y = 
            ObjectConverter.write<int*string> x

        //output.WriteLine(Render.stringify y)
        Should.equal y (1,"x")
        
