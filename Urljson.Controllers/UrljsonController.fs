namespace Urljson.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging

open FSharpCompiler.Json.Urls
open Microsoft.Extensions.Primitives

[<ApiController>]
[<Route("[controller]/[action]")>]
type UrljsonController(log:ILogger<UrljsonController>) =
    inherit ControllerBase()

    [<HttpGet>]
    member this.emptyParam() = 
        let pairs =
            this.Request.Query
            |> Seq.map(fun kvp -> kvp.Key, if StringValues.IsNullOrEmpty(kvp.Value) then "" else kvp.Value.[0])
            |> Seq.toArray

        log.LogDebug(sprintf "%A" pairs)
        pairs

    [<HttpGet>]
    member this.parseField() =
        let mp =
            this.Request.Query
            |> Seq.map(fun kvp -> kvp.Key, if StringValues.IsNullOrEmpty(kvp.Value) then "" else kvp.Value.[0])
            |> Map.ofSeq
        {|
            section = UrlQuery.parseField<SectionInput> mp.["section"]
            panel = UrlQuery.parseField<PanelInput> mp.["panel"]
        |}

    [<HttpGet>]
    member this.SectionInput() =
        let pairs =
            this.Request.Query
            |> Seq.map(fun kvp -> kvp.Key, if StringValues.IsNullOrEmpty(kvp.Value) then "" else kvp.Value.[0])
            |> Seq.toArray

        let inp = UrlQuery.parse<SectionInput> pairs
        log.LogDebug(sprintf "%A" inp)
        inp

    [<HttpGet>]
    member this.HorizDuctInput() =
        let pairs =
            this.Request.Query
            |> Seq.map(fun kvp -> kvp.Key, if StringValues.IsNullOrEmpty(kvp.Value) then "" else kvp.Value.[0])
            |> Seq.toArray

        let inp = UrlQuery.parse<HorizDuctInput> pairs
        log.LogDebug(sprintf "%A" inp)
        inp
