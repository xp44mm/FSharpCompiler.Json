import {  compareKeyPath } from './compareKeyPath'

describe('compare key path', () => {
    test('empty array compare', () => {
        expect(compareKeyPath([], [1])).toEqual(-1)
        expect(compareKeyPath([], [])).toEqual(0)
        expect(compareKeyPath([1], [])).toEqual(1)
    })

    //可比元素不同
    test('elem different compare', () => {
        expect(compareKeyPath([0], [1])).toEqual(-1)
        expect(compareKeyPath([0,1], [1])).toEqual(-1)
        expect(compareKeyPath([0], [1,2])).toEqual(-1)
    })

    //可比元素相同，长度不同
    test('elem same compare', () => {
        expect(compareKeyPath([0], [0])).toEqual(0)
        expect(compareKeyPath([0,1], [0])).toEqual(1)
        expect(compareKeyPath([0], [0,2])).toEqual(-1)
    })

})
