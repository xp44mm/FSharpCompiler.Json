//import { List, Map } from 'immutable'
//import { EMPTY, isObservable } from 'rxjs'
//import { flatten } from './flatten'


//describe('test flatten', () => {
//    let data = {
//        inlet: {
//            SO2: 0,
//            SO3: 1,
//            HCl: 2,
//        },
//        effect: {
//            SO2: 5,
//            SO3: 6,
//            HCl: 7,
//        },
//        arr: [10, 11, 12],
//        dirtyLeakage: 13,
//        cleanLeakage: 14,
//    }

//    let omap = [
//        [List(['inlet', 'SO2']), 0],
//        [List(['inlet', 'SO3']), 1],
//        [List(['inlet', 'HCl']), 2],
//        [List(['effect', 'SO2']), 5],
//        [List(['effect', 'SO3']), 6],
//        [List(['effect', 'HCl']), 7],
//        [List(['arr', 0]), 10],
//        [List(['arr', 1]), 11],
//        [List(['arr', 2]), 12],
//        [List(['dirtyLeakage']), 13],
//        [List(['cleanLeakage']), 14],
//    ]

//    test('默认标量为叶节点', function() {
//        let act = flatten(data)
//        expect(act).toEqual(omap)
//    })

//    test('用第二个参数使对象为叶节点', function() {
//        let act = flatten(data, (v, k, path) => v instanceof Array )
//        let y = [
//            [List(['inlet', 'SO2']), 0],
//            [List(['inlet', 'SO3']), 1],
//            [List(['inlet', 'HCl']), 2],
//            [List(['effect', 'SO2']), 5],
//            [List(['effect', 'SO3']), 6],
//            [List(['effect', 'HCl']), 7],
//            [List(['arr']), [10, 11, 12]],
//            [List(['dirtyLeakage']), 13],
//            [List(['cleanLeakage']), 14],
//        ]

//        expect(act).toEqual(y)
//    })
//    test('test flatten Until meet some type', () => {
//        let observables = {
//            a: EMPTY,
//            b: EMPTY,
//            c: [EMPTY, EMPTY, { e: EMPTY }],
//        }

//        let omap = [
//            [List(['a']), observables.a],
//            [List(['b']), observables.b],
//            [List(['c', 0]), observables.c[0]],
//            [List(['c', 1]), observables.c[1]],
//            [List(['c', 2, 'e']), observables.c[2].e],
//        ]

//        let act = flatten(observables, value => isObservable(value))
//        expect(Map(act)).toEqual(Map(omap))
//    })
//})
