import { BehaviorSubject } from "rxjs";

export const zeroAir = {
    H2O: 0,
    O2: 0,
    N2: 0,
}

export class AirViewModel {
    constructor() {
        this.H2O = new BehaviorSubject(0)
        this.O2 = new BehaviorSubject(0)
        this.N2 = new BehaviorSubject(0)
    }
}
