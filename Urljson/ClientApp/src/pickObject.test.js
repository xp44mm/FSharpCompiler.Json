import { pickObject } from './pickObject'

test('test pickObject', () => {
    let obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5
    }

    let y = pickObject(obj, ['a', 'd', 'e'])
    expect(y).toEqual({ a: 1, d: 4, e: 5 })

})
