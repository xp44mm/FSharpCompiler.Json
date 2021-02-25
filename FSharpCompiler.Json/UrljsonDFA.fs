module FSharpCompiler.Json.Urls.UrljsonDFA
let dtran = 
    set [0u,"!",12u;0u,"(",9u;0u,")",14u;0u,"*",13u;0u,"FALSE",5u;0u,"KEY",16u;0u,"NULL",3u;0u,"NUMBER",15u;0u,"STRING",1u;0u,"TRUE",7u;1u,"!",2u;3u,"!",4u;5u,"!",6u;7u,"!",8u;9u,"!",10u;10u,")",11u]
let finalLexemes:(Set<uint32>*Set<uint32>) list = 
    [set [2u],set [1u];set [4u],set [3u];set [6u],set [5u];set [8u],set [7u];set [11u],Set.empty;set [12u],Set.empty;set [13u],Set.empty;set [9u],Set.empty;set [14u],Set.empty;set [3u],Set.empty;set [5u],Set.empty;set [7u],Set.empty;set [1u],Set.empty;set [15u],Set.empty;set [16u],Set.empty]