import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { locate } from '../../deep'
import { fixedDeflectionAjax, fixedStressAjax, pinnedDeflectionAjax, pinnedStressAjax, plateDeflectionAjax, plateStressAjax } from '../ajax'
import { projectReady } from '../ajax/ProjectReady'
import { ProjectViewModel, RibViewModel } from '../model'
import { wallLoadPaths } from '../path/wallPaths'
import { getDimensionName } from './getDimensionName'
import { pipeLoadBinding } from './pipeLoadBinding'
import { assistanceBinding } from './assistanceBinding'

export function wallLoadBindings(project = new ProjectViewModel(), rib = new RibViewModel()) {
    let ribReady = projectReady.ribs.get(rib)

    for (let path of wallLoadPaths) {
        let dimension = rib[getDimensionName(path[1])]

        let wallPath = [path[0], path[1]]
        let wall = locate(rib, wallPath)
        let wallReady = locate(ribReady, wallPath)

        let wallLoad = wall[path[2]]
        let wallLoadReady = locate(ribReady, path)

        let currentKind = rib.kind |> map(kind => kind === path[0])
        let isFixed = rib.type |> map(t => t === 'fixed')
        let isPinned = rib.type |> map(t => t === 'pinned')

        let data = { project, rib, dimension, wall, wallLoad }

        plateStressAjax({
            ...data,
            allow: currentKind,
            ready: wallLoadReady.plateStress
        })

        plateDeflectionAjax({
            ...data,
            allow: combineLatest(currentKind, ribReady.ribMaterial.steelProperty)
                |> map(arr => arr.every(v => v)),
            ready: wallLoadReady.plateDeflection
        })


        assistanceBinding({ ...data })

        fixedStressAjax({
            ...data,
            allow: combineLatest(currentKind, isFixed, ribReady.windElevCoeff, ribReady.insulationWeight, wallReady.combSection)
                |> map(arr => arr.every(v => v)),
            ready: wallLoadReady.fixedStress
        })

        fixedDeflectionAjax({
            ...data,
            allow:
                combineLatest(currentKind, isFixed,
                    ribReady.ribMaterial.steelProperty,
                    ribReady.windElevCoeff,
                    ribReady.insulationWeight, wallReady.combSection
                )
                |> map(arr => arr.every(v => v)),
            ready: wallLoadReady.fixedDeflection
        })

        pinnedStressAjax({
            ...data,
            allow:
                combineLatest(currentKind, isPinned, ribReady.windElevCoeff, ribReady.insulationWeight, wallReady.combSection)
                |> map(arr => arr.every(v => v)),

            ready: wallLoadReady.pinnedStress
        })

        pinnedDeflectionAjax({
            rib,
            dimension,
            wall,
            wallLoad,
            allow:
                combineLatest(currentKind, isPinned, ribReady.windElevCoeff, ribReady.insulationWeight, wallReady.combSection)
                |> map(arr => arr.every(v => v)),
            ready: wallLoadReady.pinnedDeflection
        })

        //subscribePlateStressAjax(rib, path)
        //subscribePlateDeflectionAjax(rib, path)
        //subscribeAssistanceByPath(rib, path)
        //subscribeFixedStressAjax(rib, path)
        //subscribeFixedDeflectionAjax(rib, path)
        //subscribePinnedStressAjax(rib, path)
        //subscribePinnedDeflectionAjax(rib, path)

        pipeLoadBinding({ ...data })
    }
}

//function subscribePlateStressAjax(rib, path) {
//    let ready = projectReady.ribs.get(rib)
//    let wall = locate(rib, [path[0], path[1]])
//    let wallLoad = wall[path[2]]
//    let allow =
//        rib.kind
//        |> map(kind => kind === path[0])
//    plateStressAjax(rib, wall, wallLoad, allow, locate(ready, path).plateStress)
//}

