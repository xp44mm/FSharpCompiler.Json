import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

//
export function fixedDeflectionAjax({
    rib, dimension, wall, wallLoad,
    allow, ready
}) {
    allow = everyTrue(allow)

    let {
        span,
        ribMaterial: { ela },
    } = rib
    let { designLength } = dimension

    let { ix, zmin, beta, thick } = wall

    let { pressure, normalLoads, ribStress, allLoads, ribDeflection } = wallLoad

    allow.pipe(
        filter(f => !f)
    ).subscribe(() => { ready.next(false) })

    combineLatest(allow, span, designLength, ela, ix, allLoads,)
        |> filter(([allow]) => allow)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(([span, len, ela, ix, sumLoad]) =>
            'fixed/deflection?' + jzonQueryData({ span, len, ela, ix, sumLoad })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(ribDeflection)
        |> (o => o.subscribe(() => { ready.next(true) }))
}
