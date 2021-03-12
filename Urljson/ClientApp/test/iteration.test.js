test('Iterating manually', () => {
    const iterable = ['a', 'b']

    // The iterable is a factory for iterators:
    const iterator = iterable[Symbol.iterator]()

    // Call .next() until .done is true:
    expect(iterator.next()).toEqual({ value: 'a', done: false })
    expect(iterator.next()).toEqual({ value: 'b', done: false })
    expect(iterator.next()).toEqual({ value: undefined, done: true })
})

function logAll(iterable) {
    const iterator = iterable[Symbol.iterator]()
    while (true) {
        const { value, done } = iterator.next()
        if (done) break
        console.log(value)
    }
}

