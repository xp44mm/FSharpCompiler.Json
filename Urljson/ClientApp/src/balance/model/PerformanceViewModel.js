import { BehaviorSubject } from "rxjs";

let inputs = ['margin']

export class PerformanceViewModel {
    constructor() {
        this.margin = new BehaviorSubject(0)
        this.risk = new BehaviorSubject('')
        this.rtu = { //rtu 结果值
            margin: new BehaviorSubject(1),
            base: new BehaviorSubject(1),
            sr: new BehaviorSubject(1),
            grind: new BehaviorSubject(1),
            SO2: new BehaviorSubject(1),
            solids: new BehaviorSubject(1),
            nozzle: new BehaviorSubject(1),
            pH: new BehaviorSubject(1),
            velocity: new BehaviorSubject(1),
            lg: new BehaviorSubject(1),
            dp: new BehaviorSubject(1),
            Cl: new BehaviorSubject(1),
            quench: new BehaviorSubject(1),
            acid: new BehaviorSubject(1),
        }

        this.ntu = new BehaviorSubject(0)
        this.efficiency = new BehaviorSubject(0)

    }
    pickeys() {
        return inputs
    }

}
