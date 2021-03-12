import { combineLatest } from 'rxjs'
import { map, mergeMap, debounceTime, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'

export function steelPropertyAjax(rib, steel, ready) {
    let { temperature } = rib
    let { name, xigma, ela } = steel

    combineLatest(name, temperature)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([name, t]) => ({ name, t }))
        |> map(data => 'steel/property?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(([x, e]) => {
            xigma.next(x)
            ela.next(e)
        })
        |> (o => o.subscribe(() => { ready.next(true) }))

}
