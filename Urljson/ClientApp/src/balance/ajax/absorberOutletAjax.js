import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

///被吸收塔带下喷淋层替代了
export function absorberOutletAjax(balance = new BalanceViewModel()) {
    let {
        gasParameters,
        terminal,
        oxiair: { satur: saturOxiair },
        hasGGH,
        removal,
        absorber,
    } = balance

    let allow =
        combineLatest(hasGGH, ready.oxiair, ready.react)
        |> map(([g, o, r]) => !g && o && r)

    allow
        |> filter(s => !s)
        |> (o => o.subscribe(() => ready.absorberOutlet.next(false)))

    let input = {
        terminal: {
            H2O: terminal.H2O,
            O2: terminal.O2,
            N2: terminal.N2,
            CO2: terminal.CO2,
            SO2: terminal.SO2,
            SO3: terminal.SO3,
            HCl: terminal.HCl,
            HF: terminal.HF,
            ash: terminal.ash,
            temperature: gasParameters.temperature,
            pressure: absorber.outlet.pressure,
        },

        oxiair: {
            H2O: saturOxiair.H2O,
            O2: saturOxiair.O2,
            N2: saturOxiair.N2,
            temperature: saturOxiair.temperature,
            pressure: saturOxiair.pressure,
        },

        removal: {
            H2O: removal.H2O,
            O2: removal.O2,
            CO2: removal.CO2,
            SO2: removal.SO2,
            SO3: removal.SO3,
            HCl: removal.HCl,
            HF: removal.HF,
            ash: removal.ash,
        },
    }

    let result = {
        ppmSO2: absorber.inlet.ppmSO2,
        absOutlet: {
            H2O: absorber.outlet.H2O,
            O2: absorber.outlet.O2,
            N2: absorber.outlet.N2,
            CO2: absorber.outlet.CO2,
            SO2: absorber.outlet.SO2,
            SO3: absorber.outlet.SO3,
            HCl: absorber.outlet.HCl,
            HF: absorber.outlet.HF,
            ash: absorber.outlet.ash,
            temperature: absorber.outlet.temperature,
        },
        absOutletVolume: absorber.outlet.volume,
    }
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => ready.absorberOutlet.next(false))
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(
            data => 'desulphur/absorberOutlet?' + jzonQueryData(data)
        )
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
        |> (o => o.subscribe(() => { ready.absorberOutlet.next(true) }))

}
