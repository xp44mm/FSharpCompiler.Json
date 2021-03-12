import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function gghOutletAjax(balance = new BalanceViewModel()) {
    let { terminal, effect, oxiair, hasGGH, ggh, removal, absorber } = balance

    let allow =
        combineLatest(hasGGH, ready.oxiair, ready.sootblow, ready.react)
        |> map(([g, o, s, r]) => g && o && s && r)

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.gghOutlet.next(false)))

    const input = {
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
            temperature: terminal.temperature,
            pressure: ggh.outlet.pressure,
        },
        oxiair: {
            H2O: oxiair.satur.H2O,
            O2: oxiair.satur.O2,
            N2: oxiair.satur.N2,
            temperature: oxiair.satur.temperature,
            pressure: oxiair.satur.pressure,
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

        effect: {
            SO2: effect.SO2,
            SO3: effect.SO3,
            HCl: effect.HCl,
            HF: effect.HF,
            ash: effect.ash,
        },

        ggh: {
            dirtyPressureDrop: ggh.dirty.pressureDrop,
            cleanPressureDrop: ggh.clean.pressureDrop,
            dirtyLeakage: ggh.dirty.leakage,
            cleanLeakage: ggh.clean.leakage,
            temperature: ggh.outlet.temperature,
        },

        sootblow: {
            H2O: ggh.sootblow.H2O,
            O2: ggh.sootblow.O2,
            N2: ggh.sootblow.N2,
            temperature: ggh.sootblow.temperature,
            pressure: ggh.sootblow.pressure,
        },
    }

    let result = {
        absInlet: {
            H2O: absorber.inlet.H2O,
            O2: absorber.inlet.O2,
            N2: absorber.inlet.N2,
            CO2: absorber.inlet.CO2,
            SO2: absorber.inlet.SO2,
            SO3: absorber.inlet.SO3,
            HCl: absorber.inlet.HCl,
            HF: absorber.inlet.HF,
            ash: absorber.inlet.ash,
            temperature: absorber.inlet.temperature,
        },
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
        gghOutlet: {
            H2O: ggh.outlet.H2O,
            O2: ggh.outlet.O2,
            N2: ggh.outlet.N2,
            CO2: ggh.outlet.CO2,
            SO2: ggh.outlet.SO2,
            SO3: ggh.outlet.SO3,
            HCl: ggh.outlet.HCl,
            HF: ggh.outlet.HF,
            ash: ggh.outlet.ash,
        },
        gghEnth: ggh.enth,
    }
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.gghOutlet.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/gghOutlet?' + jzonQueryData(data))
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
        |> (o => o.subscribe(() => { ready.gghOutlet.next(true) }))

}
