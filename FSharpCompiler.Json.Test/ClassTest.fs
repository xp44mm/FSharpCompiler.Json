namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit

type MutableVector2D() =
    let mutable currDX = 0.0
    let mutable currDY = 0.0
    member vec.DX with get() = currDX and set v = currDX <- v
    member vec.DY with get() = currDY and set v = currDY <- v
    member vec.Length
        with get () = sqrt (currDX * currDX + currDY * currDY)

    member vec.Angle
        with get () = atan2 currDY currDX

type ClassTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.``ObjectConverter read``() =
        let x = MutableVector2D()
        let y = ObjectConverter.read x
        //output.WriteLine(Render.stringify y)
        Should.equal y <| Json.Object ["DX",Json.Number 0.0;"DY",Json.Number 0.0]

    [<Fact>]
    member this.``ObjectConverter write``() =
        let x = Json.Object ["DX",Json.Number 0.0;"DY",Json.Number 0.0]
        let y = ObjectConverter.write<MutableVector2D> x
        //output.WriteLine(Render.stringify y)
        let z = MutableVector2D()
        Should.equal (y.DX,y.DY) (z.DX,z.DY)

    [<Fact>]
    member this.``is class``() =
        Should.equal typeof<bool>.IsClass       false
        Should.equal typeof<sbyte>.IsClass      false
        Should.equal typeof<byte>.IsClass       false
        Should.equal typeof<int16>.IsClass      false
        Should.equal typeof<uint16>.IsClass     false
        Should.equal typeof<int>.IsClass        false
        Should.equal typeof<uint32>.IsClass     false
        Should.equal typeof<int64>.IsClass      false
        Should.equal typeof<uint64>.IsClass     false
        Should.equal typeof<single>.IsClass     false
        Should.equal typeof<float>.IsClass      false
        Should.equal typeof<char>.IsClass       false
        Should.equal typeof<string>.IsClass     true
        Should.equal typeof<decimal>.IsClass    false
        Should.equal typeof<nativeint>.IsClass  false
        Should.equal typeof<unativeint>.IsClass false
