module FSharpCompiler.Json.Urls.UrljsonParsingTable
let rules = set [["";"value"];["array";"(";"elements";")"];["elements"];["elements";"elements";"!";"value"];["elements";"value"];["field";"name";"*";"value"];["fields";"field"];["fields";"fields";"!";"field"];["name";"ID"];["name";"KEY"];["object";"(";"fields";")"];["object";"EMPTY_OBJECT"];["value";"FALSE"];["value";"NULL"];["value";"NUMBER"];["value";"STRING"];["value";"TRUE"];["value";"array"];["value";"object"]]
let kernelSymbols = Map.ofList [1,"value";2,"(";3,"elements";4,")";5,"!";6,"value";7,"value";8,"name";9,"*";10,"value";11,"field";12,"fields";13,"!";14,"field";15,"ID";16,"KEY";17,")";18,"EMPTY_OBJECT";19,"FALSE";20,"NULL";21,"NUMBER";22,"STRING";23,"TRUE";24,"array";25,"object"]
let parsingTable = set [0,"(",2;0,"EMPTY_OBJECT",18;0,"FALSE",19;0,"NULL",20;0,"NUMBER",21;0,"STRING",22;0,"TRUE",23;0,"array",24;0,"object",25;0,"value",1;1,"",0;2,"!",-2;2,"(",2;2,")",-2;2,"EMPTY_OBJECT",18;2,"FALSE",19;2,"ID",15;2,"KEY",16;2,"NULL",20;2,"NUMBER",21;2,"STRING",22;2,"TRUE",23;2,"array",24;2,"elements",3;2,"field",11;2,"fields",12;2,"name",8;2,"object",25;2,"value",7;3,"!",5;3,")",4;4,"",-1;4,"!",-1;4,")",-1;5,"(",2;5,"EMPTY_OBJECT",18;5,"FALSE",19;5,"NULL",20;5,"NUMBER",21;5,"STRING",22;5,"TRUE",23;5,"array",24;5,"object",25;5,"value",6;6,"!",-3;6,")",-3;7,"!",-4;7,")",-4;8,"*",9;9,"(",2;9,"EMPTY_OBJECT",18;9,"FALSE",19;9,"NULL",20;9,"NUMBER",21;9,"STRING",22;9,"TRUE",23;9,"array",24;9,"object",25;9,"value",10;10,"!",-5;10,")",-5;11,"!",-6;11,")",-6;12,"!",13;12,")",17;13,"ID",15;13,"KEY",16;13,"field",14;13,"name",8;14,"!",-7;14,")",-7;15,"*",-8;16,"*",-9;17,"",-10;17,"!",-10;17,")",-10;18,"",-11;18,"!",-11;18,")",-11;19,"",-12;19,"!",-12;19,")",-12;20,"",-13;20,"!",-13;20,")",-13;21,"",-14;21,"!",-14;21,")",-14;22,"",-15;22,"!",-15;22,")",-15;23,"",-16;23,"!",-16;23,")",-16;24,"",-17;24,"!",-17;24,")",-17;25,"",-18;25,"!",-18;25,")",-18]