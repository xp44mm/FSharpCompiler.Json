///輸入數組按升序排列
export function uniqBy(compare, st) {
    function loop(acc, st) {
        if (st.length === 0) {
            return acc
        } else if (acc.length === 0) {
            return loop([st[0]], st.slice(1))
        } else {
            switch (Math.sign(compare(acc[acc.length - 1], st[0]))) {
                case 0:
                    return loop(acc, st.slice(1))

                case -1:
                    return loop([...acc, st[0]], st.slice(1))

                case 1:
                    throw new Error('never!')
            }
        }
    }
    try {
        return loop([], st)
    } catch (e) {
        console.error('uniqBy')
    }
}

/// 同Array.findIndex
export function findIndex(compare, st, e) {
    let loop = (i, st) => {
        if (st.length === 0) {
            return -1
        } else {
            switch (Math.sign(compare(st[0], e))) {
                case 0:
                    return i

                case -1:
                    return loop(i + 1, st.slice(1))

                case 1:
                    return -1
            }
        }
    }

    return loop(0, st)
}

///集合交集，数组必须升序排列
export function intersect(compare, a, b) {
    let y = []

    let loop = (a, b) => {
        if (a.length === 0 || b.length === 0) {
            return y
        } else {
            switch (Math.sign(compare(a[0], b[0]))) {
                case 0:
                    y.push(a[0])
                    return loop(a.slice(1), b.slice(1))

                case -1:
                    return loop(a.slice(1), b)

                case 1:
                    return loop(a, b.slice(1))
            }
        }
    }

    return loop(a, b)
}

export function union(compare, a, b) {
    let y = []

    let loop = (a, b) => {
        if (a.length === 0) {
            y.push(...b)
            return y
        } else if (b.length === 0) {
            y.push(...a)
            return y
        } else {
            switch (Math.sign(compare(a[0], b[0]))) {
                case 0:
                    y.push(a[0])
                    return loop(a.slice(1), b.slice(1))
                case -1:
                    y.push(a[0])
                    return loop(a.slice(1), b)
                case 1:
                    y.push(b[0])
                    return loop(a, b.slice(1))
            }
        }
    }
    return loop(a, b)
}

export function subtract(compare, a, b) {
    let y = []

    let loop = (a, b) => {
        if (a.length === 0) {
            return y
        } else if (b.length === 0) {
            y.push(...a)
            return y
        } else {
            switch (Math.sign(compare(a[0], b[0]))) {
                case 0:
                    return loop(a.slice(1), b.slice(1))
                case -1:
                    y.push(a[0])
                    return loop(a.slice(1), b)
                case 1:
                    return loop(a, b.slice(1))
            }
        }
    }
    return loop(a, b)
}

export function has(compare, st, e) {
    return findIndex(compare, st, e) < 0 ? false : true
}

export function isSubset(compare, a, b) {
    let loop = (a, b) => {
        if (a.length === 0) {
            return true
        } else if (b.length === 0) {
            return false
        } else {
            switch (Math.sign(compare(a[0], b[0]))) {
                case 0:
                    return loop(a.slice(1), b.slice(1))
                case -1:
                    return false
                case 1:
                    return loop(a, b.slice(1))
            }
        }
    }
    return loop(a, b)
}

export function isSuperset(compare, a, b) {
    return isSubset(compare, b, a)
}

///判断数组是否相等
export function isequal(compare, a, b) {
    let loop = (a, b) => {
        if (a.length === 0 && b.length === 0) {
            return true
        }

        if (a.length > 0 && b.length > 0) {
            let [a0, ...aa] = a
            let [b0, ...bb] = b
            if (compare(a0, b0) === 0) {
                return loop(aa, bb)
            } else {
                return false
            }
        }

        return false
    }
    return loop(a, b)
}
