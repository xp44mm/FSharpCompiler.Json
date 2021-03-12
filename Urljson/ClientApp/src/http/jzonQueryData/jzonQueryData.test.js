import { jzonQueryData } from './jzonQueryData'

describe('jzonQueryData', () => {
    test('invalid data', () => {
        let xs = [undefined, null, [1], 1, true]
        expect.assertions(xs.length)

        for (let x in xs) {
            let y = jzonQueryData(x)
            expect(y).toBe('')
        }
    })

    test('data is plain object', () => {
        let x = {
            a: 1,
            b: 2,
            c: 'xyz',
            d: [1, 2],
            e: { x: 1, y: 2 },
        }
        let y = jzonQueryData(x)
        expect(y).toBe("a=1&b=2&c=xyz&d=1!2&e=x*1!y*2")
    })
})
