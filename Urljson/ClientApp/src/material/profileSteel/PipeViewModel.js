import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class PipeViewModel {
    constructor() {
        this.dw = new BehaviorSubject(0)
        this.t = new BehaviorSubject(0)

        //每米重量
        this.weight =
            combineLatest(this.dw, this.t)
            |> map(([dw, t]) => 7.85e-3 * Math.PI * (dw - t) * t)

        this.specification =
            combineLatest(this.dw, this.t)
            |> map(([dw, t]) => 'φ' + dw + '×' + t)
    }
}
