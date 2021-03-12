import path from 'path'

describe('webpack test', () => {
   test('路径', () => {
      const output = path.resolve(__dirname, 'dist')
      console.log(output)
      //expect(output).toEqual({ fruit: 'strawberries', color: 'red' })
   })

   //test('无冲突嵌套合并', () => {
   //   let obj1 = {
   //      foo1: ['object1'],
   //      foo2: ['object1'],
   //      bar1: { object1: {} },
   //      bar2: { object1: {} },
   //   }

   //   let obj2 = {
   //      foo1: ['object2'],
   //      foo2: ['object2'],
   //      bar1: { object2: {} },
   //      bar2: { object2: {} },
   //   }

   //   const output = merge(obj1, obj2)

   //   expect(output).toEqual({
   //      foo1: ['object1', 'object2'],
   //      foo2: ['object1', 'object2'],
   //      bar1: { object1: {}, object2: {} },
   //      bar2: { object1: {}, object2: {} },
   //   })
   //})
})
