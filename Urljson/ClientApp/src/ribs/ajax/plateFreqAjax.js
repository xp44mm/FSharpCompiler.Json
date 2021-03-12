import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

///
export function plateFreqAjax({ rib, wall, allow, ready }) {
    let { ribMaterial: { ela }, span } = rib

    allow = everyTrue(allow)

    allow.pipe(
        filter(f => !f)
    ).subscribe(() => { ready.next(false) })

    combineLatest(allow, wall.thick, ela, span,)
        |> filter(([a]) => a)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(([t, ela, span]) =>
            'plate/freq?' + jzonQueryData({ t, ela, span })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(wall.plateFrequency)
        |> (o => o.subscribe(() => { ready.next(true) }))
}
