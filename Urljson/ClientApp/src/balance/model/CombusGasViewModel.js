import { BehaviorSubject } from "rxjs";

///烟气
export class CombusGasViewModel {
    constructor() {
        this.H2O = new BehaviorSubject(0)
        this.O2 = new BehaviorSubject(0)
        this.N2 = new BehaviorSubject(0)
        this.CO2 = new BehaviorSubject(0)
        this.SO2 = new BehaviorSubject(0)

        this.dry = new BehaviorSubject(1)
        this.total = new BehaviorSubject(1)
        this.ppmSO2 = new BehaviorSubject(0)
        this.concentrationSO2 = new BehaviorSubject(0)
    }
}

export class CombusGasWithBaseo2ViewModel extends CombusGasViewModel {
    constructor() {
        super()

        this.baseFactor = new BehaviorSubject(0)
        this.base_ppmSO2 = new BehaviorSubject(0)
        this.base_concentrationSO2 = new BehaviorSubject(0)
    }
}
