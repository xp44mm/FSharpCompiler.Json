import { pickEntries } from './keyPath'

//describe block
describe('keyPath block', () => {
    test('pickEntries test', () => {
        ///不重复，且升序排列
        let entries = [
            [['a'], 0],
            [['b'], 0],
            [['c', 0], 0],
            [['c', 1], 0],
            [['c', 2, 'e'], 0]
        ]

        ///不重复，且升序排列
        let keys = [
            ['a'],
            //['b'],
            ['c', 0],
            ['c', 1],
            ['c', 2, 'e']
        ]

        let y = pickEntries(entries, keys)

        console.log(y)
        expect(y).toEqual([
            [['a'], 0],
            [['c', 0], 0],
            [['c', 1], 0],
            [['c', 2, 'e'], 0]
        ])
    })
})
