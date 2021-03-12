import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

//
export function pinnedStressAjax({
    rib, dimension, wall, wallLoad,
    allow, ready
}) {

    let { span } = rib
    let { designLength } = dimension
    let { zmin, beta, thick } = wall
    let { pressure, normalLoads, ribStress, allLoads } = wallLoad

    allow = everyTrue(allow)

    allow.pipe(
        filter(f => !f)
    ).subscribe(() => { ready.next(false) })


    //let {
    //    span, designLength, zmin, wallLoad
    //} = model

    combineLatest(allow, span, designLength, zmin, allLoads,)
        |> filter(([allow]) => allow)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(([span, len, zmin, sumLoad]) =>
            'pinned/stress?' + jzonQueryData({ span, len, zmin, sumLoad })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(ribStress)
        |> (o => o.subscribe(() => { ready.next(true) }))

}
