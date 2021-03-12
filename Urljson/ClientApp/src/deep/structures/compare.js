//比较结果助记法：按数轴-1在右a，1在左b。比较结果1指右边a小，-1指左边b小。
//另一种说法：a,b排列，升序排列为-1，降序排列为1。

///让第二个数b等于0,a的取值
export function defaultCompare(a, b) {
    return a > b ? 1 : a < b ? -1 : 0
}

//所有基元类型可以用此比较器
export function compareUndefined(a, b) {
    if (a === undefined && b === undefined) {
        return 0
    }

    if (a === undefined) {
        return 1
    }

    if (b === undefined) {
        return -1
    }

    return compareFunction(a, b)
}

//除了undefined，函数最大，所有函数都相等
export function compareFunction(a, b) {
    if (typeof a === 'function' && typeof b === 'function') {
        return 0
    }

    if (typeof a === 'function') {
        return 1
    }

    if (typeof b === 'function') {
        return -1
    }

    return compareNull(a, b)
}


//null最小
export function compareNull(a, b) {
    if (a === null && b === null) {
        return 0
    }

    if (a === null) {
        return -1
    }

    if (b === null) {
        return 1
    }

    return compareBoolean(a, b)
}

export function compareBoolean(a, b) {
    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return a > b ? 1 : a < b ? -1 : 0
    }

    if (typeof a === 'boolean') {
        return -1
    }

    if (typeof b === 'boolean') {
        return 1
    }

    return compareNumber(a, b)
}

export function compareNumber(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b //升序排列
    }

    if (typeof a === 'number') {
        return -1
    }

    if (typeof b === 'number') {
        return 1
    }

    return compareString(a, b)
}

export function compareString(a, b) {
    if (typeof a === 'string' && typeof b === 'string') {
        return a > b ? 1 : a < b ? -1 : 0
    }

    if (typeof a === 'string') {
        return -1
    }

    if (typeof b === 'string') {
        return 1
    }

    return a > b ? 1 : a < b ? -1 : 0
}

/// a,b 是PrimitiveArray，PrimitiveArray是Primitive[]
export function comparePrimitiveArray(a, b) {
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

    return compareNull(a0, b0) || comparePrimitiveArray(aa, bb)
}

