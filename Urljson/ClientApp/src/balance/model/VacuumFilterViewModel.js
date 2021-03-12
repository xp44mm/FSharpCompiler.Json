import { BehaviorSubject } from 'rxjs';

let inputs = ['solids', 'concCl', 'CaSO4*2H2O', 'CaSO3*(1/2)H2O', 'CaCO3', 'MgSO4', 'MgCO3', 'inerts', 'ash', 'CaF2', 'MgF2']

export class VacuumFilterViewModel {
    constructor() {
        this.solids = new BehaviorSubject(0)
        this.concCl = new BehaviorSubject(0)

        this['CaSO4*2H2O'] = new BehaviorSubject(0)
        this['CaSO3*(1/2)H2O'] = new BehaviorSubject(0)
        this.CaCO3 = new BehaviorSubject(0)
        this.MgSO4 = new BehaviorSubject(0)
        this.MgCO3 = new BehaviorSubject(0)
        this.inerts = new BehaviorSubject(0)

        this.ash = new BehaviorSubject(0)
        this.CaF2 = new BehaviorSubject(0)
        this.MgF2 = new BehaviorSubject(0)
    }

    pickeys() {
        return inputs
    }
}
