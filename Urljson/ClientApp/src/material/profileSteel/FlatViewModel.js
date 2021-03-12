import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class FlatViewModel {
    constructor() {
        this.w = new BehaviorSubject(0)
        this.t = new BehaviorSubject(0)

        //每米重量
        this.weight = 
            combineLatest(this.w, this.t) |> map(([w, t]) => 7.85e-3 * w * t)

        this.specification = 
            combineLatest(this.w, this.t) |> map(([w, t]) => 'FB' + w + '×' + t)
    }
}
