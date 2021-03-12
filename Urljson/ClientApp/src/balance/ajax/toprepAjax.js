import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { pickObject } from '../../pickObject'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

let liquidIngr = [
    'CaSO4*2H2O',
    'CaSO3*(1/2)H2O',
    'CaCO3',
    'MgSO4',
    'MgCO3',
    'inerts',
    'ash',
    'CaF2',
    'MgF2',
    'Cl-',
    'F-',
    'Mg++',
    'Ca++',
    'SO4--',
    'H2O',
]

///回流水至制浆系统
// rename from bindingToprep
export function toprepAjax(balance = new BalanceViewModel()) {
    /*balance*/
    let {
        limestone,
        dewatering: { chlorideBleed },
        reclaimWater,
        toprep,
    } = balance

    //与`gypsumBleedAjax`相同
    let allow =
        combineLatest(chlorideBleed, ready.phofChlorideBleed, ready.ionBalance)
        |> map(([b, p, i]) => {
            switch (b) {
                case 'PH OF':
                    return p
                case 'SH OF':
                    return i
                default:
                    //'Filtrate':检查循环表
                    return false
            }
        })

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.toprep.next(false)))

    let input = {
        limestone: pickObject(limestone.feed, [
            'CaCO3',
            'MgCO3',
            'inerts',
            'H2O',
        ]),
        reclaim: pickObject(reclaimWater, liquidIngr),
        solids: limestone.slurrySolids,
    }

    let result = [
        pickObject(toprep, liquidIngr),
        pickObject(limestone.slurry, liquidIngr),
    ]
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.toprep.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/toprep?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> map(data => Deep.fromObject(data))
        |> map(deep => deep.intersect(resultDeep.keys))
        |> map(deep => {
            if (deep.structureEqual(resultDeep.keys)) {
                return deep.zip(resultDeep.values)
            } else {
                console.error(deep.keys)
            }
        })
        |> map(deep => deep.values)
        |> tap(zipValues => {
            zipValues.forEach(([value, subject]) => {
                subject.next(value)
            })
        })
        |> (o => o.subscribe(() => { ready.toprep.next(true) }))
}
