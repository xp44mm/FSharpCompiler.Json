import { compareNumber } from './compare'
import { compareKeyPath } from './keyPath'

/*从扁平数据集，建立js对象*/

///输入的数组是[0,1,2,...]
export function isRange(keys) {
    if (keys.every(key => /^\d+$/.test(key))) {
        let nums = keys.map(key => parseInt(key))
        return nums.every((v, i) => v === i)
    }
    return false
}

//const peel = entries => entries.map(([[_, ...keyPath], v]) => [keyPath, v])

export function groupByFirstLevelKey(flatEntries) {
    if (flatEntries.length === 0) {
        return flatEntries
    }

    let collection = flatEntries.map(([[key, ...keyPath], value]) => [
        key,
        [keyPath, value],
    ])

    return collection.reduce(
        (acc, [k, v]) => {
            let [k0, group] = acc[acc.length - 1]
            if (compareNumber(k0, k) === 0) {
                group.push(v)
            } else {
                acc.push([k, [v]])
            }
            return acc
        },
        [[collection[0][0], []]]
    )
}

/// 假设输入已经排好顺序，按照keyPath。
export function tojs(flatEntries) {
    let entries = groupByFirstLevelKey(flatEntries).map(([k, group]) => {
        /// exhaust match entries with [[[],value]]
        let v =
            group.length === 1 && group[0][0].length === 0
                ? group[0][1]
                : tojs(group)
        return [k, v]
    })

    let keys = entries.map(([k]) => k)
    let obj = Object.fromEntries(entries)
    if (isRange(keys)) {
        return Array.from({ ...obj, length: keys.length })
    } else {
        return obj
    }
}

export function erectObject(flatEntries) {
    //排序为了分组，首次排序后，不需要再排序。
    let collection = flatEntries.sort(([a], [b]) => compareKeyPath(a, b))
    return tojs(collection)
}
