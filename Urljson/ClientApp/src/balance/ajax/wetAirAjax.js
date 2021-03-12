import { debounceTime, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { AtmosphereViewModel } from '../model/AtmosphereViewModel'
import { ready } from './ready'

export const wetAirAjax = (atmosphere = new AtmosphereViewModel()) => {
    let input = (() => {
        let { pressure: press, temperature: temp, humidity: humid } = atmosphere
        return { press, temp, humid }
    })()

    let inputDeep = Deep.fromObject(input)

    let result = Object.fromEntries(
        ['H2O', 'O2', 'N2'].map(k => [k, atmosphere.wetAir[k]])
    )

    let resultDeep = Deep.fromObject(result)

    deepCombineLatest(inputDeep)
        |> tap(() => { ready.wetAir.next(false) })
        |> debounceTime(9)
        |> map(deep => deep.toObject())
        |> map(data => 'desulphur/wetAir?' + jzonQueryData(data))
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
        |> (o => o.subscribe(() => { ready.wetAir.next(true) }))
}
