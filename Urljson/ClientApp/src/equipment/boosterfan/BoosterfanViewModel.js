import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { MotorViewModel } from '../motor'
import { WorkConditionViewModel } from './WorkConditionViewModel'

export class BoosterfanViewModel {
    constructor() {
        this.p0 = new BehaviorSubject(0)
        this.pin = new BehaviorSubject(0)
        this.efficiency = new BehaviorSubject(0)

        this.bmcr = new WorkConditionViewModel()
        this.tb = new WorkConditionViewModel()

        //入口绝对压力
        let p0in =
            combineLatest(this.p0, this.pin) |> map(([p0, pin]) => p0 + pin)

        this.bmcr.bindingFlow(p0in)
        this.bmcr.bindingAxial(this.efficiency)

        this.bmcr.pressure
            |> map(bmcr => 1.2 * bmcr)
            |> (o => o.subscribe(this.tb.pressure))

        this.bmcr.temperature
            |> map(bmcr => bmcr + 10)
            |> (o => o.subscribe(this.tb.temperature))

        this.bmcr.stdflow
            |> map(bmcr => 1.1 * bmcr)
            |> (o => o.subscribe(this.tb.stdflow))

        this.tb.bindingFlow(p0in)
        this.tb.bindingAxial(this.efficiency)

        this.motor = new MotorViewModel()

        this.tb.axial.subscribe(this.motor.axialpower)
    }

    pickeys() {
        return ['p0', 'pin', 'efficiency', 'bmcr']
    }
}
