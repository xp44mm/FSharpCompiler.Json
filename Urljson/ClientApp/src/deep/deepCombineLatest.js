﻿import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Deep } from './Deep'


///同combineLatest操作符，不同於合并數組，本函數合并的為Deep對象。

/**
 * 
 * @param {Deep} deep
 * @returns {Observable}
 */
export function deepCombineLatest(deep) {
    return (
        combineLatest(...deep.values)
        |> map(values => deep.replace(values))
    )
}
