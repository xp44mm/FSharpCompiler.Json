import { compareUndefined } from './compare'

///Array.sort()将undefined放在末尾，无论是否提供compareFunction。
// All undefined elements are sorted to the end of the array.

//describe block
describe('compare primitive block', () => {
    test('undefined test', () => {
        //undefined最大
        let x = compareUndefined(undefined, null)
        let y = compareUndefined(undefined, undefined)
        let z = compareUndefined(null, undefined)

        expect(x).toEqual(1)
        expect(y).toEqual(0)
        expect(z).toEqual(-1)
    })

    test('Array sort', () => {
        let arr = [
            undefined,
            false, true, '10', 10,
            null,
        ]

        let sortArr = [...arr]
        sortArr.sort((a, b) => compareUndefined(a, b))
        expect(sortArr).toEqual([null, false, true, 10, '10', undefined])
    })
})
