import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function rtuNozzleAjax(balance = new BalanceViewModel()) {
    let {
        absorber,
        nozzle,
        //tower,
        performance: { rtu },
    } = balance

    let allow = ready.tower

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.rtuNozzle.next(false)))

    let input = {
        f: absorber.nozzleFlow,
        p: nozzle.pressureDrop,
        a: nozzle.angle,
    }

    let inputDeep = Deep.fromObject(input)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.rtuNozzle.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'rtu/rtuNozzle?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => { rtu.nozzle.next(data) })
        |> (o => o.subscribe(() => { ready.rtuNozzle.next(true) }))

}
