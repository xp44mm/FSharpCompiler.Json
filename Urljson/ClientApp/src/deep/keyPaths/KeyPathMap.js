import { compareKeyPath } from './compareKeyPath'
import { findIndex, flat, isequal, isSubset, isSuperset, tojs, zip, pickEntries, subtract } from './structures'


/**
 * entries是必须字段，在构造时就有了，已经按keypath排序。
 * */
export class KeyPathMap extends Array {
    /// 已经排序好的条目
    constructor(...entries) {
        super(...entries)
        this.keyPaths = entries.map(([keyPath]) => keyPath)
    }

    //先排序，然后构造
    static sort(...entries) {
        let sortedArray =
            [...entries]
                .sort(([a], [b]) => compareKeyPath(a, b))
        return new KeyPathMap(...sortedArray)
    }

    /// The has() method returns a boolean indicating whether an element with the specified key exists or not.
    has(keyPath) {
        let i = findIndex(compareKeyPath, this.keyPaths, keyPath)
        return i >= 0
    }

    ///按keyPath给出值，如果键不存在，抛出异常。
    get(keyPath) {
        let i = findIndex(compareKeyPath, this.keyPaths, keyPath)
        if (i < 0) {
            throw new Error(JSON.stringify(keyPath) + ' no found')
        } else {
            return this.values[i]
        }
    }
    ///集合的键集合是否等于给定的键集合
    equals(keyPaths) {
        return isequal(compareKeyPath, this.keyPaths, keyPaths)
    }

    ///集合的键集合是否是给定的键集合的子集
    isSubset(keyPaths) {
        return isSubset(compareKeyPath, this.keyPaths, keyPaths)
    }

    ///集合的键集合是否是给定的键集合的超集
    isSuperset(keyPaths) {
        return isSuperset(compareKeyPath, this.keyPaths, keyPaths)
    }

    ///保留存在于给定键集合中的词条，返回新集合。
    intersect(keyPaths) {
        let entries = pickEntries(this.keyPaths, keyPaths)
        return new KeyPathMap(...entries)
    }

    ///排除存在于给定键集合中的词条，返回新集合。
    subtract(keyPaths) {

    }


}
