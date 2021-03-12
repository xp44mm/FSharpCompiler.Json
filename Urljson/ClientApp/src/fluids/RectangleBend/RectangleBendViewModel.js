import { BehaviorSubject } from 'rxjs'

export class RectangleBendViewModel {
    constructor() {
        this.input = new InputViewModel()
        this.result = new ResultViewModel()
    }
}

export class InputViewModel {
    constructor() {
        this.widthInlet = new BehaviorSubject(0)
        this.widthOutlet = new BehaviorSubject(0)
        this.height = new BehaviorSubject(0)
        this.radius = new BehaviorSubject(0)
        this.angle = new BehaviorSubject(0)
    }
}

export class ResultViewModel {
    constructor() {
        this.widthInlet = new BehaviorSubject('')
        this.widthOutlet = new BehaviorSubject('')
        this.height = new BehaviorSubject('')
        this.radius = new BehaviorSubject('')
        this.angle = new BehaviorSubject('')

        this.area = new BehaviorSubject('')
        this.zeta = new BehaviorSubject('')

    }
}
