import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { PipeLoadViewModel } from './PipeLoadViewModel'

export class WallLoadViewModel {
    constructor() {
        this.pressure = new BehaviorSubject(0)
        this.plate = new BehaviorSubject(0)
        this.rib = new BehaviorSubject(0)
        this.insula = new BehaviorSubject(0)
        this.ash = new BehaviorSubject(0)
        this.snow = new BehaviorSubject(0)
        this.wind = new BehaviorSubject(0)

        //汇总部分
        this.plateLoads =
            combineLatest(this.pressure, this.plate, this.ash)
            |> map(([a, b, c]) => a + b + c)

        //当量荷载
        this.normalLoads =
            combineLatest(
                this.plate,
                this.rib,
                this.insula,
                this.ash,
                this.snow,
                this.wind
            ) |> map(args => args.reduce((a, b) => a + b, 0))

        this.allLoads =
            combineLatest(this.pressure, this.normalLoads)
            |> map(([a, b]) => a + b)

        //检测部分
        this.plateStress = new BehaviorSubject(0)
        this.plateDeflection = new BehaviorSubject(0)

        this.ribStress = new BehaviorSubject(0)
        this.ribDeflection = new BehaviorSubject(0)

        this.assistance = new BehaviorSubject(0)

        this.pipe = new PipeLoadViewModel()
    }

}
