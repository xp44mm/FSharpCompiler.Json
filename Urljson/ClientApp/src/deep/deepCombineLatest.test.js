﻿import { BehaviorSubject } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { Deep } from './Deep'
import { deepCombineLatest } from './deepCombineLatest'

test('test deepCombineLatest', done => {
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

    let deep = Deep.fromObject(observables)

    deepCombineLatest(deep)
        |> map(deep => deep.toObject())
        |> take(1)
        |> (obs =>
            obs.subscribe(
                data => {
                    expect(data).toEqual({ a: 0, b: 0, c: [0, 0, { e: 0 }] })
                },
                null,
                done
            ))
})
