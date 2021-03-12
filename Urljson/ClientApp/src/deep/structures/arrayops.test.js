import { zip, groupBy } from './arrayops'
import { compareKeyPath } from './keyPath'
import { defaultCompare } from './compare'

//describe block
describe('array ops', () => {
    test('zip test', () => {
        expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
        ])
        expect(zip([1, 2, 3, 4], ['a', 'b', 'c'])).toEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
            [4, undefined],
        ])
        expect(zip([1, 2, 3], ['a', 'b', 'c', 'd'])).toEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
            [undefined, 'd'],
        ])
    })
})

describe('groupBy', function() {
    it('splits the list into groups according to the grouping function', function() {
        const grade = function(score) {
            return score < 65
                ? 'F'
                : score < 70
                    ? 'D'
                    : score < 80
                        ? 'C'
                        : score < 90
                            ? 'B'
                            : 'A'
        }
        const students = [
            { name: 'Abby', score: 84 },
            { name: 'Brad', score: 73 },
            { name: 'Chris', score: 89 },
            { name: 'Dianne', score: 99 },
            { name: 'Eddy', score: 58 },
            { name: 'Fred', score: 67 },
            { name: 'Gillian', score: 91 },
            { name: 'Hannah', score: 78 },
            { name: 'Irene', score: 85 },
            { name: 'Jack', score: 69 },
        ]
        const byGrade = function(student) {
            return grade(student.score || 0)
        }

        const x = groupBy(defaultCompare, students, student =>
            grade(student.score)
        )

        //console.log(x)
        let y = Object.entries({
            A: [{ name: 'Dianne', score: 99 }, { name: 'Gillian', score: 91 }],
            B: [
                { name: 'Abby', score: 84 },
                { name: 'Chris', score: 89 },
                { name: 'Irene', score: 85 },
            ],
            C: [{ name: 'Brad', score: 73 }, { name: 'Hannah', score: 78 }],
            D: [{ name: 'Fred', score: 67 }, { name: 'Jack', score: 69 }],
            F: [{ name: 'Eddy', score: 58 }],
        })

        expect(x).toEqual(y)
    })

    it('returns an empty object if given an empty array', function() {
        let y = groupBy(compareKeyPath, [], a => a[0])
        expect(y).toEqual([])
    })
})
