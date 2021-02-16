module FSharpCompiler.Json.SetConverter

open System
open System.Reflection
open FSharp.Idioms

let SetReader = {
    new ObjReader with
        member _.filter(ty,_) = ty.IsGenericType && ty.GetGenericTypeDefinition() = typedefof<Set<_>>
        member _.read(loopRead, ty, value) =
            let elementType, elements = SetType.readSet ty value
            ObjReader.readArrayElements loopRead elementType elements

}

let SetWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = ty.IsGenericType && ty.GetGenericTypeDefinition() = typedefof<Set<_>>
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            let arrayType = SetType.makeArrayType ty
            let arr = loopWrite arrayType json

            let mOfArray = SetType.getOfArray ty
            mOfArray.Invoke(null, Array.singleton arr)

}
