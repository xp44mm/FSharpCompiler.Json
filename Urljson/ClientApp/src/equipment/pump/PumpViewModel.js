import { BehaviorSubject, combineLatest } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { MotorViewModel } from '../motor'

export class PumpViewModel {
    constructor() {
        this.flow = new BehaviorSubject(20)
        this.head = new BehaviorSubject(50)
        this.density = new BehaviorSubject(1)
        this.efficiency = new BehaviorSubject(80)

        this.guessEff =
            this.flow
            |> filter(f => f)
            |> mergeMap(flow =>
                httpGetJson('equipment/pumpEff?' + jzonQueryData({ flow }))
            )

        this.motor = new MotorViewModel()

        combineLatest(this.flow, this.head, this.density, this.efficiency)
            |> map(
                ([flow, head, density, efficiency]) =>
                    9.80665 * (flow / 3600) * head * density / efficiency * 100
            )
            |> (o=>o.subscribe(this.motor.axialpower))
    }

    pickeys() {
        return ['flow', 'head', 'density', 'efficiency']
    }
}
