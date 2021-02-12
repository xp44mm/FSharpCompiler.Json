module FSharpCompiler.Json.ObjectConverter

let readers = [
    DateTimeOffsetConverter.DateTimeOffsetReader
    TimeSpanConverter.TimeSpanReader
    GuidConverter.GuidReader
    EnumConverter.EnumReader
    DBNullConverter.DBNullReader
    NullableConverter.NullableReader
    OptionConverter.OptionReader
    ArrayConverter.ArrayReader
    TupleConverter.TupleReader
    RecordConverter.RecordReader
    ListConverter.ListReader
    SetConverter.SetReader
    MapConverter.MapReader
    UnionConverter.UnionReader
    ]

let writers = [
    DateTimeOffsetConverter.DateTimeOffsetWriter
    TimeSpanConverter.TimeSpanWriter
    GuidConverter.GuidWriter
    EnumConverter.EnumWriter
    DBNullConverter.DBNullWriter
    NullableConverter.NullableWriter
    OptionConverter.OptionWriter
    ArrayConverter.ArrayWriter
    TupleConverter.TupleWriter
    RecordConverter.RecordWriter
    ListConverter.ListWriter
    SetConverter.SetWriter
    MapConverter.MapWriter
    UnionConverter.UnionWriter
]

/// convert from value to json
let read<'t> (value:'t) = ObjReader.readObj readers typeof<'t> value

/// convert from json to value
let write<'t> (json:Json) = ObjWriter.writeObj writers typeof<'t> json :?> 't

/// convert from value to string in json format
let serialize<'t> (value:'t) = value |> read |> Json.stringify

/// convert from string instantiate value
let deserialize<'t> (text:string) = text |> Json.parse |> write<'t>
