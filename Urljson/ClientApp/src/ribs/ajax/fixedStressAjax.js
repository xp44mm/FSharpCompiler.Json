import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

//
export function fixedStressAjax({
    rib, dimension, wall, wallLoad,
    allow, ready
}) {
    let { span } = rib
    let { designLength } = dimension

    let { zmin, beta, thick } = wall

    let { pressure, normalLoads, ribStress } = wallLoad

    allow = everyTrue(allow)

    allow.pipe(
        filter(f => !f)
    ).subscribe(() => { ready.next(false) })

    combineLatest(
        allow,
        span,
        designLength,
        zmin,
        beta,
        pressure,
        normalLoads,
    )
        |> filter(([allow]) => allow)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(([span, len, zmin, beta, q0, qdl]) =>
            'fixed/stress?' + jzonQueryData({ span, len, zmin, normalLoad: beta * q0 + qdl })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(ribStress)
        |> (o => o.subscribe(() => { ready.next(true) }))
}
