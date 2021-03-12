import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export function everyTrue(allow) {
    if (Array.isArray(allow)) {
        return combineLatest(...allow)
            |> map(arr => arr.every(p => p))

    } else {
        return allow
    }

}