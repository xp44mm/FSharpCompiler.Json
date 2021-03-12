import { BehaviorSubject } from 'rxjs'
import { isRxType } from './structures'
import { ObservableArray } from './ObservableArray'

/**
 * 更新ViewModel为新值src。
 * @param {any} model
 * @param {any} src 新值
 */
export const restore = (model, src) => {
    loop(model, src)
    return model
}

const loop = (o, src) => {
    if (o instanceof ObservableArray) {
        //截長
        while (o.length > src.length) {
            o.splice(o.length - 1, 1)
        }

        //補短
        while (o.length < src.length) {
            o.create()
        }

        //修改各元素的值
        for (let i of o.keys()) {
            loop(o[i], src[i])
        }
    } else if (o instanceof Array) {
        //普通数组,元组
        let indexes = o.length < src.length ? o : src

        for (let i of indexes.keys()) {
            loop(o[i], src[i])
        }
    } else if (o instanceof BehaviorSubject) {
        //输入值
        o.next(src)
    } else if (isRxType(o)) {
    } else if (typeof o === 'object') {
        //普通对象成员递归
        Object.entries(o)
            .filter(([k, v]) => k in src)
            .filter(([k, v]) => v && typeof v === 'object')
            .filter(([k, v]) => v instanceof BehaviorSubject || !isRxType(v))
            .forEach(([k, v]) => {
                loop(v, src[k])
            })
    }
}
