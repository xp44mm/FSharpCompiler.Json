import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

function fanIncrTemperature(p1, p2, t1) {
    let k1 = t1 + 273.15
    let k2 = k1 * Math.pow(p2 / p1, 0.286)
    return k2 - k1
}

export class BoosterViewModel {
    constructor() {
        this.p0 = new BehaviorSubject(0)
        this.p1 = new BehaviorSubject(0)
        this.t1 = new BehaviorSubject(0)
        this.dp = new BehaviorSubject(0)

        this.p2 = combineLatest(this.dp, this.p1) |> map(([dp, p1]) => dp + p1)

        this.t2 =
            combineLatest(this.p0, this.p1, this.p2, this.t1)
            |> map(([p0, p1, p2, t1]) => {
                let pa1 = p0 + p1
                let pa2 = p0 + p2
                return fanIncrTemperature(pa1, pa2, t1) + t1
            })
    }
}
