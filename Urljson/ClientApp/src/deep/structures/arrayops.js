///两个数组，没有洞，按索引对应，短的补undefined
export function zip(a, b) {
    let y = []
    let loop = (a, b) => {
        if (a.length === 0 && b.length === 0) {
            return y
        }

        if (a.length === 0) {
            y.push(...b.map(v => [undefined, v]))
            return y
        }

        if (b.length === 0) {
            y.push(...a.map(v => [v, undefined]))
            return y
        }

        let [a0, ...aa] = a
        let [b0, ...bb] = b
        y.push([a0, b0])
        return loop(aa, bb)
    }
    return loop(a, b)
}

export function groupBy(compareKey, collection, getKey) {
    if (collection.length === 0) {
        return collection
    }

    let sortedCollection = collection
        .map(e => [getKey(e), e])
        .sort(([a], [b]) => compareKey(a, b))

    return sortedCollection.reduce(
        (acc, [k, v]) => {
            let [k0, group] = acc[acc.length - 1]

            if (compareKey(k0, k) === 0) {
                group.push(v)
            } else {
                acc.push([k, [v]])
            }
            return acc
        },
        [[sortedCollection[0][0], []]]
    )
}

