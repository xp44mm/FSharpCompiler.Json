namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open FSharp.xUnit

type FallbackWriterTest(output: ITestOutputHelper) =

    [<Fact>]
    member this.``null``() =
        let json = Json.Null
        let y = ObjectConverter.write<_> json
        Should.equal y null

    [<Fact>]
    member this.``false``() =
        let json = Json.False
        let y = ObjectConverter.write<_> json
        Should.equal y false

    [<Fact>]
    member this.``true``() =
        let json = Json.True
        let y = ObjectConverter.write<_> json
        Should.equal y true

    [<Fact>]
    member this.``string``() =
        let json = Json.String ""
        let y = ObjectConverter.write<string> json
        Should.equal y ""

    [<Fact>]
    member this.``char``() =
        let json = Json.String "0"
        let y = ObjectConverter.write<char> json
        Should.equal y '0'

    [<Fact>]
    member this.``number sbyte``() =
        let json = Json.Number 0.0
        let y = ObjectConverter.write<sbyte> json
        Should.equal y 0y

    [<Fact>]
    member this.``number byte``() =
        let x =Json.Number 0.0
        let y = ObjectConverter.write<_> x
        Assert.Equal(y, 0uy)

    [<Fact>]
    member this.``number int16``() =
        let x =Json.Number 0.0
        let y = ObjectConverter.write<_> x
        Assert.Equal(y, 0s)

    [<Fact>]
    member this.``number uint16``() =
        let x =Json.Number 0.0
        let y = ObjectConverter.write<_> x
        Assert.Equal(y, 0us)

    [<Fact>]
    member this.``number int``() =
        let x =Json.Number 0.0
        let y = ObjectConverter.write<_> x
        Assert.Equal(y, 0)

    [<Fact>]
    member this.``number uint32``() =
        let x =Json.Number 0.0
        let y = ObjectConverter.write<_> x
        Assert.Equal(y, 0u)

    [<Fact>]
    member this.``number int64``() =
        let x =Json.Number 0.0
        let y = ObjectConverter.write<_> x
        Assert.Equal(y, 0L)

    [<Fact>]
    member this.``number uint64``() =
        let x =Json.Number 0.0 
        let y = ObjectConverter.write<_> x
        Assert.Equal(y,0UL)

    [<Fact>]
    member this.``number single``() =
        let x =Json.Number 0.1
        let y = ObjectConverter.write<_> x 
        Assert.Equal(y, 0.1f)

    [<Fact>]
    member this.``number decimal``() =
        let x =Json.Number 0.0
        let y = ObjectConverter.write<_> x
        Assert.Equal(y, 0M)

    [<Fact>]
    member this.``number nativeint``() =
        let x = Json.Number 0.0
        let y = ObjectConverter.write<_> x
        Assert.Equal(y, 0n)

    [<Fact>]
    member this.``number unativeint``() =
        let x =Json.Number 0.0
        let y = ObjectConverter.write<_> x
        Assert.Equal(y, 0un)
