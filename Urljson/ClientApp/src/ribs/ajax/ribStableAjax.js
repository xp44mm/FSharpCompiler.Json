import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

///
export function ribStableAjax({ rib, dimension, wall, allow, ready }) {
    let {
        ribMaterial: { xigma },
    } = rib

    let { designLength } = dimension

    allow = everyTrue(allow)

    allow.pipe(
        filter(f => !f)
    ).subscribe(() => { ready.next(false) })

    combineLatest(allow, wall.ribSpec, designLength, xigma,)
        |> filter(([a]) => a)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(
            ([spec, len, xigma]) =>
                'rib/stable?' + jzonQueryData({ spec, len, xigma })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(wall.stable)
        |> (o => o.subscribe(() => { ready.next(true) }))
}
