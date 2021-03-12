﻿module FSharpCompiler.Json.Urls.UrlQuery

open System
open FSharpCompiler.Json
open System.Reflection

let parseFieldToJson (ty:Type) (value:string) =

    if ty = typeof<string> then
        Json.String value
    else
        UrljsonDriver.parse value

let parseField<'t> (value:string) = 
    let ty = typeof<'t>
    let json = parseFieldToJson ty value
    ObjectConverter.write<'t> json

/// parse Query string collection
let parse<'t> (fields:seq<string*string>) =
    let ty = typeof<'t>

    let target = Activator.CreateInstance(ty)

    fields
    |> Seq.iter(fun (name,json) -> 
        let mmbr = 
            ty.GetMember(name, BindingFlags.Public ||| BindingFlags.Instance)
            |> Array.exactlyOne

        match mmbr.MemberType with
        | MemberTypes.Field ->
            let fieldInfo = mmbr :?> FieldInfo
            let fty = fieldInfo.FieldType
            fieldInfo.SetValue(target, parseFieldToJson fty json |> ObjWriter.writeObj ObjectConverter.writers fty)

        | MemberTypes.Property ->
            let propertyInfo = mmbr :?> PropertyInfo
            let pty = propertyInfo.PropertyType
            propertyInfo.SetValue(target, parseFieldToJson pty json |> ObjWriter.writeObj ObjectConverter.writers pty)

        | _ -> ()
    )
    target :?> 't