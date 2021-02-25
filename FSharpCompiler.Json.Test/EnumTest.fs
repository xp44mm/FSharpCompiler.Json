namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open FSharp.xUnit
open System.Reflection
open System.Text.RegularExpressions

type DataEntry =
| IntegerNumber  = 0
| FloatingNumber = 1
| CharString     = 2
| DateTime       = 3

type EnumTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.``serialize enum``() =
        let x = DataEntry.DateTime
        let y = ObjectConverter.serialize x

        //output.WriteLine(Render.stringify y)
        Should.equal y "\"DateTime\""

    [<Fact>]
    member this.``deserialize enum``() =
        let x = "\"DateTime\""
        let y = ObjectConverter.deserialize<DataEntry> x

        //output.WriteLine(Render.stringify y)
        Should.equal y DataEntry.DateTime

    [<Fact>]
    member this.``serialize flags``() =
        let x = BindingFlags.Public ||| BindingFlags.NonPublic
        let y = ObjectConverter.serialize x

        //output.WriteLine(Render.stringify y)
        Should.equal y """["Public","NonPublic"]"""

    [<Fact>]
    member this.``deserialize flags``() =
        let x = """["Public","NonPublic"]"""
        let y = ObjectConverter.deserialize<BindingFlags> x

        //output.WriteLine(Render.stringify y)
        Should.equal y (BindingFlags.Public ||| BindingFlags.NonPublic)

    [<Fact>]
    member this.``serialize zero flags``() =
        let x = RegexOptions.None
        let y = ObjectConverter.serialize x

        //output.WriteLine(Render.stringify y)
        Should.equal y """["None"]"""

    [<Fact>]
    member this.``deserialize zero flags``() =
        let x = """["None"]"""
        let y = ObjectConverter.deserialize<RegexOptions> x

        //output.WriteLine(Render.stringify y)
        Should.equal y RegexOptions.None

    [<Fact>]
    member this.``read enum``() =
        let x = DataEntry.DateTime
        let y = ObjectConverter.read x

        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.String "DateTime"
    [<Fact>]
    member this.``enum instantiate``() =
        let x = Json.String "DateTime"
        let y = ObjectConverter.write<DataEntry> x

        //output.WriteLine(Render.stringify y)
        Should.equal y DataEntry.DateTime




         
    [<Fact>]
    member this.``read flags``() =
        let x = BindingFlags.Public ||| BindingFlags.NonPublic
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify res)
        Should.equal y <| Json.Array [Json.String "Public"; Json.String "NonPublic" ]

    [<Fact>]
    member this.``flags instantiate``() =
        let x = Json.Array [Json.String "Public"; Json.String "NonPublic" ]
        let y = ObjectConverter.write<BindingFlags> x

        //output.WriteLine(Render.stringify y)
        Should.equal y (BindingFlags.Public ||| BindingFlags.NonPublic)

    [<Fact>]
    member this.``read zero flags``() =
        let x = RegexOptions.None
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify res)
        Should.equal y <| Json.Array [Json.String "None"]

    [<Fact>]
    member this.``zero flags instantiate``() =
        let x = Json.Array [Json.String "None"]
        let y = ObjectConverter.write<RegexOptions> x

        //output.WriteLine(Render.stringify y)
        Should.equal y RegexOptions.None

