namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit

type GuidTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``read``() =
        let x = Guid("936da01f-9abd-4d9d-80c7-02af85c822a8")
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y 
        <| Json.String "936da01f-9abd-4d9d-80c7-02af85c822a8"

    [<Fact>]
    member this.``instantiate``() =
        let x = Json.String "936da01f-9abd-4d9d-80c7-02af85c822a8"
        let y = ObjectConverter.write<Guid> x

        //output.WriteLine(Render.stringify y)
        Should.equal y <| Guid("936da01f-9abd-4d9d-80c7-02af85c822a8")

