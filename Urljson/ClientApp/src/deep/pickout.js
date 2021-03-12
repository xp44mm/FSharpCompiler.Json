import { BehaviorSubject ,isObservable} from 'rxjs'
import { isRxType } from './structures'

/**
 * 拾取对象中的BehaviorSubject值，作爲葉子節點，忽略其他值。
 * @param {{}} value
 *
 */
export const pickout = (value, key, parent) => {
    if (isObservable(value) && value instanceof BehaviorSubject) {
        //保存葉節點
        return value.value
    } else if (isRxType(value)) {
        throw new TypeError('pickout is rx type.')
    } else if (value instanceof Array) {
        // dense Array
        return Array.from(value).map(pickout)
    } else if ('pickeys' in value) {
        //pickeys是value對象的方法，可根據狀態，確定要保存的鍵值
        let entries = value.pickeys().map(k => [k, value[k]])
        return pickoutEntries(entries)
    } else {
        return pickoutEntries(Object.entries(value))
    }
}

function pickoutEntries(entries) {
    let entries1 = entries
        .filter(([k, v]) => v && typeof v === 'object')
        .filter(([k, v]) => v instanceof BehaviorSubject || !isRxType(v))
        .map(([k, v]) => [k, pickout(v)])
    return Object.fromEntries(entries1)
}
