module FSharpCompiler.Json.MapConverter

open System
open FSharp.Idioms

let MapReader = {
    new ObjReader with
        member _.filter(ty,_) = ty.IsGenericType && ty.GetGenericTypeDefinition() = typedefof<Map<_,_>>
        member _.read(loopRead, ty, value) =
            let tupleType, elements = MapType.readMap ty value
            ObjReader.readArrayElements loopRead tupleType elements

}

let MapWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) =
            ty.IsGenericType && ty.GetGenericTypeDefinition() = typedefof<Map<_,_>>
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            let arrayType = MapType.makeArrayType(ty)
            let mOfArray = MapType.getOfArray(ty)
            let arr = loopWrite arrayType json
            mOfArray.Invoke(null, Array.singleton arr)

}
