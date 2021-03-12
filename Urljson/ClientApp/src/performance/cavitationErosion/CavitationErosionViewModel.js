import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class CavitationErosionViewModel {
    constructor() {
        this.margin = new BehaviorSubject(2.3)
        //this.pressure = new BehaviorSubject(1.25)
        //this.temperature = new BehaviorSubject(190)

        //根据液体的温度和压力得到密度
        this.density = new BehaviorSubject(860)

        this.depth =
            combineLatest(this.margin, this.density)
            |> map(
                ([margin, density]) => (margin + 0.24 + 0.5) / (density / 1000)
            )
    }
}
