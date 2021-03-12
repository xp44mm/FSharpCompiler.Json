import { combineLatest } from 'rxjs'
import { map, mergeMap, debounceTime, filter, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

///
export function pinnedFreqAjax({ rib, dimension, wall, allow, ready }) {
    let {
        ribMaterial: { xigma, ela },
    } = rib

    let { designLength } = dimension

    allow = everyTrue(allow)

    allow.pipe(
        filter(f => !f)
    ).subscribe(() => { ready.next(false) })

    //let {
    //    designLength, ela, wall
    //} = model

    combineLatest(allow, designLength, ela, wall.ix, wall.weight,)
        |> filter(([allow]) => allow)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(([len, ela, ix, wt]) =>
            'pinned/freq?' + jzonQueryData({ len, ela, ix, wt })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(wall.ribFrequency)
        |> (o => o.subscribe(() => { ready.next(true) }))

}
