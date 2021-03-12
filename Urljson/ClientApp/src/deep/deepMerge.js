import { from, isObservable, Observable } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { Deep } from './Deep'

/**
 * 追蹤對象是哪個屬性發生了變化。
 * @param {Deep} source
 * @returns {Observable}
 */
export const deepMerge = source => {
    let deep = Deep
        .fromObject(source)
        .filter(([keyPath, value]) => isObservable(value))

    return from(deep.entries)
        |> mergeMap(([keyPath, obs]) => obs
            |> map(value => [keyPath, value]))

}
