import { compareKeyPath, findIndex, flat, isequal, isSubset, isSuperset, tojs, zip, pickEntries } from './structures'


/**
 * entries是必须字段，在构造时就有了，已经按keypath排序。
 * */
export class KeyPathMap {
    constructor(entries) {
        this.entries = entries.sort(([a], [b]) =>
            compareKeyPath(a, b)
        )
    }

    /**
     * from plain Object
     * @param {Object} input
     * @param {function} replacer
     */
    static fromObject(input, replacer) {
        let deep = new Deep()
        deep.entries = flat(input, replacer).sort(([a], [b]) =>
            compareKeyPath(a, b)
        )
        return deep
    }

    ///基本數據屬性

    ///
    get keys() {
        if (!this._keys) {
            this._keys = this.entries.map(([k]) => k)
        }
        return this._keys
    }

    ///
    get values() {
        if (!this._values) {
            this._values = this.entries.map(([k, v]) => v)
        }
        return this._values
    }

    ///單個讀取

    ///
    get(searchKeyPath) {
        let i = findIndex(compareKeyPath, this.keys, searchKeyPath)
        return i < 0 ? undefined : this.values[i]
    }

    ///
    has(searchKeyPath) {
        let i = findIndex(compareKeyPath, this.keys, searchKeyPath)
        return i < 0 ? false : true
    }

    ///构造正常数据对象
    toObject() {
        return tojs(this.entries)
    }

    ///集合判断

    /// keys: KeyPath[], KeyPath:(string|number)[]
    equals(keys) {
        return isequal(compareKeyPath, this.keys, keys)
    }

    /// keys: KeyPath[], KeyPath:(string|number)[]
    isSubset(keys) {
        return isSubset(compareKeyPath, this.keys, keys)
    }

    /// keys: KeyPath[], KeyPath:(string|number)[]
    isSuperset(keys) {
        return isSuperset(compareKeyPath, this.keys, keys)
    }

    ///新值替换旧值：[keyPath,`oldValue`] -> [keyPath,`value`]，
    ///返回新的Deep對象
    replace(values) {
        let deep = new Deep()
        deep.entries = zip(this.keys, values)
        return deep
    }

    ///旧值后面附加新值对照：[keyPath,`oldValue`] -> [keyPath,[`oldValue`,`value`]]，
    ///返回新的Deep對象
    zip(values) {
        let zipedValues = zip(this.values, values)
        return this.replace(zipedValues)
    }

    /// 序列操作符


    forEach(...args) {
        this.entries.forEach(...args)
    }

    filter(...args) {
        let x = new Deep()
        x.entries = this.entries.filter(...args)
        return x
    }

    map(...args) {
        let dp = new Deep()
        dp.entries = this.entries.map(...args)
        return dp
    }

    //部分路徑,keys需要升序切不重复。
    intersect(keys) {
        let dp = new Deep()
        dp.entries = pickEntries(this.entries, keys)
        return dp
    }
}
