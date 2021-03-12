import { combineLatest } from 'rxjs'
import { map, mergeMap, debounceTime, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'

//受压稳定系数，无量纲
export function bucklingAjax(pipe, ready) {
    let { lambda, stable } = pipe

    lambda
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(ratio => 'load/buckling?' + jzonQueryData({ ratio }))
        |> mergeMap(url => httpGetJson(url))
        |> tap(stable)
        |> (o => o.subscribe(() => { ready.next(true) }))

}
