import { BehaviorSubject } from "rxjs";

export class GasViewModel {
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

        //d:dry,n:standard
        this.temperature = new BehaviorSubject(0)
        this.pressureg = new BehaviorSubject(0)
        this.pressure = new BehaviorSubject(0)

        this.dnvolume = new BehaviorSubject(0)
        this.nvolume = new BehaviorSubject(0)
        this.dvolume = new BehaviorSubject(0)
        this.volume = new BehaviorSubject(0)
    }
}

export class GasQualityViewModel {
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
    }
}
