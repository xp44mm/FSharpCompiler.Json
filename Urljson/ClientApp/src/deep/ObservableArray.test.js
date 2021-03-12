import { ObservableArray } from './ObservableArray'

test('ObservableArray is Array', () => {
    let arr = new ObservableArray()
    expect(Array.isArray(arr)).toBe(true)
})

test('ObservableArray push', () => {
    let arr = new ObservableArray()
    //arr.action.subscribe(console.log)
    arr.push(4)
    //arr.pop()
    expect([...arr]).toEqual([4])
    expect(arr[0]).toEqual(4)
})

test('ObservableArray pop', () => {
    let arr = new ObservableArray()
    //arr.action.subscribe(console.log)
    arr.push(4)
    arr.pop()
    expect([...arr]).toEqual([])
    expect(arr.length).toEqual(0)
})

test('ObservableArray shift unshift', () => {
    let arr = new ObservableArray()
    //arr.action.subscribe(console.log)
    arr.unshift(4)
    expect([...arr]).toEqual([4])
    arr.shift()
    expect(arr.length).toEqual(0)
})

test('ObservableArray splice', () => {
    let arr = new ObservableArray()
    //arr.action.subscribe(console.log)

    arr.push(1, 2, 3, 4)
    expect([...arr]).toEqual([1, 2, 3, 4])
    arr.splice(1, 0, 'new item')
    expect([...arr]).toEqual([1, 'new item', 2, 3, 4])
})

//test('ObservableArray.of', done => {
//    let arr = ObservableArray.of(1, 2, 3)
//    arr.action.subscribe(x => {
//        console.log(x)
//        done()
//    })
//    //expect(arr).toEqual([1, 2, 4])
//})
