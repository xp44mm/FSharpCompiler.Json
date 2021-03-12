import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function rtuClAjax(balance = new BalanceViewModel()) {
    let {
        absorber,
        tower,
        performance: { rtu },
    } = balance

    let allow = ready.tower

    allow |> filter(s => !s) |> (o=>o.subscribe(() => ready.rtuCl.next(false)))

    let input = {
        ppmSO2: absorber.inlet.ppmSO2,
        flux: absorber.flux,
        concCl: tower.concCl,
    }
    let inputDeep = Deep.fromObject(input)

    //allow
    //    |> filter(t => t)
    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)

        |> tap(() => { ready.rtuCl.next(false) })
        |> debounceTime(9)
        //|> withLatestFrom(deepCombineLatest(inputDeep))
        |> map(([deep]) => deep.toObject())
        |> map(data => 'rtu/rtuCl?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => {
            rtu.Cl.next(data)
        })
        |> (o=>o.subscribe(() => { ready.rtuCl.next(true) }))
}
