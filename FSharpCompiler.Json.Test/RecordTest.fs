﻿namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit
open System.Collections.Generic

type Person = { name : string; age : int }

type RecordTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read record``() =
        let x = { name = "cuisl"; age = 18 }
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Fields (set["name",Json.String "cuisl"; "age", Json.Int32 18])

    [<Fact>]
    member this.``record instantiate``() =
        let x = Json.Fields (set["name",Json.String "cuisl"; "age", Json.Int32 18])
        let y = ObjectConverter.write<Person> x

        //output.WriteLine(Render.stringify y)
        Should.equal y { name = "cuisl"; age = 18 }
        