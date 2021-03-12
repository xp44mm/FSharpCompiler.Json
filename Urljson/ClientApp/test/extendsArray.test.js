class MyArray extends Array {
    //默认构造函数，有无是一样的
    constructor(...elements) {
        super(...elements)
    }

    first() { return this[0]; }
}


test('extends Array', () => {
    let a = new MyArray(1, 2, 3)
    console.log([...a])
})
