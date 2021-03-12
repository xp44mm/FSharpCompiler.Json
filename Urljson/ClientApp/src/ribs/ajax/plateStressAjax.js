import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

export function plateStressAjax({
    rib,
    //dimension,
    wall, wallLoad,
    allow, ready
}) {


    let { span } = rib

    let { thick } = wall

    let { plateLoads, plateStress } = wallLoad

    //let { designLength } = dimension
    allow = everyTrue(allow)

    allow.pipe(
        filter(f => !f)
    ).subscribe(() => {
        ready.next(false)
    })

    combineLatest(allow, thick, span, plateLoads,)
        |> filter(([allow]) => allow)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(([t, span, plateLoads]) =>
            'plate/stress?' + jzonQueryData({ t, span, plateLoads })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(plateStress)
        |> (o => o.subscribe(() => { ready.next(true) }))
}
