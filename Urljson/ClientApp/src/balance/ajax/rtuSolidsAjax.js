import { debounceTime, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'
import { combineLatest } from 'rxjs'

export function rtuSolidsAjax(balance = new BalanceViewModel()) {
    let {
        //absorber,
        tower,
        performance: { rtu },
    } = balance

    let allow = ready.tower

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.rtuSolids.next(false)))

    let input = {
        solids: tower.solids,
    }

    let inputDeep = Deep.fromObject(input)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.rtuSolids.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'rtu/rtuSolids?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => { rtu.solids.next(data) })
        |> (o => o.subscribe(() => { ready.rtuSolids.next(true) }))
}
