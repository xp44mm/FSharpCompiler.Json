namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit

type OptionTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.``covert from none test``() =
        Should.equal 
            (ObjectConverter.read<int option> None) 
            Json.Null

    [<Fact>]
    member this.``none union case instantiate``() =
        let x = Json.Null
        let y = 
            ObjectConverter.write<int option> x

        //output.WriteLine(Render.stringify y)
        Should.equal y None

    [<Fact>]
    member this.``some union case read``() =
        let x = Some 1
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Int32 1

    [<Fact>]
    member this.``some union case instantiate``() =
        let x = Json.Int32 1
        let y = ObjectConverter.write<int option> x

        //output.WriteLine(Render.stringify y)
        Should.equal y <| Some 1


