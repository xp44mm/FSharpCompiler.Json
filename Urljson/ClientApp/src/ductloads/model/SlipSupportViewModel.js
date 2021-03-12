import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { cos, sin } from '../trigonometry'

export class SlipSupportViewModel {
    constructor(support) {
        this.direction = new BehaviorSubject(0) //固定点到本支架的方向角

        //*四个摩擦力
        this.weightFrictionX =
            combineLatest(support.weight, this.direction)
            |> map(([w, d]) => 0.1 * w * cos(d))

        this.weightFrictionY =
            combineLatest(support.weight, this.direction)
            |> map(([w, d]) => 0.1 * w * sin(d))

        this.ashWeightFrictionX =
            combineLatest(support.ashWeight, this.direction)
            |> map(([w, d]) => 0.1 * w * cos(d))

        this.ashWeightFrictionY =
            combineLatest(support.ashWeight, this.direction)
            |> map(([w, d]) => 0.1 * w * sin(d))
    }

    frictions(support) {

    }
}
