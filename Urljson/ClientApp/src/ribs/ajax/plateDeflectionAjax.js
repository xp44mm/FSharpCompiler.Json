import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { everyTrue } from './everyTrue'

export function plateDeflectionAjax({
    rib,
    //dimension,
    wall, wallLoad,
    allow, ready

}) {

    let { span, ribMaterial: { ela } } = rib

    let { thick } = wall

    let { plateLoads, plateDeflection } = wallLoad

    //let { thick, ela, span, plateLoads, plateDeflection } = model
    allow = everyTrue(allow)

    allow.pipe(
        filter(f => !f)
    ).subscribe(() => { ready.next(false) })

    combineLatest(allow, thick, ela, span, plateLoads,)
        |> filter(([allow]) => allow)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([_, ...rest]) => rest)
        |> map(([t, ela, span, plateLoads]) =>
            'plate/deflection?' + jzonQueryData({ t, ela, span, plateLoads })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(plateDeflection)
        |> (o => o.subscribe(() => { ready.next(true) }))

}
