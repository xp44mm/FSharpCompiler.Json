import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { pickObject } from '../../pickObject'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function sootblowAjax(balance = new BalanceViewModel()) {
    let {
        atmosphere: { wetAir },
        hasGGH,
        ggh: { sootblow },
    } = balance

    let allow =
        combineLatest(hasGGH, ready.wetAir)
        |> map(([g, w]) => g && w)

    allow
        |> filter(s => !s)
        |> (o => o.subscribe(() => ready.sootblow.next(false)))

    let input = {
        H2O: wetAir.H2O,
        O2: wetAir.O2,
        N2: wetAir.N2,

        total: sootblow.total,
    }

    let result = pickObject(sootblow, ['H2O', 'O2', 'N2'])
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)
    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.sootblow.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/sootblow?' + jzonQueryData(data))
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
        |> (o => o.subscribe(() => { ready.sootblow.next(true) }))
}
