import { combineLatest } from 'rxjs'
import { debounceTime, map, mergeMap, filter, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

//beta
export function fixedBetaAjax({ wall, neigborRigid, allow, ready }) {
    let allows = everyTrue(allow)

    allows.pipe(
        filter(f => !f)
    ).subscribe(() => { ready.next(false) })

    combineLatest(allows, wall.rigid, neigborRigid,)
        |> filter(([allow]) => allow)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)

        |> map(
            ([rigid, neigborRigid]) =>
                'fixed/beta?' + jzonQueryData({ rigid, neigborRigid })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(wall.beta)
        |> (o => o.subscribe(() => { ready.next(true) }))

}
