module FSharpCompiler.Json.Urls.UrljsonTranslation

open FSharpCompiler.Json
open FSharpCompiler.Json.Urls

open FSharpCompiler.Parsing

let rec translateValue = function
| Interior("value",[Interior("object",_) as object]) ->
    object
    |> translateObject
    |> Json.Object
| Interior("value",[Interior("array",_) as array]) ->
    array
    |> translateArray
    |> Json.Array
| Interior("value",[Terminal(UrljsonToken.NULL)]) ->
    Json.Null
| Interior("value",[Terminal(UrljsonToken.FALSE)]) ->
    Json.False
| Interior("value",[Terminal(UrljsonToken.TRUE)]) ->
    Json.True
| Interior("value",[Terminal(UrljsonToken.STRING s)]) ->
    Json.String s
| Interior("value",[Terminal(UrljsonToken.NUMBER s)]) ->
    Json.String s
| never -> failwithf "%A"  <| never.firstLevel()

and translateObject = function
| Interior("object",[Terminal(UrljsonToken.EMPTY_OBJECT)]) ->
    Map.empty
| Interior("object",[Terminal(UrljsonToken.LEFT_PAREN);fields;Terminal(UrljsonToken.RIGHT_PAREN)]) ->
    translateFields fields
    |> Map.ofList
| never -> failwithf "%A"  <| never.firstLevel()

and translateFields = function
| Interior("fields",[Interior("fields",_) as ls; Terminal(UrljsonToken.EXCLAM); field]) ->
    translateField field :: translateFields ls
| Interior("fields",[field]) ->
    [translateField field]
| Interior("fields",[]) ->
    []
| never -> failwithf "%A"  <| never.firstLevel()

and translateField = function
| Interior("field",[name; Terminal(UrljsonToken.STAR); value]) ->
    (translateName name, translateValue value)
| never -> failwithf "%A"  <| never.firstLevel()

and translateName = function
| Interior("name",[Terminal(UrljsonToken.ID s)]) ->
    s 
| Interior("name",[Terminal(UrljsonToken.KEY s)]) ->
    s // detidles
| never -> failwithf "%A"  <| never.firstLevel()

and translateArray = function
| Interior("array",[Terminal(UrljsonToken.LEFT_PAREN);values;Terminal(UrljsonToken.RIGHT_PAREN)]) ->
    values
    |> translateValues
    |> List.rev
| never -> failwithf "%A"  <| never.firstLevel()

and translateValues = function
| Interior("values",[Interior("values",_) as ls; Terminal(UrljsonToken.EXCLAM); value]) ->
    translateValue value :: translateValues ls
| Interior("values",[value]) ->
    [translateValue value]
| Interior("values",[]) ->
    []
| never -> failwithf "%A" <| never.firstLevel()
