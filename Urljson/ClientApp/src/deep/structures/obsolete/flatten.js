//import { List } from 'immutable'

///**
// * 返回entries键值对数组，只是键是字符串的数组
// * @param {any[]} acc (keyPath,value)对
// * @param {List<string|number>} keyPath 所在容器的路径
// * @param {string|number} key
// * @param {any} value
// * @param {(k:string|number,v:any)=>any} isTerminal
// */
//function loop(acc, keyPath, key, value, isTerminal) {
//    ///todo: add mapper remove isTerminal
//    //let newValue =
//    //    typeof mapper == 'function' ? mapper(value, key, keyPath) : value

//    let forceTerminal =
//        typeof isTerminal == 'function'
//            ? isTerminal(value, key, keyPath)
//            : false

//    let newPaths = keyPath.push(key)

//    if (value && typeof value == 'object' && !forceTerminal) {
//        let entries =
//            value instanceof Array
//                ? [...value.entries()]
//                : Object.entries(value)

//        if (entries.length > 0) {
//            return entries
//                .map(([k, v]) => loop([], newPaths, k, v, isTerminal))
//                .reduce((a, b) => [...a, ...b], acc)
//        } else {
//            //todo:空數組，空對象為葉節點
//            return [...acc, [newPaths, value]]
//        }
//    } else {
//        return [...acc, [newPaths, value]]
//    }
//}

///**
// * 扁平化对象或数组，输入参数与JSON.stringify相同。
// * @param {any} data
// * @param {(k:string|number,v:any)=>any} isTerminal
// * @returns {[List<string|number>,any][]}
// */
//export const flatten = (data, isTerminal) =>
//    loop([], List(), '', data, isTerminal).map(
//        //删除辅助的第一层路段: ['', ...paths] -> paths
//        ([keyPath, value]) => [keyPath.shift(), value]
//    )
