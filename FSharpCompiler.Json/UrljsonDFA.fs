module FSharpCompiler.Json.Urls.UrljsonDFA
let dtran = 
    set [0u,"!",6u;0u,"(",3u;0u,")",8u;0u,"*",7u;0u,"FALSE",10u;0u,"ID",13u;0u,"NULL",9u;0u,"NUMBER",12u;0u,"STRING",1u;0u,"TRUE",11u;1u,"*",2u;3u,"*",4u;4u,")",5u]
let finalLexemes:(Set<uint32>*Set<uint32>) list = 
    [set [2u],set [1u];set [5u],Set.empty;set [6u],Set.empty;set [7u],Set.empty;set [3u],Set.empty;set [8u],Set.empty;set [9u],Set.empty;set [10u],Set.empty;set [11u],Set.empty;set [1u],Set.empty;set [12u],Set.empty;set [13u],Set.empty]