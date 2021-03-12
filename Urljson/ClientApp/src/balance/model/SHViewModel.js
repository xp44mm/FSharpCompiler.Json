import { BehaviorSubject } from "rxjs";

export const shs = ["to Absorber", "to Filter Feed Tank"]

let inputs = ['solids', 'CaSO4*2H2O', 'CaSO3*(1/2)H2O', 'CaCO3', 'MgSO4', 'MgCO3', 'inerts', 'underflow']

export class SHViewModel {
    constructor() {
        this.solids = new BehaviorSubject(10)

        this["CaSO4*2H2O"] = new BehaviorSubject(80)
        this["CaSO3*(1/2)H2O"] = new BehaviorSubject(80)
        this.CaCO3 = new BehaviorSubject(80)
        this.MgSO4 = new BehaviorSubject(80)
        this.MgCO3 = new BehaviorSubject(80)
        this.inerts = new BehaviorSubject(80)

        this.underflow = new BehaviorSubject(shs[0])

    }
    pickeys() {
        return inputs
    }

}
