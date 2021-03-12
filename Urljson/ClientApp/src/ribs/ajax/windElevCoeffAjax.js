import { combineLatest } from 'rxjs'
import { debounceTime, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'

export function windElevCoeffAjax(project, rib, ready) {
    let { topography, } = project
    let { elevation, windElevCoeff } = rib

    combineLatest(topography, elevation)
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(([topography, elev]) =>
            'load/windElevCoeff?' + jzonQueryData({ topography, elev })
        )
        |> mergeMap(url => httpGetJson(url))
        |> tap(windElevCoeff)
        |> (o => o.subscribe(() => { ready.next(true) }))

}
