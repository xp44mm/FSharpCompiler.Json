import { combineLatest, throwError, BehaviorSubject } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../deep'
export { httpGetJson } from './httpGetJson'
export { jzonQueryData } from './jzonQueryData'

///
export function subscribeRequest({ allow, ready, input, url, result }) {
    let s1 = allow
        |> filter(s => !s)
        |> (o => o.subscribe(
            () => ready.next(false),
            err => console.error(err.message)
        ))

    let inputDeep = Deep.fromObject(input)

    let response = combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => ready.next(false))
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => url + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> tap(console.log)

    let r2;
    if (result instanceof BehaviorSubject) {
        r2 = response |> tap(result)
    } else {
        let resultDeep = Deep.fromObject(result)
        r2 =
            response
            |> map(data => {
                let deep = Deep.fromObject(data)
                if (deep.structureEqual(resultDeep.keys)) {
                    return deep.zip(resultDeep.values).values
                } else if (deep.isSuperset(resultDeep.keys)) {
                    return deep.intersect(resultDeep.keys).zip(resultDeep.values).values
                }
                return throwError(new Error(url))
            })
            |> tap(zipValues => {
                zipValues.forEach(([value, subject]) => {
                    subject.next(value)
                })
            })
    }

    let s2 = r2.subscribe(
        () => { ready.next(true) },
        err => console.error(err.message)
    )

    return s1.add(s2)
}

