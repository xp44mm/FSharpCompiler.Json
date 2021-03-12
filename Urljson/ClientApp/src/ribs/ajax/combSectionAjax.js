import { combineLatest } from 'rxjs'
import { map, mergeMap, debounceTime, tap, filter } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

//
export function combSectionAjax({ wall, allow, ready }) {
    let allows = everyTrue(allow)

    allows.pipe(
        filter(s => !s)
    ).subscribe(() => { ready.next(false) })

    combineLatest(allows, wall.ribSpec, wall.thick,)
        |> filter(([a]) => a)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(([spec, t]) =>
            'rib/combSection?' + jzonQueryData({ spec, t })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(data => {
            wall.ribWeight.next(data.ribWeight)
            wall.area.next(data.area)
            wall.weight.next(data.weight)
            wall.center.next(data.center)
            wall.ix.next(data.ix)
            wall.zmin.next(data.zmin)
        })
        |> (o => o.subscribe(() => { ready.next(true) }))
}
