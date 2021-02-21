namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals

open FSharpCompiler.Parsing

open FSharp.xUnit
open FSharpCompiler.Json


type JsonTranslationTest(output:ITestOutputHelper) =
    let show res =
        res
        |> Render.stringify
        |> output.WriteLine

    [<Fact>]
    member this.``empty object``() =
        let x = Interior("value",[Interior("object",[Terminal LEFT_BRACE;Terminal RIGHT_BRACE])])
        let y = JsonTranslation.translateValue x
        //show y
        Should.equal y <| Json.Object Map.empty

    [<Fact>]
    member this.``empty array``() =
        let x = Interior("value",[Interior("array",[Terminal LEFT_BRACK;Terminal RIGHT_BRACK])])
        let y = JsonTranslation.translateValue x
        //show y
        Should.equal y <| Json.Array [] 

    [<Fact>]
    member this.``null``() =
        let x = Interior("value",[Terminal NULL])
        let y = JsonTranslation.translateValue x
        //show y
        Should.equal y <| Json.Null

    [<Fact>]
    member this.``false``() =
        let x = Interior("value",[Terminal FALSE])
        let y = JsonTranslation.translateValue x
        //show y
        Should.equal y <| Json.False

    [<Fact>]
    member this.``true``() =
        let x = Interior("value",[Terminal TRUE])
        let y = JsonTranslation.translateValue x
        //show y
        Should.equal y <| Json.True

    [<Fact>]
    member this.``empty string``() =
        let x = Interior("value",[Terminal(STRING "")])
        let y = JsonTranslation.translateValue x
        //show y
        Should.equal y <| Json.String ""

    [<Fact>]
    member this.``number``() =
        let x = Interior("value",[Terminal(NUMBER 0.0)])
        let y = JsonTranslation.translateValue x
        //show y
        Should.equal y <| Json.Number 0.0

    [<Fact>]
    member this.``translateObject empty Object``() =
        let x = Interior("object",[Terminal LEFT_BRACE;Terminal RIGHT_BRACE])
        let y = JsonTranslation.translateObject x
        //show y
        Should.equal y Map.empty

    [<Fact>]
    member this.``translateObject``() =
        let x = Interior("object",[Terminal LEFT_BRACE;Interior("fields",[Interior("field",[Terminal(STRING "a");Terminal COLON;Interior("value",[Terminal(NUMBER 0.0)])])]);
        Terminal RIGHT_BRACE])
        let y = JsonTranslation.translateObject x
        //show y
        Should.equal y <| Map.ofList ["a",Json.Number 0.0]

    [<Fact>]
    member this.``translateFields single``() =
        let x = Interior("fields",[Interior("field",[Terminal(STRING "a");Terminal COLON;Interior("value",[Terminal(NUMBER 0.0)])])])
        let y = JsonTranslation.translateFields x
        //show y
        Should.equal y ["a",Json.Number 0.0]

    [<Fact>]
    member this.``translateFields``() =
        let x = Interior("fields",[Interior("fields",[
            Interior("field",[Terminal(STRING "a");Terminal COLON;Interior("value",[Terminal(NUMBER 0.0)])])]);Terminal COMMA;
            Interior("field",[Terminal(STRING "b");Terminal COLON;Interior("value",[Terminal NULL])])]);
        let y = JsonTranslation.translateFields x
        //show y
        Should.equal y ["b",Json.Null;"a",Json.Number 0.0]


    [<Fact>]
    member this.``translateField``() =
        let x = Interior("field",[Terminal(STRING "a");Terminal COLON;Interior("value",[Terminal(NUMBER 0.0)])])
        let y = JsonTranslation.translateField x
        //show y
        Should.equal y ("a",Json.Number 0.0)

    [<Fact>]
    member this.``translateArray empty array``() =
        let x = Interior("array",[Terminal LEFT_BRACK;Terminal RIGHT_BRACK])
        let y = JsonTranslation.translateArray x
        //show y
        Should.equal y [] 

    [<Fact>]
    member this.``translateArray``() =
        let x = Interior("array",[Terminal LEFT_BRACK;Interior("values",[Interior("value",[Terminal(NUMBER 0.0)])]);Terminal RIGHT_BRACK])
        let y = JsonTranslation.translateArray x
        //show y
        Should.equal y [Json.Number 0.0]

    [<Fact>]
    member this.``translateValues single``() =
        let x = Interior("values",[Interior("value",[Terminal(NUMBER 0.0)])])
        let y = JsonTranslation.translateValues x
        //show y
        Should.equal y [Json.Number 0.0]

    [<Fact>]
    member this.``translateValues``() =
        let x = Interior("values",[Interior("values",[
            Interior("value",[Terminal(NUMBER 0.0)])]);Terminal COMMA;
            Interior("value",[Terminal(NUMBER 1.0)])]);
        let y = JsonTranslation.translateValues x
        //show y
        Should.equal y [Json.Number 1.0;Json.Number 0.0]


