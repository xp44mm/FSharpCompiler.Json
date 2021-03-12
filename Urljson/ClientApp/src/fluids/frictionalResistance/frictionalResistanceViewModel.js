import { BehaviorSubject } from 'rxjs'

export class FrictionalResistanceViewModel {
    constructor() {
        this.input = new InputViewModel()
        this.result = new ResultViewModel()
    }
}

export class InputViewModel {
    constructor() {
        this.density = new BehaviorSubject(1000)
        this.solids = new BehaviorSubject(0)
        this.flow = new BehaviorSubject(20)
        this.diameter = new BehaviorSubject(100)
    }
}

class ResultViewModel {
    constructor() {
        this.density = new BehaviorSubject('')
        this.solids = new BehaviorSubject('')
        this.flow = new BehaviorSubject('')
        this.diameter = new BehaviorSubject('')

        this.density = new BehaviorSubject('')
        this.solids = new BehaviorSubject('')
        this.flow = new BehaviorSubject('')
        this.diameter = new BehaviorSubject('')
        this.area = new BehaviorSubject('')
        this.delta = new BehaviorSubject('')
        this.dv = new BehaviorSubject('')
        this.kv = new BehaviorSubject('')
        this.veloc = new BehaviorSubject('')
        this.head = new BehaviorSubject('')
        this.re = new BehaviorSubject('')
        this.lambda = new BehaviorSubject('')
    }
}
