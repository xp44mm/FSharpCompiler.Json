namespace FSharpCompiler.Json.Urls

open Xunit
open Xunit.Abstractions
open System
open FSharp.Literals
open FSharp.xUnit
open FSharpCompiler.Json.Urls

type UrlTokenTest(output: ITestOutputHelper) =
    [<Fact>]
    member this.json() =
        let x = "(inlet*(SO2*0!SO3*1)!eobj*(*)!earr*()!arr*(10!11!12)!dirtyLeakage*~Yes: \"it's great!\"~)"
        let toks = UrljsonToken.tokenize x |> Seq.toList

        //output.WriteLine(Render.stringify toks)
        let res = [
            LEFT_PAREN;ID "inlet";STAR;LEFT_PAREN;ID "SO2";STAR;NUMBER "0";EXCLAM;ID "SO3";STAR;NUMBER "1";
            RIGHT_PAREN;EXCLAM;ID "eobj";STAR;LEFT_PAREN;STAR;RIGHT_PAREN;EXCLAM;ID "earr";STAR;LEFT_PAREN;
            RIGHT_PAREN;EXCLAM;ID "arr";STAR;LEFT_PAREN;NUMBER "10";EXCLAM;NUMBER "11";EXCLAM;NUMBER "12";
            RIGHT_PAREN;EXCLAM;ID "dirtyLeakage";STAR;STRING "~Yes: \"it's great!\"~";RIGHT_PAREN
            ]
        Should.equal toks res

    [<Fact>]
    member this.jsonEmptyArray() =
        let x = " ( )"
        let toks = UrljsonToken.tokenize x |> Seq.toList

        //output.WriteLine(Render.stringify toks)
        let res = [LEFT_PAREN;RIGHT_PAREN]
        Should.equal toks res

    [<Fact>]
    member this.``simple tokens``() =
        let x = "((null!true!false)!(*)!($*-1.1e2!x'*~~))"
        let toks = UrljsonToken.tokenize x |> Seq.toList

        //output.WriteLine(Render.stringify toks)
        let res = [
            LEFT_PAREN;LEFT_PAREN;NULL;EXCLAM;TRUE;EXCLAM;FALSE;
            RIGHT_PAREN;EXCLAM;LEFT_PAREN;STAR;RIGHT_PAREN;EXCLAM;LEFT_PAREN;ID "$";STAR;NUMBER "-1.1e2";
            EXCLAM;ID "x'";STAR;STRING "~~";RIGHT_PAREN;RIGHT_PAREN
            ]
        Should.equal toks res

    [<Fact>]
    member this.``id tokens``() =
        let x = "id*0!$*1!x'*2!x1*3!汉字*4"
        let toks = UrljsonToken.tokenize x |> Seq.toList

        //output.WriteLine(Render.stringify toks)
        let res = [
            ID "id";STAR;NUMBER "0";EXCLAM;
            ID "$";STAR;NUMBER "1";EXCLAM;
            ID "x'";STAR;NUMBER "2";EXCLAM;
            ID "x1";STAR;NUMBER "3";EXCLAM;
            ID "汉字";STAR;NUMBER "4"]
        Should.equal toks res

    [<Fact>]
    member this.``string tokens``() =
        let x = """~~!~~~~!~"~!~~!~~"""
        let toks = UrljsonToken.tokenize x |> Seq.toList

        output.WriteLine(Render.stringify toks)
        let res = [
            STRING "~~";EXCLAM;
            STRING "~~~~";EXCLAM;
            STRING "~\"~";EXCLAM;
            STRING "~~";EXCLAM;
            STRING "~~"]
        Should.equal toks res

    [<Fact>]
    member this.``number tokens``() =
        let x = """0!0.0!+1!1E2!0.5e-3"""
        let toks = UrljsonToken.tokenize x |> Seq.toList

        output.WriteLine(Render.stringify toks)
        let res = [
            NUMBER "0";EXCLAM;
            NUMBER "0.0";EXCLAM;
            NUMBER "+1";EXCLAM;
            NUMBER "1E2";EXCLAM;
            NUMBER "0.5e-3"
            ]
        Should.equal toks res



