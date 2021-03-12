import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function rtuSO2Ajax(balance = new BalanceViewModel()) {
    let {
        absorber,
        //tower,
        performance: { rtu },
    } = balance

    let allow = ready.tower

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.rtuSO2.next(false)))

    let input = {
        ppmSO2: absorber.inlet.ppmSO2,
    }

    let inputDeep = Deep.fromObject(input)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.rtuSO2.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'rtu/rtuSO2?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => { rtu.SO2.next(data) })
        |> (o => o.subscribe(() => { ready.rtuSO2.next(true) }))
}
