import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { ready } from './ready'

// rename from `bindingGas`
export function gasVolumeAjax(hasGGH, key, gas) {
    let shows =
        hasGGH
        |> map(ggh => ggh || !/^(ggh|sootblow)/.test(key))

    let allow =
        combineLatest(ready.absorberWithUnderspray, shows)
        |> map(([dp, sh]) => dp && sh)

    let pkey = 'gas_' + key

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready[pkey].next(false)))

    let input = {
        H2O: gas.H2O,
        O2: gas.O2,
        N2: gas.N2,
        CO2: gas.CO2,
        SO2: gas.SO2,
        SO3: gas.SO3,
        HCl: gas.HCl,
        HF: gas.HF,
        temperature: gas.temperature,
        pressure: gas.pressure,
    }

    let result = {
        nvolume: gas.nvolume,
        volume: gas.volume,
        dnvolume: gas.dnvolume,
        dvolume: gas.dvolume,
    }

    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready[pkey].next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/gasVolume?' + jzonQueryData(data))
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
        |> (o => o.subscribe(() => { ready[pkey].next(true) }))

}
