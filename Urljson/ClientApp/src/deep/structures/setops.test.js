import { isequal, intersect, union, subtract,findIndex} from './setops'
import { compareKeyPath } from './keyPath'
import { defaultCompare } from './compare'

describe('set ops block', () => {
    test('isequal test', () => {
        let a = [1, 2]
        let b = [1, 3]
        let c = [1, 2, 3]

        expect(isequal((a, b) => a === b, a, [...a])).toEqual(true)
        expect(isequal((a, b) => a === b, a, b)).toEqual(false)
        expect(isequal((a, b) => a === b, a, c)).toEqual(false)
        expect(isequal((a, b) => a === b, b, c)).toEqual(false)
    })

    test('isequal keypath test', () => {
        let a = [[1, 2], ['a', 'b']]
        let b = [[1, 2], ['a', 'b']]

        expect(isequal((a, b) => compareKeyPath(a, b) === 0, a, b)).toEqual(
            true
        )
    })

    test('intersect test', () => {
        let a = [1, 2]
        let b = [1, 3]
        let c = [1, 2, 3]

        expect(intersect(defaultCompare, a, b)).toEqual([1])
        expect(intersect(defaultCompare, a, c)).toEqual(a)
        expect(intersect(defaultCompare, b, c)).toEqual(b)
    })

    it('unions two sets', () => {
        const s1 = ['a', 'b', 'c'].sort()
        const s2 = ['d', 'b', 'wow'].sort()
        const s3 = union(defaultCompare, s1, s2)
        expect(s3).toEqual(['a', 'b', 'c', 'd', 'wow'])
    })

    it('subtract sets', () => {
        const s = subtract(defaultCompare, ['A', 'B', 'C'].sort(), ['C', 'D', 'E'].sort())
        expect(s).toEqual(['A', 'B'])
    })

    it('find index', () => {
        let st = ['A', 'B', 'C'].sort()
        expect(findIndex(defaultCompare,st,'B')).toEqual(1)
        expect(findIndex(defaultCompare,st,'D')).toEqual(-1)
    })

})
