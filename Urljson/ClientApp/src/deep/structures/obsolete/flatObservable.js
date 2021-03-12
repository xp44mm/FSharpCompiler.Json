//import { List } from 'immutable'
//import { isObservable } from 'rxjs'

//function loop(acc, keyPath, key, value) {
//    let newPaths = keyPath.push(key)

//    if (!value || typeof value !== 'object') {
//        //這裏是數組中的值
//        return [...acc, [newPaths, value]]
//    } else if (isObservable(value)) {
//        return [...acc, [newPaths, value]]
//    } else if (value instanceof Array) {
//        return value.map((v, i) => [i, v])
//            .map(([k, v]) => loop([], newPaths, k, v))
//            .reduce((a, b) => [...a, ...b], acc)
//    } else {
//        //只保留可觀察
//        return Object.entries(value)
//            .filter(([k, v]) => value && typeof value === 'object')
//            .map(([k, v]) => loop([], newPaths, k, v))
//            .reduce((a, b) => [...a, ...b], acc)
//    }
//}

//export function flatObservable(data) {
//    let res = loop([], List(), '', data)

//    //删除辅助的第一层路段: ['', ...paths] -> paths
//    return res.map(([keyPath, value]) => {
//        return [keyPath.shift(), value]
//    })
//}
