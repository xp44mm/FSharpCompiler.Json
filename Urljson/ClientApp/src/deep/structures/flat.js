import { isObservable, Subscription } from 'rxjs'

/**
 * 扁平化对象或数组，输入参数与JSON.stringify相同。
 * @param {any} data
 * @param {(v:any,k:string|number,path:(string|number)[])=>any} replacer?
 * @returns {[(string|number)[],any][]}
 */
export const flat = (data, replacer) => {
    //let new replacer
    if (typeof replacer !== 'function') {
        replacer = (value, key, keyPath) => value
    }

    function loop(acc, keyPath, key, value) {
        // let new value
        value = replacer(value, key, keyPath)

        // let new keyPath
        keyPath = [...keyPath, key]

        if (isObservable(value) || value instanceof Subscription) {
            return [...acc, [keyPath, value]]
        } else if (value && typeof value === 'object') {
            let entries = Array.isArray(value)
                ? [...value.entries()]
                : Object.entries(value)

            if (entries.length > 0) {
                //附加当前对象包含的所有词条到词条累加器后面
                return entries
                    .map(([k, v]) => loop([], keyPath, k, v))
                    .reduce((a, b) => [...a, ...b], acc)
            } else {
                //todo:空數組，空對象為葉節點
                return [...acc, [keyPath, value]]
            }
        } else {
            return [...acc, [keyPath, value]]
        }
    }

    return loop([], [], '', data).map(
        //删除辅助的第一层路段: ['', ...paths] -> paths
        ([[_, ...keyPath], value]) => [keyPath, value]
    )
}
