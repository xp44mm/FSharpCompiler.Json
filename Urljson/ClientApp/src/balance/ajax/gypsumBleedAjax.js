import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

// from bindingAbsorberWithUnderspray
export function gypsumBleedAjax(balance = new BalanceViewModel()) {
    let {
        dewatering: { chlorideBleed },
        gypsumBleed,
    } = balance

    //与`toprepAjax`相同
    let allow =
        chlorideBleed
        |> mergeMap(b => {
            switch (b) {
                case 'PH OF':
                    return ready.phofChlorideBleed
                case 'SH OF':
                    return ready.ionBalance
                default:
                    //'Filtrate':检查循环表
                    return false
            }
        })

    allow
        |> filter(s => !s)
        |> (o => o.subscribe(() => ready.gypsumBleed.next(false)))

    let input = {
        'CaSO4*2H2O': gypsumBleed['CaSO4*2H2O'],
        'CaSO3*(1/2)H2O': gypsumBleed['CaSO3*(1/2)H2O'],
        'CaCO3': gypsumBleed['CaCO3'],
        'MgSO4': gypsumBleed['MgSO4'],
        'MgCO3': gypsumBleed['MgCO3'],
        'inerts': gypsumBleed['inerts'],
        'ash': gypsumBleed['ash'],
        'CaF2': gypsumBleed['CaF2'],
        'MgF2': gypsumBleed['MgF2'],
        'Cl-': gypsumBleed['Cl-'],
        'F-': gypsumBleed['F-'],
        'Mg++': gypsumBleed['Mg++'],
        'Ca++': gypsumBleed['Ca++'],
        'SO4--': gypsumBleed['SO4--'],
        'H2O': gypsumBleed['H2O'],
    }

    let result =
    {
        'tss': gypsumBleed['tss'],
        'tds': gypsumBleed['tds'],
        'fw': gypsumBleed['fw'],
        'tf': gypsumBleed['tf'],
        'solids': gypsumBleed['solids'],
        'concCl': gypsumBleed['concCl'],
        'sgSolution': gypsumBleed['sgSolution'],
        'sgSolid': gypsumBleed['sgSolid'],
        'sg': gypsumBleed['sg'],
        'density': gypsumBleed['density'],
        'volume': gypsumBleed['volume'],
    }

    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.gypsumBleed.next(false) })
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
            }
        })
        |> map(deep => deep.values)
        |> tap(zipValues => {
            zipValues.forEach(([value, subject]) => {
                subject.next(value)
            })
        })
        |> (o => o.subscribe(() => { ready.gypsumBleed.next(true) }))

}
