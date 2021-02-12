﻿namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit
open System.Collections.Generic

type ArrayTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read array``() =
        let x = [|1;2;3|]
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Elements [Json.Int32 1;Json.Int32 2;Json.Int32 3]

    [<Fact>]
    member this.``array instantiate``() =
        let x = Json.Elements [Json.Int32 1;Json.Int32 2;Json.Int32 3]
        let y = ObjectConverter.write<int[]> x

        //output.WriteLine(Render.stringify y)
        Should.equal y [|1;2;3|]

