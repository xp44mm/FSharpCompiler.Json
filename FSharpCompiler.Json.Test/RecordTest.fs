namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open FSharp.xUnit

type Person = { name : string; age : int }

type RecordTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read record``() =
        let x = { name = "cuisl"; age = 18 }
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Object (Map.ofList["name",Json.String "cuisl"; "age", Json.Number 18.0])

    [<Fact>]
    member this.``record instantiate``() =
        let x = Json.Object (Map.ofList["name",Json.String "cuisl"; "age", Json.Number 18.0])
        let y = ObjectConverter.write<Person> x

        //output.WriteLine(Render.stringify y)
        Should.equal y { name = "cuisl"; age = 18 }
        
