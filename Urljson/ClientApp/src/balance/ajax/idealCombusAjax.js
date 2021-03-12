import { debounceTime, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { pickObject } from '../../pickObject'
import { CombustionViewModel } from '../model/CombustionViewModel'
import { ready } from './ready'


export function idealCombusAjax(combustion = new CombustionViewModel()) {
    let { coal, product } = combustion

    let input = pickObject(coal, ['C', 'H', 'O', 'N', 'S', 'H2O'])
    let result = pickObject(product, ['H2O', 'O2', 'N2', 'CO2', 'SO2'])

    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    deepCombineLatest(inputDeep)
        |> tap(() => { ready.idealCombus.next(false) })
        |> debounceTime(9)
        |> map(deep => deep.toObject())
        |> map(data => 'desulphur/idealCombus?' + jzonQueryData(data))
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
        |> (o => o.subscribe(() => { ready.idealCombus.next(true) }))

}
