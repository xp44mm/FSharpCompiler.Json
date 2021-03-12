import { groupBy } from './arrayops'
import { compareNumber } from './compare'
import { isRange, tojs, erectObject } from './erectObject'
import { compareKeyPath } from './keyPath'

describe('test erectObject', () => {
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

    let sortedEntries = [
        [['arr', 0], 10],
        [['arr', 1], 11],
        [['arr', 2], 12],
        [['cleanLeakage'], 14],
        [['dirtyLeakage'], 13],
        [['effect', 'HCl'], 7],
        [['effect', 'SO2'], 5],
        [['effect', 'SO3'], 6],
        [['inlet', 'HCl'], 2],
        [['inlet', 'SO2'], 0],
        [['inlet', 'SO3'], 1],
    ]

    test('isRange test', () => {
        let act = isRange(['0', '1', '2'])
        expect(act).toEqual(true)
    })

    test('tojs test', () => {
        //先排序
        let x = sortedEntries
        let y = tojs(x)

        let r = {
            arr: [10, 11, 12],
            cleanLeakage: 14,
            dirtyLeakage: 13,
            effect: { HCl: 7, SO2: 5, SO3: 6 },
            inlet: { HCl: 2, SO2: 0, SO3: 1 }
        }

        expect(y).toEqual(r)
    })

    test('erectObject test', () => {
        let x = entries
        let y = erectObject(x)

        let r = {
            arr: [10, 11, 12],
            cleanLeakage: 14,
            dirtyLeakage: 13,
            effect: { HCl: 7, SO2: 5, SO3: 6 },
            inlet: { HCl: 2, SO2: 0, SO3: 1 }
        }

        expect(y).toEqual(r)
    })

})
