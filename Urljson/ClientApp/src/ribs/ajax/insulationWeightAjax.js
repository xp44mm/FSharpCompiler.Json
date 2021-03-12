import { debounceTime, map, mergeMap, tap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'

//保温荷载
export function insulationWeightAjax(rib, ready) {
    let { temperature, insulationWeight } = rib

    temperature
        |> tap(() => { ready.next(false) })
        |> debounceTime(9)
        |> map(t => 'steel/insulationWeight?' + jzonQueryData({ t }))
        |> mergeMap(url => httpGetJson(url))
        |> tap(ld => { insulationWeight.next(ld) })
        |> (o => o.subscribe(() => { ready.next(true) }))
}
