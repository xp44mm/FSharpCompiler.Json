﻿namespace FSharpCompiler.Json

open Xunit
open Xunit.Abstractions
open System
open System.IO

open FSharpCompiler.Yacc
open FSharp.Literals
open FSharp.xUnit

type JsonParsingTableTest(output:ITestOutputHelper) =
    let show res =
        res
        |> Render.stringify
        |> output.WriteLine

    let locatePath = Path.Combine(DirectoryInfo(__SOURCE_DIRECTORY__).Parent.FullName,"FSharpCompiler.Json")
    let filePath = Path.Combine(locatePath, @"json.yacc")
    let text = File.ReadAllText(filePath)
    let yaccFile = YaccFile.parse text

    [<Fact>]
    member this.``1-input data``() =
        //show yaccFile.mainRules
        let y = [
            ["value";"object"];["value";"array"];["value";"NULL"];["value";"FALSE"];["value";"TRUE"];["value";"STRING"];["value";"NUMBER"];
            ["object";"{";"fields";"}"];
            ["array";"[";"values";"]"];
            ["fields";"fields";",";"field"];["fields";"field"];["fields"];
            ["field";"STRING";":";"value"];
            ["values";"values";",";"value"];["values";"value"];["values"]]
        
        Should.equal y yaccFile.mainRules

        Assert.True(yaccFile.precedences.IsEmpty)

    [<Fact>]
    member this.``2-产生式冲突``() =
        let tbl = AmbiguousTable.create yaccFile.mainRules
        let pconflicts = ConflictFactory.productionConflict tbl.ambiguousTable
        //show pconflicts
        Assert.True(pconflicts.IsEmpty)

    [<Fact>]
    member this.``3-符号多用警告``() =
        let tbl = AmbiguousTable.create yaccFile.mainRules
        let warning = ConflictFactory.overloadsWarning tbl
        //show warning
        Assert.True(warning.IsEmpty)

    [<Fact>]
    member this.``4-优先级冲突``() =
        let tbl = AmbiguousTable.create yaccFile.mainRules
        let srconflicts = ConflictFactory.shiftReduceConflict tbl
        show srconflicts
        Assert.True(srconflicts.IsEmpty)

    //[<Fact>]
    member this.``5-generate parsing table``() =
        let yacc = ParseTable.create(yaccFile.mainRules, yaccFile.precedences)

        //解析表数据
        let result =
            [
                "module FSharpCompiler.Json.JsonParsingTable"
                "let rules = " + Render.stringify yacc.rules
                "let kernelSymbols = " + Render.stringify yacc.kernelSymbols
                "let parsingTable = " + Render.stringify yacc.parsingTable
            ] |> String.concat Environment.NewLine
        let outputDir = Path.Combine(locatePath, @"JsonParsingTable.fs")
        File.WriteAllText(outputDir,result)
        output.WriteLine("output yacc:"+outputDir)

    [<Fact>]
    member this.``5-verify parsing table``() =
        let yacc = ParseTable.create(yaccFile.mainRules, yaccFile.precedences)

        Should.equal yacc.rules         JsonParsingTable.rules
        Should.equal yacc.kernelSymbols JsonParsingTable.kernelSymbols
        Should.equal yacc.parsingTable  JsonParsingTable.parsingTable









