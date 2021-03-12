module FSharpCompiler.Json.ClassConverter

open System
open System.Reflection

let ClassReader = {
    new ObjReader with
        member _.filter(ty,value) = ty.IsClass && ty <> typeof<string>

        member _.read(loopRead, ty, value) = 
            if isNull value then Json.Null else
            let members =
                ty.GetMembers(BindingFlags.Public ||| BindingFlags.Instance)
                |> Array.filter(fun mmbr ->
                    match mmbr.MemberType with
                    | MemberTypes.Field ->
                        let fieldInfo = mmbr :?> FieldInfo
                        not fieldInfo.IsLiteral && not fieldInfo.IsInitOnly
                    | MemberTypes.Property ->
                        let propertyInfo = mmbr :?> PropertyInfo
                        propertyInfo.CanRead && propertyInfo.CanWrite
                     | _ -> false
                )
                |> Array.map(fun mmbr ->
                    let json =
                        match mmbr.MemberType with
                        | MemberTypes.Field ->
                            let fieldInfo = mmbr:?>FieldInfo
                            let value = fieldInfo.GetValue(value)
                            loopRead fieldInfo.FieldType value
                        | MemberTypes.Property ->
                            let propertyInfo = mmbr :?> PropertyInfo
                            let value = propertyInfo.GetValue(value)                        
                            loopRead propertyInfo.PropertyType value
                        | _ -> failwith "never"
                    mmbr.Name, json
                )
                |> List.ofArray
            Json.Object members
}

let ClassWriter = {
    new ObjWriter with
        member this.filter(ty:Type, json:Json) = ty.IsClass && ty <> typeof<string>
        member this.write(loopWrite:Type -> Json -> obj, ty:Type, json:Json) =
            match json with
            | Json.Null -> null
            | Json.Object ls ->
                let target = Activator.CreateInstance(ty)
                ls
                |> List.iter(fun (name,json) -> 
                    let mmbr = 
                        ty.GetMember(name, BindingFlags.Public ||| BindingFlags.Instance)
                        |> Array.exactlyOne

                    match mmbr.MemberType with
                    | MemberTypes.Field ->
                        let fieldInfo = mmbr:?>FieldInfo
                        let value = loopWrite fieldInfo.FieldType json
                        fieldInfo.SetValue(target,value)
                    | MemberTypes.Property ->
                        let propertyInfo = mmbr:?>PropertyInfo
                        let value = loopWrite propertyInfo.PropertyType json
                        propertyInfo.SetValue(target,value)
                    | _ -> ()
                       
                    )
                target
            | _ -> failwith "ClassWriter.write()"
}
