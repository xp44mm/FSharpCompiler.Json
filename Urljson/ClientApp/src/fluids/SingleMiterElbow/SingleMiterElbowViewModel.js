import { BehaviorSubject } from "rxjs";

export class SingleMiterElbowViewModel {
    constructor() {
        this.input = new InputViewModel()
        this.result = new ResultViewModel()
    }
}

export class InputViewModel {
    constructor() {
        this.diameter = new BehaviorSubject(100)
        this.angle = new BehaviorSubject(90)
    }
}

export class ResultViewModel {
    constructor() {
        this.diameter = new BehaviorSubject('')
        this.angle = new BehaviorSubject('')

        this.area = new BehaviorSubject('')
        this.zeta = new BehaviorSubject('')

    }
}
