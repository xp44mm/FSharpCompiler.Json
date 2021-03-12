import {urljsonStringify} from './urljsonStringify'

describe('stringify', () => {
    test('basis data', () => {
        expect(urljsonStringify(null)).toEqual("null")
        expect(urljsonStringify(false)).toEqual("false")
        expect(urljsonStringify(true)).toEqual("true")
        expect(urljsonStringify(0)).toEqual("0")
        expect(urljsonStringify([])).toEqual("()")
        expect(urljsonStringify({})).toEqual("(!)")
    })

    test('obj data', () => {
        let x = { a:0}
        expect(urljsonStringify(x)).toEqual("(a!0)")
    })

    test('obj tilde key', () => {
        let x = { '~':0}
        expect(urljsonStringify(x)).toEqual("(~\\~~!0)")
    })

    test('array data', () => {
        let x = ["~",null]
        expect(urljsonStringify(x)).toEqual("(~\\~~*null)")
    })

    test('obj fields', () => {
        let obj = {
            a: 1,
            b: 2,
        }
        let s = urljsonStringify(obj)

        expect(s).toEqual('(a!1*b!2)')
    })

    test('arr elements', () => {
        let obj = ['a', 2, 'cd']
        let s = urljsonStringify(obj)

        expect(s).toEqual('(~a~*2*~cd~)')
    })

})
