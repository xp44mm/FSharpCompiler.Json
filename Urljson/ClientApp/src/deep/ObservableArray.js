import { BehaviorSubject } from 'rxjs'
import { filter, map } from 'rxjs/operators'

export const observableArray = (...args) => new ObservableArray(...args)

export class ObservableArray extends Array {
    constructor(...args) {
        super(...args)
        this.action = new BehaviorSubject([])

        /**預定義的内建行爲：增加一個，刪除一個 */

        this.push$ =
            this.action
            |> filter(
                ([action, ...items]) => action === 'push' && items.length === 1
            )
            |> map(([action, item]) => item)

        this.unshift$ =
            this.action
            |> filter(
                ([action, ...items]) =>
                    action === 'unshift' && items.length === 1
            )
            |> map(([, item]) => item)

        this.pop$ = this.action |> filter(([action]) => action === 'pop')

        this.shift$ = this.action |> filter(([action]) => action === 'shift')

        this.insert$ =
            this.action
            |> filter(
                ([action, start, deleteCount, ...items]) =>
                    action === 'splice' &&
                    deleteCount === 0 &&
                    items.length === 1
            )
            |> map(([, start, , item]) => [item, start])

        this.remove$ =
            this.action
            |> filter(
                ([action, start, deleteCount, ...newItems]) =>
                    action === 'splice' &&
                    deleteCount === 1 &&
                    newItems.length === 0
            )
            |> map(([, start]) => start)

        this.replace$ =
            this.action
            |> filter(
                ([action, start, deleteCount, ...newItems]) =>
                    action === 'splice' &&
                    deleteCount === 1 &&
                    newItems.length === 1
            )
            |> map(([, start, , item]) => [item, start])
    }

    pop() {
        let last = super.pop()
        this.action.next(['pop'])
    }

    push(...elements) {
        super.push(...elements)
        this.action.next(['push', ...elements])
    }

    shift() {
        let first = super.shift()
        this.action.next(['shift'])
    }

    unshift(...elements) {
        super.unshift(...elements)
        this.action.next(['unshift', ...elements])
    }

    splice(start, deleteCount, ...newItems) {
        let args = Array.from(arguments)
        super.splice(...args)
        this.action.next(['splice', ...args])
    }

    //copyWithin(target, start, end) {
    //    super.copyWithin
    //    return this.mutate('copyWithin', ...Array.from(arguments))
    //}
    //fill(value, start, end) {
    //    return this.mutate('fill', ...Array.from(arguments))
    //}
    //reverse() {
    //    return this.mutate('reverse')
    //}
    //sort() {
    //    return this.mutate('sort')
    //}
}
