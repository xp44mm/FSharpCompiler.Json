import { BehaviorSubject } from 'rxjs'

export class MiterElbowViewModel {
    constructor() {
        this.input = new InputViewModel()
        this.result = new ResultViewModel()
    }
}

class InputViewModel {
    constructor() {
        this.diameter = new BehaviorSubject(0)
        this.radius = new BehaviorSubject(0)
        this.angle = new BehaviorSubject(90)
    }
}

class ResultViewModel {
    constructor() {
        this.diameter = new BehaviorSubject('')
        this.radius = new BehaviorSubject('')
        this.angle = new BehaviorSubject('')

        this.area = new BehaviorSubject('')
        this.zeta = new BehaviorSubject('')
        this.weld = new BehaviorSubject('')
    }
}
