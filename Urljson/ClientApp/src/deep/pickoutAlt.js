//import { BehaviorSubject, Observable, Subscription } from 'rxjs'

///**
// * 同pickout，另一種實現方法。
// * @param {any} value
// */
//export const pickout = value => loop({}, '', value)['']

//function loop(container, key, value) {
//    if (value instanceof BehaviorSubject) {
//        //保存葉節點
//        return Object.assign(container, { [key]: value.value })
//    } else if (value instanceof Observable) {
//        return container //忽略
//    } else if (value instanceof Subscription) {
//        return container //忽略
//    } else if (value instanceof Array) {
//        // dense Array
//        let arr = Array.from(value)
//        return Object.assign(container, { [key]: arr.map(pickout) })
//    } else if ('pickeys' in value) {
//        //pickeys是value對象的方法，可根據狀態，確定要保存的鍵值
//        let entries = value.pickeys().map(k => [k, pickout(value[k])])
//        return Object.assign(container, { [key]: Object.fromEntries(entries) })
//    } else {
//        let entries = Object.entries(value)
//            .filter(([k, v]) => v && typeof v === 'object')
//            .map(([k, v]) => [k, pickout(v)])
//        return Object.assign(container, { [key]: Object.fromEntries(entries) })
//    }
//}
