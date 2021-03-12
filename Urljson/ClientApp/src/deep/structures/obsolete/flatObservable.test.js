import { BehaviorSubject } from 'rxjs'
import { flatObservable } from './flatObservable'

test('test flatObservable', () => {
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

    let arr = flatObservable(observables)

    expect(arr).toBeInstanceOf(Array)
})
