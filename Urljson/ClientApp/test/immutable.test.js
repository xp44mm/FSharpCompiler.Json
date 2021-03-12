import { List } from 'immutable'

test('List Compare Test', () => {
    const ls1 = List([])
    const ls2 = List([0])
    const ls3 = List([1])
    const ls4 = List(['1'])

    let ls = List([
        List([]),
        List([0]),
        List([1]),
        List(['1']),
        List(['a', 'b']),
        List(['a', 'a']),

    ]).sort()

    console.log(ls.toString())

    //expect(List([])).toEqual({ value: 'a', done: false })
    //expect(iterator.next()).toEqual({ value: 'b', done: false })
    //expect(iterator.next()).toEqual({ value: undefined, done: true })
})
