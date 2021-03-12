import { BehaviorSubject } from 'rxjs'
import { numberbox } from '..'

export const numberboxTest = () => {
    let number = new BehaviorSubject(0)
    number.subscribe(console.log)
    let elem = numberbox({ number })
    return elem
}

