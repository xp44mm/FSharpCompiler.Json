import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function rtuMarginAjax(balance = new BalanceViewModel()) {
    let {
        effect,
        absorber,
        //tower,
        performance: { margin, rtu, risk },
    } = balance

    let allow = ready.tower

    allow |> filter(s => !s) |> (o => o.subscribe(() => ready.rtuMargin.next(false)))

    let input = {
        isInterspacial: absorber.headerType |> map(t => t == 'Interspacial'),
        effect: effect.SO2,
        margin,
    }
    let inputDeep = Deep.fromObject(input)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => { ready.rtuMargin.next(false) })
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'rtu/rtuMargin?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => {
            rtu.margin.next(data.marginRtu)
            risk.next(data.performanceRisk)
        })
        |> (o => o.subscribe(() => { ready.rtuMargin.next(true) }))
}
