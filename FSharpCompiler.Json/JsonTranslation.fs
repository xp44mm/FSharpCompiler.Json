module FSharpCompiler.Json.JsonTranslation

open FSharpCompiler.Parsing

let rec translateValue = function
| Interior("value",[Interior("object",_) as object]) ->
    object
    |> translateObject 
    |> Json.Object
| Interior("value",[Interior("array",_) as array]) ->
    array
    |> translateValues
    |> Json.Array
| Interior("value",[Terminal(NULL)]) ->
    Json.Null
| Interior("value",[Terminal(FALSE)]) ->
    Json.False
| Interior("value",[Terminal(TRUE)]) ->
    Json.True
| Interior("value",[Terminal(STRING s)]) ->
    Json.String s
| Interior("value",[Terminal(NUMBER s)]) ->
    Json.Number s
| never -> failwithf "%A"  <| never.firstLevel()

and translateObject = function
| Interior("object",[Terminal(LEFT_BRACE);fields;Terminal(RIGHT_BRACE)]) ->
    translateFields fields
    |> Map.ofList
| never -> failwithf "%A"  <| never.firstLevel()

and translateArray = function
| Interior("array",[Terminal(LEFT_BRACK);values;Terminal(RIGHT_BRACK)]) ->
    values
    |> translateValues
    |> List.rev
| never -> failwithf "%A"  <| never.firstLevel()

and translateFields = function
| Interior("fields",[Interior("fields",_) as ls; Terminal(COMMA); field]) ->
    translateField field :: translateFields ls
| Interior("fields",[field]) ->
    [translateField field]
| Interior("fields",[]) ->
    []
| never -> failwithf "%A"  <| never.firstLevel()

and translateField = function
| Interior("field",[Terminal(STRING s);Terminal(COLON);value]) ->
    (s, translateValue value)
| never -> failwithf "%A"  <| never.firstLevel()

and translateValues = function
| Interior("values",[Interior("values",_) as ls;Terminal(COMMA); value]) ->
    translateValue value :: translateValues ls
| Interior("values",[value]) ->
    [translateValue value]
| Interior("values",[]) ->
    []
| never -> failwithf "%A" <| never.firstLevel()
