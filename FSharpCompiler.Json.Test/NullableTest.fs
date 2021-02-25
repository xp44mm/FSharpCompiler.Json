namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit


type NullableTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.``serialize nullable``() =
        let x = Nullable 3
        let y = ObjectConverter.serialize x
        Should.equal y "3"

    [<Fact>]
    member this.``serialize nullable null``() =
        let x = Nullable ()
        let y = ObjectConverter.serialize x
        Should.equal y "null"

    [<Fact>]
    member this.``deserialize nullable``() =
        let x = "3" 
        let y = ObjectConverter.deserialize<Nullable<int>> x
        Should.equal y <| Nullable 3

    [<Fact>]
    member this.``deserialize nullable null``() =
        let x = "null"
        let y = ObjectConverter.deserialize<Nullable<_>> x
        Should.equal y <| Nullable ()

    [<Fact>]
    member this.``read nullable``() =
        let x = Nullable 3
        let y = ObjectConverter.read x
        Should.equal y <| Json.Number 3.0

    [<Fact>]
    member this.``read nullable null``() =
        let x = Nullable ()
        let y = ObjectConverter.read x
        Should.equal y <| Json.Null


    [<Fact>]
    member this.``write nullable``() =
        let x = Json.Number 3.0
        let y = ObjectConverter.write<Nullable<int>> x

        Should.equal y <| Nullable 3

    [<Fact>]
    member this.``write nullable null``() =
        let x = Json.Null
        let y = ObjectConverter.write<Nullable<_>> x

        Should.equal y <| Nullable ()

