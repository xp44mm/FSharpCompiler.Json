import { hyperscriptArgs } from './hyperscriptArgs'
import { isPlainObject } from './isPlainObject'


it('isPlainObject', () => {
    expect(isPlainObject(1)).toEqual(false)
})

test('hyperscript args empty & single props', () => {
    expect(hyperscriptArgs([])).toEqual({
        props: {},
        children: [],
    })


    expect(hyperscriptArgs([{}])).toEqual({
        props: {},
        children: [],
    })

    expect(hyperscriptArgs([null])).toEqual({
        props: {},
        children: [],
    })
    expect(hyperscriptArgs([undefined])).toEqual({
        props: {},
        children: [],
    })
})

test('hyperscript args single children', () => {
    expect(hyperscriptArgs([1])).toEqual({
        props: {},
        children: [1],
    })

    expect(hyperscriptArgs([...[1]])).toEqual({
        props: {},
        children: [1],
    })

    expect(hyperscriptArgs([1, 2])).toEqual({
        props: {},
        children: [1, 2],
    })
})

test('hyperscript args props & children', () => {
    expect(hyperscriptArgs([{ x: 1 }, 1])).toEqual({
        props: { x: 1 },
        children: [1],
    })

    expect(hyperscriptArgs([{ x: 1 }, ...[1]])).toEqual({
        props: { x: 1 },
        children: [1],
    })

    expect(hyperscriptArgs([{ x: 1 }, 1, 2])).toEqual({
        props: { x: 1 },
        children: [1, 2],
    })
})
