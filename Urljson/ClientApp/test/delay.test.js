import { from } from 'rxjs'
import { delay, tap, concat, timeInterval } from 'rxjs/operators'

test('delay', done => {
    from([1, 2, 3, 4, 5])
        .pipe(
            tap(x => console.log(`Emitted: ${x}`)), //*1
            delay(200) //*2
        )
        .subscribe(
            x => console.log(`Received: ${x}`),
            err => { },
            () => { done() }
        )
})

test.only('Listing 4.8 Sequential delay operators', done => {
    from([1, 2])
        .pipe(
            delay(200),
            concat(from([3, 4])), //*1
            delay(200),
            concat(from([5, 6])), //*1
            delay(200),
            timeInterval(),
        )
        .subscribe(
            x => console.log(x),
            err => { },
            () => { done() }
        )
})
