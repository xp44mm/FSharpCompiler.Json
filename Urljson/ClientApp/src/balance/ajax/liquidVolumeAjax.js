import { combineLatest, NEVER } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { LiquidViewModel } from '../model/LiquidViewModel'
import { ready } from './ready'

// from bindingLiquidVolume
export function liquidVolumeAjax(
    chlorideBleed,
    key,
    liquid = new LiquidViewModel()
) {
    let shows =
        chlorideBleed
        |> map(i => i == 'PH OF')
        |> map(phof => (phof ? !/^sh[fou]f$/.test(key) : key != 'bleed'))

    let allow =
        combineLatest(ready.makeup, ready.tower, ready.toprep, shows)
        |> map(arr => arr.every(v => v))

    let pkey = 'liquid_' + key

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready[pkey].next(false)))

    let input =
        Object.fromEntries([
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
        ].map(k => [k, liquid[k]]))

    let result =
        Object.fromEntries([
            'tss',
            'tds',
            'fw',
            'tf',
            'solids',
            'concCl',
            'sgSolution',
            'sgSolid',
            'sg',
            'density',
            'volume',
        ].map(k => [k, liquid[k]]))

    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready[pkey].next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/liquidVolume?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> map(data => Deep.fromObject(data))
        |> map(deep => deep.intersect(resultDeep.keys))
        |> map(deep => {
            if (deep.structureEqual(resultDeep.keys)) {
                return deep.zip(resultDeep.values)
            } else {
                console.error(deep.keys)
                return NEVER
            }
        })
        |> map(deep => deep.values)
        |> tap(zipValues => {
            zipValues.forEach(([value, subject]) => {
                subject.next(value)
            })
        })
        |> (o => o.subscribe(() => { ready[pkey].next(true) }))

}
