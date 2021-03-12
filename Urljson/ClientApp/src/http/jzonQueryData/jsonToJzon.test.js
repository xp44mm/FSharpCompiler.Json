import { jsonToJzon } from './jsonToJzon'

test('obj', () => {
    let obj = {
        a: 1,
        b: 2,
    }
    let s = JSON.stringify(obj) |> jsonToJzon

    expect(s).toEqual('(a*1!b*2)')
})

test('arr', () => {
    let obj = ['a', 2, 'cd']
    let s = JSON.stringify(obj) |> jsonToJzon

    expect(s).toEqual('(~a~!2!~cd~)')
})

test('primitive', () => {
    let obj = 'a'
    let s = JSON.stringify(obj) |> jsonToJzon

    expect(s).toEqual('~a~')
})


test('null??', () => {
    expect(null ?? true).toBeTruthy()
})

