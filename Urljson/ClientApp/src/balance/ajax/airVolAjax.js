import { debounceTime, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { AtmosphereViewModel } from '../model/AtmosphereViewModel'
import { ready } from './ready'

export const airVolAjax = (atmosphere = new AtmosphereViewModel()) => {
    let input = (() => {
        let { pressure: press, temperature: temp, humidity: humid } = atmosphere
        return { press, temp, humid }
    })()

    let result = {
        'H2O': atmosphere.airVol.H2O,
        'O2': atmosphere.airVol.O2,
        'N2': atmosphere.airVol.N2
    }

    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    deepCombineLatest(inputDeep)
        |> tap(() => { ready.airVol.next(false) })
        |> debounceTime(9)
        |> map(deep => deep.toObject())
        |> map(data => 'desulphur/airVol?' + jzonQueryData(data))
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
        |> (o => o.subscribe(() => { ready.airVol.next(true) }))
}
