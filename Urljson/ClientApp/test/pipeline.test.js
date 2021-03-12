test('Common operations', () => {
    let fruits = ['Apple', 'Banana']

    var first = fruits[0]
    expect(first).toEqual('Apple')

    var last = fruits[fruits.length - 1]
    expect(last).toEqual('Banana')


    var newLength = fruits.push('Orange');
// ["Apple", "Banana", "Orange"]


})

test('Add to the end of an Array', () => {
    let fruits = ['Apple', 'Banana']

    var newLength = fruits.push('Orange')
    expect()["Apple", "Banana", "Orange"]

})


