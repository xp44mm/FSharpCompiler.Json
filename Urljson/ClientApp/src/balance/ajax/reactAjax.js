import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { pickObject } from '../../pickObject'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function reactAjax(balance = new BalanceViewModel()) {
    let { removal, limestone, productA } = balance

    let allow = ready.removal

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.react.next(false)))

    let input = {
        removal: {
            SO2: removal.SO2,
            SO3: removal.SO3,
            HCl: removal.HCl,
            HF: removal.HF,
            ash: removal.ash,
        },

        limestone: {
            availableMgCO3: limestone.availableMgCO3,
            CaCO3: limestone.CaCO3,
            MgCO3: limestone.MgCO3,

            stoich: limestone.stoich,
            solids: limestone.solids,
            grind: limestone.grind,
        },
    }

    let result = {
        limestone: pickObject(limestone.feed, [
            'CaCO3',
            'MgCO3',
            'inerts',
            'H2O',
        ]),
        removal: pickObject(removal, ['H2O', 'O2', 'CO2']),
        reactHeat: removal.heat,
        productA: pickObject(productA, [
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
        ]),
        tss: productA.tss,
    }
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.react.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/react?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> map(data => Deep.fromObject(data))
        |> map(deep => deep.intersect(resultDeep.keys))
        |> map(deep => {
            if (deep.structureEqual(resultDeep.keys)) {
                return deep.zip(resultDeep.values)
            } else {
                console.error(deep.keys)
                //return NEVER
            }
        })
        |> map(deep => deep.values)

        |> tap(zipValues => {
            zipValues.forEach(([value, subject]) => {
                subject.next(value)
            })
        })
        |> (o => o.subscribe(() => { ready.react.next(true) }))
}