//function subscribePlateDeflectionAjax(rib, path) {
//    let ready = projectReady.ribs.get(rib)
//    let wall = locate(rib, [path[0], path[1]])
//    let wallLoad = wall[path[2]]

//    let currentKind =
//        rib.kind
//        |> map(kind => kind === path[0])

//    let allow =
//        combineLatest(currentKind, ready.ribMaterial.steelProperty)
//        |> map(arr => arr.every(v => v))

//    plateDeflectionAjax(rib, wall, wallLoad, allow, locate(ready, path).plateDeflection)

//}

//function subscribeAssistanceByPath(rib, path) {
//    let wall = locate(rib, [path[0], path[1]])
//    let wallLoad = wall[path[2]]
//    wallLoad.subscribeAssistance(rib, wall)
//}


//function subscribeFixedStressAjax(rib, path) {
//    let ready = projectReady.ribs.get(rib)
//    let dimension = rib[getDimensionName(path[1])]
//    let wall = locate(rib, [path[0], path[1]])
//    let wallLoad = wall[path[2]]

//    let currentKind =
//        rib.kind
//        |> map(kind => kind === path[0])

//    let currentType =
//        rib.type
//        |> map(tp => tp === 'fixed')

//    let allow =
//        combineLatest(currentKind, currentType, ready.windElevCoeff, ready.insulationWeight)
//        |> map(arr => arr.every(v => v))

//    fixedStressAjax({
//        rib,
//        dimension,
//        wall,
//        wallLoad,
//    }, allow, locate(ready, path).fixedStress)

//}

//function subscribeFixedDeflectionAjax(rib, path) {
//    let ready = projectReady.ribs.get(rib)
//    let dimension = rib[getDimensionName(path[1])]
//    let wall = locate(rib, [path[0], path[1]])
//    let wallLoad = wall[path[2]]

//    let currentKind =
//        rib.kind
//        |> map(kind => kind === path[0])

//    let currentType =
//        rib.type
//        |> map(tp => tp === 'fixed')

//    let allow =
//        combineLatest(currentKind, currentType, ready.ribMaterial.steelProperty, ready.windElevCoeff, ready.insulationWeight)
//        |> map(arr => arr.every(v => v))

//    fixedDeflectionAjax({
//        rib,
//        dimension,
//        wall,
//        wallLoad,
//    }, allow, locate(ready, path).fixedDeflection)

//}

//function subscribePinnedStressAjax(rib, path) {
//    let ready = projectReady.ribs.get(rib)
//    let dimension = rib[getDimensionName(path[1])]
//    let wall = locate(rib, [path[0], path[1]])
//    let wallLoad = wall[path[2]]

//    let currentKind =
//        rib.kind
//        |> map(kind => kind === path[0])

//    let currentType =
//        rib.type
//        |> map(tp => tp === 'pinned')

//    let allow =
//        combineLatest(currentKind, currentType, ready.windElevCoeff, ready.insulationWeight)
//        |> map(arr => arr.every(v => v))

//    pinnedStressAjax({
//        rib,
//        dimension,
//        wall,
//        wallLoad,
//    }, allow, locate(ready, path).pinnedStress)

//}

//function subscribePinnedDeflectionAjax(rib, path) {
//    let ready = projectReady.ribs.get(rib)
//    let dimension = rib[getDimensionName(path[1])]
//    let wall = locate(rib, [path[0], path[1]])
//    let wallLoad = wall[path[2]]

//    let currentKind =
//        rib.kind
//        |> map(kind => kind === path[0])

//    let currentType =
//        rib.type
//        |> map(tp => tp === 'pinned')

//    let allow =
//        combineLatest(currentKind, currentType, ready.ribMaterial.steelProperty, ready.windElevCoeff, ready.insulationWeight)
//        |> map(arr => arr.every(v => v))

//    pinnedDeflectionAjax({
//        rib,
//        dimension,
//        wall,
//        wallLoad,
//    }, allow, locate(ready, path).pinnedDeflection)

//}


