import { BehaviorSubject } from 'rxjs'
import { ShapeViewModel } from '../../shapes'

export class ReducerViewModel {
    constructor() {
        this.input = new InputViewModel()
        this.result = new ResultViewModel()
    }
}

export class InputViewModel {
    constructor() {
        this.sinlet = new ShapeViewModel()
        this.soutlet = new ShapeViewModel()
        this.angle = new BehaviorSubject(0)
    }
}

export class ResultViewModel {
    constructor() {
        this.sinlet = new BehaviorSubject('')
        this.soutlet = new BehaviorSubject('')
        this.angle = new BehaviorSubject('')
        this.area = new BehaviorSubject('')
        this.zeta = new BehaviorSubject('')
    }
}
