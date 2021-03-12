import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { MotorViewModel } from '../motor'

export class FanViewModel {
    constructor() {
        this.flow = new BehaviorSubject(3)
        this.pressure = new BehaviorSubject(7)
        this.efficiency = new BehaviorSubject(85)

        this.motor = new MotorViewModel()

        combineLatest(this.efficiency, this.flow, this.pressure)
            |> map(([eff, flow, pressure]) => flow * pressure / eff * 100)
            |> (o=>o.subscribe(this.motor.axialpower))
    }
    pickeys() {
        return ['flow', 'pressure', 'efficiency']
    }
}
