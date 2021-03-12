import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class BuoyantViewModel {
    constructor() {
        this.depth = new BehaviorSubject(10)
        this.density = new BehaviorSubject(1000)

        this.buoyant =
            combineLatest(this.depth, this.density)
            |> map(([depth, density]) => 9.80665 * depth * density / 1000)
    }
}
