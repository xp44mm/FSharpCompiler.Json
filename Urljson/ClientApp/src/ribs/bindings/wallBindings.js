import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { locate } from '../../deep'
import { combSectionAjax, fixedBetaAjax, fixedFreqAjax, pinnedFreqAjax, plateFreqAjax, ribStableAjax } from '../ajax'
import { projectReady } from '../ajax/ProjectReady'
import { RibViewModel } from '../model'
import { wallPaths } from '../path/wallPaths'
import { getDimensionName } from './getDimensionName'
import { rigidBinding } from './rigidBinding'

export function wallBindings(rib = new RibViewModel()) {
    let ribReady = projectReady.ribs.get(rib)
    let ribMaterialReady = ribReady.ribMaterial.steelProperty

    for (let path of wallPaths) {


        let wallReady = locate(ribReady, path)
        let dimension = rib[getDimensionName(path[1])]
        let wall = locate(rib, path)

        let currentKind = rib.kind |> map(kind => kind === path[0])
        let isFixed = rib.type |> map(t => t === 'fixed')
        let isPinned = rib.type |> map(t => t === 'pinned')

        combSectionAjax({
            wall, allow: currentKind, ready: wallReady.combSection
        })

        plateFreqAjax({
            rib,
            wall,
            allow:
                combineLatest(currentKind, ribMaterialReady)
                |> map(arr => arr.every(p => p)),
            ready: wallReady.plateFreq,
        })

        ribStableAjax({
            rib,
            dimension,
            wall,
            allow:
                combineLatest(currentKind, ribMaterialReady)
                |> map(arr => arr.every(p => p)),
            ready: wallReady.ribStable

        })

        rigidBinding({
            dimension, wall,
            allow:
                combineLatest(currentKind, ribMaterialReady, wallReady.combSection)
                |> map(arr => arr.every(e => e)),

        })

        fixedBetaAjax({
            wall,
            neigborRigid: getNeighborRigid(rib, path),
            allow: [currentKind, isFixed, ...wallPaths.filter(p => p[0] === path[0]).map(p => locate(ribReady, p).combSection)],
            ready: wallReady.fixedBeta
        })

        fixedFreqAjax({
            rib, dimension, wall,
            allow:
                combineLatest(
                    currentKind,
                    isFixed,
                    ribMaterialReady,
                    wallReady.combSection
                )
                |> map(arr => arr.every(p => p)),
            ready: wallReady.fixedFreq
        })

        pinnedFreqAjax({
            rib,
            dimension,
            wall,
            allow:
                combineLatest(
                    currentKind,
                    isPinned,
                    ribMaterialReady,
                    wallReady.combSection
                )
                |> map(arr => arr.every(p => p)),
            ready: wallReady.pinnedFreq
        })
    }
}


function getNeigbors(wallKey) {
    if (wallKey === 'top' || wallKey === 'bottom') { return 'side' }
    if (wallKey === 'side') { return ['bottom', 'top'] }
    if (wallKey === 'sidea') { return 'sideb' }
    if (wallKey === 'sideb') { return 'sidea' }
}

function getNeighborRigid(rib, path) {
    let kind = rib[path[0]]
    let neighbors = getNeigbors(path[1])

    if (Array.isArray(neighbors)) {
        let rigids = neighbors
            .map(key => kind[key].rigid)
        return combineLatest(...rigids)
            |> map(([b, t]) => Math.min(b, t))
    } else {
        return kind[neighbors].rigid
    }

}

//function subscribeCombSectionAjax(rib, path) {
//    let ready = locate(projectReady.ribs.get(rib), path).combSection
//    let wall = locate(rib, path)
//    let allow = rib.kind |> map(kind => kind === path[0])
//    combSectionAjax(wall, allow, ready)
//}

//function subscribePlateFreqAjax(rib, path) {
//    let ribReady = projectReady.ribs.get(rib)
//    let ready = locate(ribReady, path)
//    let wall = locate(rib, path)
//    let allow =
//        combineLatest(rib.kind |> map(kind => kind === path[0]), ribReady.ribMaterial.steelProperty)
//        |> map(([c, b]) => c && b)

//    plateFreqAjax(rib, wall, allow, ready.plateFreq)
//}

//function subscribeRibStableAjax(rib, path) {
//    let ribReady = projectReady.ribs.get(rib)
//    let ready = locate(ribReady, path).ribStable
//    let wall = locate(rib, path)
//    let dimension = rib[getDimensionName(path[1])]

//    let allow =
//        combineLatest(rib.kind |> map(kind => kind === path[0]), ribReady.ribMaterial.steelProperty)
//        |> map(([c, b]) => c && b)

//    ribStableAjax(rib, dimension, wall, allow, ready)
//}

//function subscribeFixedBetaAjax(rib, path) {
//    let ready = projectReady.ribs.get(rib)
//    let wall = locate(rib, path)
//    let neigborRigid = getNeighborRigid(rib, path)
//    let allow =
//        combineLatest(rib.kind, rib.type)
//        |> map(([k, t]) => k === path[0] && t === 'fixed')
//    fixedBetaAjax({ wall, neigborRigid }, allow, locate(ready, path).fixedBeta)
//}

//function subscribeFixedFreqAjax(rib, path) {
//    let ready = projectReady.ribs.get(rib)
//    let dimension = rib[getDimensionName(path[1])]
//    let wall = locate(rib, path)
//    let allow =
//        combineLatest(
//            rib.kind |> map(kind => kind === path[0]),
//            rib.type |> map(t => t === 'fixed'),
//            ready.ribMaterial.steelProperty
//        )
//        |> map(arr => arr.every(p => p))
//    fixedFreqAjax(rib, dimension, wall, allow, locate(ready, path).fixedFreq)
//}

//function subscribePinnedFreqAjax(rib, path) {
//    let ready = projectReady.ribs.get(rib)
//    let dimension = rib[getDimensionName(path[1])]
//    let wall = locate(rib, path)

//    let allow =
//        combineLatest(
//            rib.kind |> map(kind => kind === path[0]),
//            rib.type |> map(t => t === 'pinned'),
//            ready.ribMaterial.steelProperty
//        )
//        |> map(arr => arr.every(p => p))
//    pinnedFreqAjax(rib, dimension, wall, allow, locate(ready, path).pinnedFreq)
//}
