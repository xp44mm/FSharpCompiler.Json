import { BehaviorSubject } from 'rxjs'
import { Deep } from './Deep'

let observables = {
    a: new BehaviorSubject(0),
    b: new BehaviorSubject(0),
    c: [
        new BehaviorSubject(0),
        new BehaviorSubject(0),
        {
            e: new BehaviorSubject(0),
        },
    ],
}

let entries = [
    [['a'], 0],
    [['b'], 0],
    [['c', 0], 0],
    [['c', 1], 0],
    [['c', 2, 'e'], 0]
]

test('test fromObject', () => {
    let deep = Deep.fromObject(observables)

    let y = deep.entries.map(([k, bs]) => [k, bs.value])

    expect(y).toEqual(entries)

    //console.log(entries)
    expect(deep.keys).toEqual([['a'], ['b'], ['c', 0], ['c', 1], ['c', 2, 'e']])
})

test('test get & has', () => {
    let deep = Deep.fromObject(observables)
    let value = deep.get(['c', 0]).value
    expect(value).toEqual(0)
    expect(deep.has(['c', 0])).toEqual(true)
})

test('test to object', () => {
    let deep = Deep.fromObject(observables)
    let seq = deep.entries.map((e, i) => i)
    let newDeep = deep.replace(seq)
    let newnewdeep = newDeep.zip(seq)
    let value = newnewdeep.toObject()
    expect(value).toEqual({ a: [0, 0], b: [1, 1], c: [[2, 2], [3, 3], { e: [4, 4] }] })
})

test('test collection art', () => {
    let deep = Deep.fromObject(observables)
    //console.log(deep.keys)

    expect(deep.structureEqual([['a'], ['b'], ['c', 0], ['c', 1], ['c', 2, 'e']])).toEqual(true)
})

test('test pick', () => {
    let deep = Deep.fromObject(observables)

    let keys = [
        ['a'],
        //['b'],
        ['c', 0],
        ['c', 1],
        ['c', 2, 'e']
    ]

    let y = deep.intersect(keys).keys

    expect(keys).toEqual(y)
})

