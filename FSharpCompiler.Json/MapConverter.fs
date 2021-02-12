module FSharpCompiler.Json.MapConverter

open System
open FSharp.Literals
open Microsoft.FSharp.Reflection

let MapReader = {
    new ObjReader with
        member _.filter(ty,_) = ty.IsGenericType && ty.GetGenericTypeDefinition() = typedefof<Map<_,_>>
        member _.read(loopRead, ty, value) =
            let reader = Readers.mapReader ty
            let elements = reader value
            let tupleType = FSharpType.MakeTupleType(ty.GenericTypeArguments)
            ObjReader.readArrayElements loopRead tupleType elements

}

let MapWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) =
            ty.IsGenericType && ty.GetGenericTypeDefinition() = typedefof<Map<_,_>>
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            let elementType = FSharpType.MakeTupleType(ty.GenericTypeArguments)
            let arrayType = elementType.MakeArrayType()
            let mOfArrayDef = FSharpModules.mapModuleType.GetMethod "OfArray"
            let mOfArray = mOfArrayDef.MakeGenericMethod(ty.GenericTypeArguments)
            let arr = loopWrite arrayType json
            mOfArray.Invoke(null, Array.singleton arr)

}
