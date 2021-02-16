namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit

type FallbackWriterTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``Array test``() =
        
        let json = Json.Elements [Json.Int32 32;Json.Int32 20]
        let y = ObjectConverter.write<int[]> json
        let yy = [|32;20|]

        //output.WriteLine(Render.stringify y)
        Should.equal y yy

    [<Fact>]
    member this.``tuple test``() =
        let json = Json.Elements [Json.Int32 32;Json.String "xx"]
        let y = ObjectConverter.write<int*string> json
        let yy = 32,"xx"

        //output.WriteLine(Render.stringify y)
        Should.equal y yy

    [<Fact>]
    member this.``record test``() =
        let json = Json.Fields (Map.ofList ["a",Json.Int32 32;"b",Json.String"xx"])

        let y = ObjectConverter.write<{|a:int;b:string|}> json
        let yy = {|a=32;b="xx"|}

        //output.WriteLine(Render.stringify y)
        Should.equal y yy
