import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function rtuPHAjax(balance = new BalanceViewModel()) {
    let {
        //absorber,
        tower,
        performance: { rtu },
    } = balance

    let allow = ready.tower

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.rtuPH.next(false)))

    let input = {
        ph: tower.pH,
    }

    let inputDeep = Deep.fromObject(input)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.rtuPH.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'rtu/rtuPH?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => { rtu.pH.next(data) })
        |> (o => o.subscribe(() => { ready.rtuPH.next(true) }))
}
