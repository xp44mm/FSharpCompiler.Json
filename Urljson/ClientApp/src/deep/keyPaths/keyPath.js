import { compareKeyPath } from './compareKeyPath'

class KeyPath extends Array {
    compare(keyPath) {
        compareKeyPath(this, keyPath)
    }

    static create(...keys) {
        if (keys.every(v => typeof v === 'string' || typeof v === "number")) {
            return new KeyPath(...keys)
        } else {
            throw new Error('KeyPath.create:key必须是string|number')
        }
    }

}

///entries代表map的键值对集合，keys是键的集合，集合都是由小到大排列的，
///pickEntries返回存在于keys集合中的所有词条。
///词条顺序保持稳定，可以直接使用。
export function pickEntries(entries, keys) {
    let loop = (accum, entries, keys) => {
        if (entries.length === 0 || keys.length === 0) {
            return accum
        } else {
            switch (Math.sign(compareKeyPath(entries[0][0], keys[0]))) {
                case 0:
                    return loop([...accum, entries[0]], entries.slice(1), keys.slice(1))
                case -1:
                    return loop(accum, entries.slice(1), keys)

                case 1:
                    return loop(accum, entries, keys.slice(1))
            }
        }
    }
    return loop([], entries, keys)
}

