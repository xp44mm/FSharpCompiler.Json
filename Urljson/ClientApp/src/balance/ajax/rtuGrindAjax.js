import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function rtuGrindAjax(balance = new BalanceViewModel()) {
    let {
        limestone,
        //absorber,
        //tower,
        performance: { rtu },
    } = balance

    let allow = ready.tower

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.rtuGrind.next(false)))

    let input = {
        passing: limestone.grind,
    }
    let inputDeep = Deep.fromObject(input)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.rtuGrind.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'rtu/rtuGrind?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => { rtu.grind.next(data) })
        |> (o => o.subscribe(() => { ready.rtuGrind.next(true) }))
}
