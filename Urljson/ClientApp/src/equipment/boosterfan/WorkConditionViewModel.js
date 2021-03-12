import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

function pcorrect(p) {
    return 101325 / 1000 / Number(p)
}

function tcorrect(t) {
    return (Number(t) + 273.15) / 273.15
}

//工况：
export class WorkConditionViewModel {
    constructor() {
        //压力增
        this.pressure = new BehaviorSubject(0)
        this.temperature = new BehaviorSubject(0)
        this.stdflow = new BehaviorSubject(0)
        this.flow = new BehaviorSubject()
        this.axial = new BehaviorSubject()
    }

    pickeys() {
        return ['pressure', 'temperature', 'stdflow']
    }

    bindingFlow = p0in => {
        return (
            combineLatest(p0in, this.temperature, this.stdflow)
            |> map(([pin, t, sf]) => {
                var pc = pcorrect(pin)
                var tc = tcorrect(t)
                return sf * pc * tc
            })
            |> (o=>o.subscribe(this.flow))
        )
    }

    bindingAxial = eff => {
        return (
            combineLatest(eff, this.flow, this.pressure)
            |> map(([eff, flow, pressure]) => flow * pressure / eff * 100)
            |> (o=>o.subscribe(this.axial))
        )
    }
}
