import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

//
export function pinnedDeflectionAjax({
    rib, dimension, wall, wallLoad,
    allow, ready
}) {

    let { span, ribMaterial: { ela } } = rib
    let { designLength } = dimension
    let { zmin, beta, thick, ix } = wall
    let { pressure, normalLoads, ribStress, allLoads, ribDeflection } = wallLoad

    allow = everyTrue(allow)

    allow.pipe(
        filter(f => !f)
    ).subscribe(() => { ready.next(false) })

    combineLatest(allow, span, designLength, ela, ix, allLoads,)
        |> filter(([a]) => a)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(([span, len, ela, ix, sumLoad]) =>
            'pinned/deflection?' + jzonQueryData({ span, len, ela, ix, sumLoad })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(ribDeflection)
        |> (o => o.subscribe(() => { ready.next(true) }))

}
