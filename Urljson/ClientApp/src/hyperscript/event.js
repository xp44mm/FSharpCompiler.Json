import { fromEvent } from 'rxjs'
import { modifySubscription } from './modifySubscription'

export function pipeEvent(elem) {
    return (event, subscriber) => {
        let event$ = fromEvent(elem, event)

        let subscription =
            event$
            |> subscriber

        modifySubscription(elem, subscription)
        return elem
    }
}

export function subscribeEvent(elem) {
    return (event, subscriber) => {
        let event$ = fromEvent(elem, event)

        let subscription = event$.subscribe(subscriber)

        modifySubscription(elem, subscription)
        return elem
    }
}
