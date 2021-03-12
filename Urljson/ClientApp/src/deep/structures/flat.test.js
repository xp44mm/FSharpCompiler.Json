import { EMPTY } from 'rxjs'
import { flat } from './flat'
import { locate } from './locate'

describe('test flatten', () => {
    let data = {
        inlet: {
            SO2: 0,
            SO3: 1,
            HCl: 2,
        },
        effect: {
            SO2: 5,
            SO3: 6,
            HCl: 7,
        },
        arr: [10, 11, 12],
        dirtyLeakage: 13,
        cleanLeakage: 14,
    }

    let entries = [
        [['inlet', 'SO2'], 0],
        [['inlet', 'SO3'], 1],
        [['inlet', 'HCl'], 2],
        [['effect', 'SO2'], 5],
        [['effect', 'SO3'], 6],
        [['effect', 'HCl'], 7],
        [['arr', 0], 10],
        [['arr', 1], 11],
        [['arr', 2], 12],
        [['dirtyLeakage'], 13],
        [['cleanLeakage'], 14],
    ]

    test('默认标量为叶节点', function() {
        let act = flat(data)
        expect(act).toEqual(entries)
    })

    test('用第二个参数使对象为叶节点', function() {
        let act = flat(
            data,
            (v, k, path) => (Array.isArray(v) ? undefined : v)
        ).map(([path, value]) => [
            path,
            value === undefined ? locate(data, path) : value,
        ])

        let y = [
            [['inlet', 'SO2'], 0],
            [['inlet', 'SO3'], 1],
            [['inlet', 'HCl'], 2],
            [['effect', 'SO2'], 5],
            [['effect', 'SO3'], 6],
            [['effect', 'HCl'], 7],
            [['arr'], [10, 11, 12]],
            [['dirtyLeakage'], 13],
            [['cleanLeakage'], 14],
        ]

        expect(act).toEqual(y)
    })
    test('test flatten Until meet some type', () => {
        let observables = {
            a: EMPTY,
            b: EMPTY,
            c: [EMPTY, EMPTY, { e: EMPTY }],
        }

        let entries = [
            [['a'], observables.a],
            [['b'], observables.b],
            [['c', 0], observables.c[0]],
            [['c', 1], observables.c[1]],
            [['c', 2, 'e'], observables.c[2].e],
        ]

        let act = flat(observables)
        expect(entries).toEqual(entries)
    })
    test('test flatObservable', () => {
        let observables = {
            a: new BehaviorSubject(0),
            b: new BehaviorSubject(0),
            c: [
                new BehaviorSubject(0),
                new BehaviorSubject(0),
                {
                    e: new BehaviorSubject(0),
                },
            ],
        }

        let arr = flat(observables)
        expect(arr).toBeInstanceOf(Array)
    })

})
