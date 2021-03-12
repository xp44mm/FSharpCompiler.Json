import { compareNumber } from './compare'
import { uniqBy, has, compare, isequal, isSubset, isSuperset } from './setops'

///a,b是KeyPath类型，KeyPath是(string|number)[]
export function compareKeyPath(a, b) {
    if (a.length === 0 && b.length === 0) {
        return 0
    }

    if (a.length === 0) {
        return 1
    }

    if (b.length === 0) {
        return -1
    }

    let [a0, ...aa] = a
    let [b0, ...bb] = b

    return compareNumber(a0, b0) || compareKeyPath(aa, bb)
}

export function pickEntries(entries, keys) {
    let y = []
    ///由intersect修改而来
    let loop = (entries, keys) => {
        if (entries.length === 0 || keys.length === 0) {
            return y
        } else {
            switch (Math.sign(compareKeyPath(entries[0][0], keys[0]))) {
                case 0:
                    y.push(entries[0])
                    return loop(entries.slice(1), keys.slice(1))

                case -1:
                    return loop(entries.slice(1), keys)

                case 1:
                    return loop(entries, keys.slice(1))
            }
        }
    }
    return loop(entries, keys)
}

