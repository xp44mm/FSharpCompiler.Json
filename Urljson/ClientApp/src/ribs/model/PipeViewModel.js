import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { PipeLoadViewModel } from './PipeLoadViewModel'

export class PipeSectionViewModel {
    constructor() {
        this.dw = new BehaviorSubject(0)
        this.t = new BehaviorSubject(0)

        //内径,mm
        this.di =
            combineLatest(this.dw, this.t)
            |> map(([dw, t]) => dw - 2 * t)

        //管子截面积，cm2
        this.area =
            combineLatest(this.dw, this.di)
            |> map(([dw, di]) => Math.PI * (dw ** 2 - di ** 2) / 4 / 100)

        //管子惯性矩，cm4
        this.i =
            combineLatest(this.dw, this.di)
            |> map(([dw, di]) => Math.PI * (dw ** 4 - di ** 4) / 64 / 10000)
    }
}

export class PipeViewModel extends PipeSectionViewModel {
    constructor() {
        super()

        this.length = new BehaviorSubject(0)

        //长细比，无量纲
        this.lambda =
            combineLatest(this.length, this.area, this.i)
            |> map(([len, area, i]) => 0.1 * len * (area / i) ** 0.5)

        this.stable = new BehaviorSubject(0)

        //受力面积, m2
        this.wallArea = new BehaviorSubject(0)

    }

    pickeys() {
        return ['dw', 't']
    }

}
