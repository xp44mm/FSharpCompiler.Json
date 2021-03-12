import { Observable, from } from 'rxjs'

function exclude(predicate) {
    return source =>
        Observable.create(subscriber => {
            return source.subscribe(
                value => {
                    try {
                        if (!predicate(value)) {
                            subscriber.next(value)
                        }
                    } catch (err) {
                        subscriber.error(err)
                    }
                },
                err => subscriber.error(err),
                () => subscriber.complete()
            )
        })
}

test('exclude', () => {
    from([1, 2, 3, 4, 5])
        .pipe(exclude(x => x % 2 === 0))
        .subscribe(console.log)
})
