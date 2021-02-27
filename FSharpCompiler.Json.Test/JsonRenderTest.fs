namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions

open FSharp.Literals
open FSharp.xUnit
open FSharpCompiler.Json

type JsonRenderTest(output:ITestOutputHelper) =
    let show res =
        res
        |> Render.stringify
        |> output.WriteLine

    [<Fact>]
    member this.``empty object``() =
        let x = Json.Object []
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y "{}" 

    
    [<Fact>]
    member this.``empty array``() =
        let x = Json.Array []
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y "[]" 

    [<Fact>]
    member this.``null``() =
        let x =  Json.Null
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y "null"

    [<Fact>]
    member this.``false``() =
        let x = Json.False
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y "false" 

    [<Fact>]
    member this.``true``() =
        let x = Json.True
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y "true" 

    [<Fact>]
    member this.``empty string``() =
        let x = Json.String ""
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y "\"\""

    [<Fact>]
    member this.``number``() =
        let x = Json.Number 0.0 
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y "0"

    [<Fact>]
    member this.``single field object``() =
        let x = Json.Object["a",Json.Number 0.0]
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y """{"a":0}"""

    [<Fact>]
    member this.``many field object``() =
        let x = Json.Object["a",Json.Number 0.0;"b",Json.Null]
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y """{"a":0,"b":null}"""

    [<Fact>]
    member this.``singleton array``() =
        let x = Json.Array [Json.Number 0.0]
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y "[0]" 

    [<Fact>]
    member this.``many elements array``() =
        let x = Json.Array [Json.Number 0.0;Json.Number 1.0] 
        let y = JsonSerializer.stringify x
        //show y
        Should.equal y "[0,1]"

