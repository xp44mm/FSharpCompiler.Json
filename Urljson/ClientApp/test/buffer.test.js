import { Observable, from, BehaviorSubject, Subject } from 'rxjs'

function buffer(bufferCount) {
    let arr = []
    return source =>
        new Observable(subscriber => {
            source.subscribe(
                value => {
                    try {
                        arr.push(value)
                        if (arr.length === bufferCount) {
                            subscriber.next([...arr])
                            arr = []
                        }
                    } catch (err) {
                        subscriber.error(err)
                    }
                },
                err => subscriber.error(err),
                () => {
                    if (arr.length > 0) {
                        subscriber.next([...arr])
                    }
                    subscriber.complete()
                }
            )
        })
}

//test('buffer', () => {
//    from([1, 2, 3, 4, 5])
//        .pipe(buffer(2))
//        .subscribe(console.log)
//})

test('loop next', done => {
    let target = []
    let push$ = new Subject()

    let source = [1, 2, 3, 4, 5]

    push$.subscribe(elem => {
        console.log(elem)
        target.push(elem)
    })


    for (const elem of source) {
        push$.next(elem)
    }
    console.log(target)

    done()
})
