import { BehaviorSubject } from "rxjs";

export class RemovalViewModel {
    constructor() {
        this.H2O = new BehaviorSubject(0)
        this.O2 = new BehaviorSubject(0)
        this.N2 = new BehaviorSubject(0)
        this.CO2 = new BehaviorSubject(0)
        this.SO2 = new BehaviorSubject(0)
        this.SO3 = new BehaviorSubject(0)
        this.HCl = new BehaviorSubject(0)
        this.HF = new BehaviorSubject(0)
        this.ash = new BehaviorSubject(0)
        this.heat = new BehaviorSubject(0)
    }
}
