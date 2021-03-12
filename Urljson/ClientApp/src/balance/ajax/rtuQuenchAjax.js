import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function rtuQuenchAjax(balance = new BalanceViewModel()) {
    let {
        hasQuench,
        performance: { rtu },
    } = balance

    let allow = ready.tower

    allow
        |> filter(s => !s)
        |> (o => o.subscribe(() => ready.rtuQuench.next(false)))

    let input = { hasQuench }

    let inputDeep = Deep.fromObject(input)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.rtuQuench.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'rtu/rtuQuench?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => { rtu.quench.next(data) })
        |> (o => o.subscribe(() => { ready.rtuQuench.next(true) }))
}
