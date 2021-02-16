module FSharpCompiler.Json.ListConverter

open System
open FSharp.Idioms

let ListReader = {
    new ObjReader with
        member _.filter(ty,_) = ty.IsGenericType && ty.GetGenericTypeDefinition() = typedefof<List<_>>
        member _.read(loopRead, ty, value) =
            let elemType, elements = ListType.readList ty value
            ObjReader.readArrayElements loopRead elemType elements
}

let ListWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = ty.IsGenericType && ty.GetGenericTypeDefinition() = typedefof<List<_>>
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            let elementType = ListType.getElementType ty
            let arrayType = elementType.MakeArrayType()
            let arr = loopWrite arrayType json
            let mOfArray = ListType.getOfArray ty
            mOfArray.Invoke(null, Array.singleton arr)

}
