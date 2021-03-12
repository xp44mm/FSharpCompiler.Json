import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function oxiairAjax(balance = new BalanceViewModel()) {
    let { atmosphere, oxiair } = balance

    let allow = ready.wetAir

    allow
        |> filter(s => !s)
        |> (o => o.subscribe(() => ready.oxiair.next(false)))

    let input = {
        air: {
            H2O: atmosphere.wetAir.H2O,
            O2: atmosphere.wetAir.O2,
            N2: atmosphere.wetAir.N2,
            temperature: atmosphere.temperature,
            pressure: atmosphere.pressure,
        },
        O2: oxiair.feed.O2,
        cp: oxiair.compress.pressure,
    }

    let result = {
        H2O: oxiair.feed.H2O,
        N2: oxiair.feed.N2,
        compressTemp: oxiair.compress.temperature,
        saturWater: oxiair.satur.H2O,
        saturTemp: oxiair.satur.temperature,
        nvolume: oxiair.satur.nvolume,
    }
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.oxiair.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/oxiair?' + jzonQueryData(data))
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
        |> (o => o.subscribe(() => { ready.oxiair.next(true) }))

}
