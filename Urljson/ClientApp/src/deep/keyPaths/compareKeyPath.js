import { compareNumber } from '../structures/compare'


///a,b是KeyPath类型，KeyPath是(string|number)[]
export function compareKeyPath(a, b) {
    //两个空数组相等
    if (a.length === 0 && b.length === 0) {
        return 0
    }

    //空数组小于非空数组。
    if (a.length === 0) {
        return -1
    }

    //非空数组大于空数组。
    if (b.length === 0) {
        return 1
    }

    //两个数组每次从0位出一个元素，进行比较。
    let [a0, ...aa] = a

    let [b0, ...bb] = b

    //两个元素相等，递归比较剩余数组。
    return compareNumber(a0, b0) || compareKeyPath(aa, bb)
}
