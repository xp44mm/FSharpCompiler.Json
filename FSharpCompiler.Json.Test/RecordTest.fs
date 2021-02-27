namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open FSharp.xUnit

type Person = { name : string; age : int }

type RecordTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.``serialize record``() =
        let x = { name = "abcdefg"; age = 18 }
        let y = ObjectConverter.serialize x
        //output.WriteLine(Render.stringify y)
        Should.equal y """{"name":"abcdefg","age":18}"""

    [<Fact>]
    member this.``deserialize record``() =
        let x = """{"age":18,"name":"abcdefg"}"""
        let y = ObjectConverter.deserialize<Person> x
        //output.WriteLine(Render.stringify y)
        Should.equal y { name = "abcdefg"; age = 18 }
        

    [<Fact>]
    member this.``read record``() =
        let x = { name = "abcdefg"; age = 18 }
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Object ["name",Json.String "abcdefg"; "age", Json.Number 18.0]

    [<Fact>]
    member this.``write record``() =
        let x = Json.Object ["name",Json.String "abcdefg"; "age", Json.Number 18.0]
        let y = ObjectConverter.write<Person> x
        //output.WriteLine(Render.stringify y)
        Should.equal y { name = "abcdefg"; age = 18 }

    [<Fact>]
    member this.``field items test``() =
        let x = Json.Object ["name",Json.String "abcdefg"; "age", Json.Number 18.0]
        let y = x.["name"]
        Should.equal y <| Json.String "abcdefg"

        
