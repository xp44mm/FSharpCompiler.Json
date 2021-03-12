//import { List } from 'immutable'
//import { BehaviorSubject, combineLatest, isObservable, of, combineAll } from 'rxjs'
//import { map } from 'rxjs/operators'

///**
// * 获取对象中的BehaviorSubject作爲葉子節點，如果對象提供oral，使用其返回值，否則使用本方法。
// * @param {any} model
// */
//export const pickBehaviorSubject = model => {
//    if (
//        !model ||
//        typeof model !== 'object' ||
//        (isObservable(model) && !(model instanceof BehaviorSubject))
//    ) {
//        //console.log(model)
//        //throw new Error(
//        //    'pickBehaviorSubject model should be type of BehaviorSubject.'
//        //)
//    } else if (model instanceof BehaviorSubject) {
//        //保存葉節點
//        return model
//    } else if (model instanceof Array) {
//        // dense Arrays
//        //对数组中的每个元素执行
//        if (model.length > 0) {
//            let newArray = model.map(e => pickBehaviorSubject(e))
//            return combineLatest(...newArray)
//        } else {
//            //必須判斷
//            return of([])
//        }
//    } else if ('oral' in model) {
//        //给出具体的序列化方法
//        return model.oral
//    } else {
//        //忽略不需要保存的成員
//        let entries = Object.entries(model).filter(
//            ([k, v]) =>
//                v &&
//                typeof v === 'object' &&
//                (!isObservable(v) || v instanceof BehaviorSubject)
//        )

//        let keys = List(entries.map(([k]) => k))
//        let values = entries.map(([, v]) => pickBehaviorSubject(v))

//        //console.log([...keys])

//        return (
//            combineLatest(...values)
//            |> map(values => keys.zip(values))
//            |> map(Object.fromEntries)
//        )
//    }
//}

/////對象一定有成員，數組可能為空。
