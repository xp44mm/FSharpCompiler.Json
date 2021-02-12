namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit
open System.Collections.Generic

type TimeSpanConverterTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read DateTimeOffset``() =
        let x = TimeSpan(2, 14, 18)
        let y = ObjectConverter.read x

        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.String "02:14:18"

    [<Fact>]
    member this.``DateTimeOffset instantiate``() =
        let x = Json.String "02:14:18"
        let y = ObjectConverter.write<TimeSpan> x

        //output.WriteLine(Render.stringify y)
        Should.equal y <| TimeSpan(2, 14, 18)

