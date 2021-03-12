import { combineLatest } from 'rxjs'
import { debounceTime, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { pickObject } from '../../pickObject'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

// from bindingRemoval
export function removalAjax(balance = new BalanceViewModel()) {
    let { terminal, effect, hasGGH, ggh, removal } = balance

    let dirtyLeakage =
        combineLatest(hasGGH, ggh.dirty.leakage)
        |> map(([ggh, x]) => ggh ? x : -1)

    let cleanLeakage =
        combineLatest(hasGGH, ggh.clean.leakage)
        |> map(([ggh, x]) => ggh ? x : -1)

    let input = {
        inlet: {
            SO2: terminal.SO2,
            SO3: terminal.SO3,
            HCl: terminal.HCl,
            HF: terminal.HF,
            ash: terminal.ash,
        },

        effect: {
            SO2: effect.SO2,
            SO3: effect.SO3,
            HCl: effect.HCl,
            HF: effect.HF,
            ash: effect.ash,
        },
        dirtyLeakage,
        cleanLeakage,
    }

    let result = pickObject(removal, ['SO2', 'SO3', 'HCl', 'HF', 'ash'])

    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    deepCombineLatest(inputDeep)
        |> tap(() => { ready.removal.next(false) })
        |> debounceTime(9)
        |> map(deep => deep.toObject())
        |> map(data => 'desulphur/removal?' + jzonQueryData(data))
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
        |> (o => o.subscribe(() => { ready.removal.next(true) }))
}
