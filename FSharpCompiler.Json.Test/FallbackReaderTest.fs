namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open System.Reflection
open System.IO
open System.Text.RegularExpressions
open FSharp.Literals
open FSharp.xUnit

type FallbackReaderTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.``covert from sbyte test``() =
        let x = 0y
        let y = ObjectConverter.read x
        Assert.Equal(y, Json.Number 0.0)

    [<Fact>]
    member this.``covert from byte test``() =
        let x = 0uy
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 0.0)

    [<Fact>]
    member this.``covert from int16 test``() =
        let x = 0s
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 0.0)

    [<Fact>]
    member this.``covert from uint16 test``() =
        let x = 0us
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 0.0)

    [<Fact>]
    member this.``covert from int test``() =
        let x = 0
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 0.0)

    [<Fact>]
    member this.``covert from uint32 test``() =
        let x = 0u
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 0.0)

    [<Fact>]
    member this.``covert from int64 test``() =
        let x = 0L
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 0.0)

    [<Fact>]
    member this.``covert from uint64 test``() =
        let x = 0UL
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 0.0)

    [<Fact>]
    member this.``covert from single test``() =
        let x = 0.1f
        let y = ObjectConverter.read x 
        Assert.Equal(y,Json.Number 0.1)

    [<Fact>]
    member this.``covert from decimal test``() =
        let x = 0M
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 0.0)

    [<Fact>]
    member this.``covert from nativeint test``() =
        let x = 0n
        let y = ObjectConverter.read x
        Assert.Equal(y, Json.Number 0.0)

    [<Fact>]
    member this.``covert from unativeint test``() =
        let x = 0un
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 0.0)

    [<Fact>]
    member this.``covert from char test``() =
        let x = '\t'
        let y = ObjectConverter.read x
        Assert.Equal(y, Json.String "\t")

    [<Fact>]
    member this.``covert from nullable test``() =
        let x0 = Nullable()
        let y0 = ObjectConverter.read x0
        Assert.Equal(y0,Json.Null)

        let x = Nullable(3)
        let y = ObjectConverter.read x
        Assert.Equal(y,Json.Number 3.0)

    [<Fact>]
    member this.``covert from null test``() =
        let ls = null
        let res = ObjectConverter.read ls
        Should.equal res Json.Null

