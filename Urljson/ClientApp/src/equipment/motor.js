import { BehaviorSubject, combineLatest } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../http'

export class MotorViewModel {
    constructor() {
        //轴功率
        this.axialpower = new BehaviorSubject(0)

        //电机功率
        this.power = new BehaviorSubject(0)

        this.axialpower
            |> filter(x => x)
            |> mergeMap(axialpower =>
                httpGetJson('equipment/motor?' + jzonQueryData({ axialpower }))
            )
            |> (o=>o.subscribe(this.power))

        this.motorMargin =
            combineLatest(this.power, this.axialpower)
            |> map(([motor, axial]) => (motor / axial - 1) * 100)
    }

    pickeys() {
        return ['axialpower']
    }
}
