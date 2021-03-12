import { BehaviorSubject } from 'rxjs'
import { merge, Observable, isObservable, from } from 'rxjs'
import { tap } from 'rxjs/operators'
import { map, mergeMap, combineLatest } from 'rxjs/operators'
import { deepMerge } from './deepMerge'
import { Deep } from './Deep'

test('test deepMerge', done => {
    const source = {
        wetAir: new BehaviorSubject(true),
        oxiair: new BehaviorSubject(true),
        x: { c: [new BehaviorSubject(true)] },
    }

    let states = []


    //let deep = Deep
    //    .fromObject(source)
    //    .filter(([keyPath, value]) => isObservable(value))


    //from(deep.entries)
    //    |> mergeMap(([keyPath, obs]) => obs |> map(value => [keyPath, value]))
    //|> tap(console.log)

    deepMerge(source)
        |> (obs => obs.subscribe(data => { states.push(data) }))

    source.wetAir.next(false)
    source.oxiair.next(false)
    source.x.c[0].next(false)

    expect(states).toEqual([
        [['oxiair'], true],
        [['wetAir'], true],
        [['x', 'c', 0], true],

        [['wetAir'], false],
        [['oxiair'], false],
        [['x', 'c', 0], false],
    ])

    done()
})
