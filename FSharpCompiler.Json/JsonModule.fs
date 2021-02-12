[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
module FSharpCompiler.Json.Json

let parse(text:string) = JsonDriver.parse text

let stringify tree = JsonRender.stringify tree


