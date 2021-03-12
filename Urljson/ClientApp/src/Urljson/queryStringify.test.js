import { queryStringify } from './queryStringify'

describe('queryStringify', () => {
    test('invalid data', () => {
        let xs = [undefined, null, true, 1, '', [1], {}]

        // verifies that a certain number of assertions are called during a test.
        expect.assertions(xs.length)

        for (let x in xs) {
            let y = () => queryStringify(x)
            expect(y).toThrow(Error);
        }
    })

    test('empty value', () => {
        let obj = {
            a: undefined,
            b: null,
            c: "",
        }
        let y = queryStringify(obj)
        expect(y).toEqual("a=&b=&c=")
    })

    test('data is plain object', () => {
        let x = {
            a: 1,
            b: 2,
            c: 'xyz',
            d: [1, 2],
            e: { x: 1, y: 2 },
        }
        let y = queryStringify(x)
        expect(y).toEqual("a=1&b=2&c=xyz&d=(1*2)&e=(x!1*y!2)")
    })

    test('encode data', () => {
        const data = {
            name: 'this is a test',
            inlet: {
                SO2: 4273.11,
                SO3: 45.35924,
                'CaSO4*(1/2)H2O': 49.79,
                HF: 38.48,
                ash: 'NO',
            },
            effect: [96, 30, 95, 95, 85],
            'CaSO4*(1/2)H2O': -1,
            cleanLeakage: -1,
        }

        let res = queryStringify(data)
        //console.log(decodeURIComponent(res))
        expect(res).toBe("name=this%20is%20a%20test&inlet=(SO2!4273.11*SO3!45.35924*~CaSO4*(1%2F2)H2O~!49.79*HF!38.48*ash!~NO~)&effect=(96*30*95*95*85)&CaSO4*(1%2F2)H2O=-1&cleanLeakage=-1")
    });

})

