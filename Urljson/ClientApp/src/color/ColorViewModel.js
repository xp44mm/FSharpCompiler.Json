import { BehaviorSubject } from 'rxjs'

export class ColorViewModel {
    constructor() {
        this.hex = new BehaviorSubject("000000")
        this.red = new BehaviorSubject(0)
        this.green = new BehaviorSubject(0)
        this.blue = new BehaviorSubject(0)
    }
}

