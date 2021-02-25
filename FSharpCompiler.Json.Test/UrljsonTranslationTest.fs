namespace FSharpCompiler.Json.Urls

open Xunit
open Xunit.Abstractions

open FSharp.Literals
open FSharp.xUnit

open FSharpCompiler.Parsing
open FSharpCompiler.Json
open FSharpCompiler.Json.Urls

type UrljsonTranslationTest(output:ITestOutputHelper) =
    let show res =
        res
        |> Render.stringify
        |> output.WriteLine
    
    [<Fact>]
    member this.``empty object``() =
        let x = Interior("value",[Interior("object",[Terminal EMPTY_OBJECT])])
        let y = UrljsonTranslation.translateValue x
        //show y
        Should.equal y 
        <| Json.Object Map.empty

    [<Fact>]
    member this.``empty array``() =
        let x = Interior("value",[Interior("array",[Terminal LEFT_PAREN;Terminal RIGHT_PAREN])])
        let y = UrljsonTranslation.translateValue x
        //show y
        Should.equal y 
        <| Json.Array []

    [<Fact>]
    member this.``null``() =
        let x = Interior("value",[Terminal NULL])
        let y = UrljsonTranslation.translateValue x
        //show y
        Should.equal y 
        <| Json.Null

    [<Fact>]
    member this.``false``() =
        let x = Interior("value",[Terminal FALSE])
        let y = UrljsonTranslation.translateValue x
        //show y
        Should.equal y 
        <| Json.False

    [<Fact>]
    member this.``true``() =
        let x = Interior("value",[Terminal TRUE])
        let y = UrljsonTranslation.translateValue x
        //show y
        Should.equal y 
        <| Json.True

    [<Fact>]
    member this.``empty string``() =
        let x = Interior("value",[Terminal(STRING "")])
        let y = UrljsonTranslation.translateValue x
        //show y
        Should.equal y 
        <| Json.String ""

    [<Fact>]
    member this.``number``() =
        let x = Interior("value",[Terminal(NUMBER 0.0)])
        let y = UrljsonTranslation.translateValue x
        //show y
        Should.equal y 
        <| Json.Number 0.0

    [<Fact>]
    member this.``translateObject``() =
        let x = Interior("object",[Terminal LEFT_PAREN;Interior("fields",[Interior("fields",[Interior("field",[Terminal(KEY "a");Terminal EXCLAM;Interior("value",[Terminal(NUMBER 0.0)])])]);Terminal ASTERISK;Interior("field",[Terminal(KEY "b!");Terminal EXCLAM;Interior("value",[Terminal NULL])])]);Terminal RIGHT_PAREN])
        let y = UrljsonTranslation.translateObject x
        show y
        Should.equal y
        <| Map.ofList["a",Json.Number 0.0;"b!",Json.Null]

    [<Fact>]
    member this.``translateFields``() =
        let x = Interior("fields",[Interior("fields",[Interior("field",[Terminal(KEY "a");Terminal EXCLAM;Interior("value",[Terminal(NUMBER 0.0)])])]);Terminal ASTERISK;Interior("field",[Terminal(KEY "b!");Terminal EXCLAM;Interior("value",[Terminal NULL])])])
        let y = UrljsonTranslation.translateFields x
        show y
        Should.equal y 
        <| ["b!",Json.Null;"a",Json.Number 0.0;]

    [<Fact>]
    member this.``translateField``() =
        let x = Interior("field",[Terminal(KEY "a");Terminal EXCLAM;Interior("value",[Terminal(NUMBER 0.0)])])
        let y = UrljsonTranslation.translateField x
        show y
        Should.equal y 
        <| ("a",Json.Number 0.0)

    [<Fact>]
    member this.``translateArray``() =
        let x = Interior("array",[Terminal LEFT_PAREN;Interior("values",[Interior("values",[Interior("value",[Terminal(NUMBER 0.0)])]);Terminal ASTERISK;Interior("value",[Terminal(NUMBER 1.0)])]);Terminal RIGHT_PAREN])
        let y = UrljsonTranslation.translateArray x
        //show y
        Should.equal y 
        <| [Json.Number 0.0; Json.Number 1.0]

    [<Fact>]
    member this.``translateValues``() =
        let x = Interior("values",[Interior("values",[Interior("value",[Terminal(NUMBER 0.0)])]);Terminal ASTERISK;Interior("value",[Terminal(NUMBER 1.0)])])
        let y = UrljsonTranslation.translateValues x
        //show y
        Should.equal y 
        <| [Json.Number 1.0; Json.Number 0.0]


