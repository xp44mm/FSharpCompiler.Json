namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit
open System.Collections.Generic

type DBNullConverterTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read DBNull``() =
        let x = DBNull.Value
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Null

    [<Fact>]
    member this.``DBNull instantiate``() =
        let x = Json.Null
        let y = ObjectConverter.write<DBNull> x

        //output.WriteLine(Render.stringify y)
        Should.equal y <| DBNull.Value

