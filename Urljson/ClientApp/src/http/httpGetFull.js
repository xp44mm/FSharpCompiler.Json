import { of } from 'rxjs'
import { map, mergeMap,tap } from 'rxjs/operators'
import { httpGetJson } from './httpGetJson'
import { jzonQueryData } from './jzonQueryData'

///返回输入与输出的并集
export function httpGetFull(mainUrl, data) {
    return of([mainUrl, data])
        |> map(([mainUrl, data]) => [mainUrl + jzonQueryData(data), data])
        |> mergeMap(
            ([url, data]) =>
                httpGetJson(url) |> map(res => ({ ...data, ...res }))
        )
}
