import { BehaviorSubject } from 'rxjs';

export const phs = ['to Absorber', 'to Filtrate Tank']

let inputs = ['solids', 'CaSO4*2H2O', 'CaSO3*(1/2)H2O', 'CaCO3', 'MgSO4', 'MgCO3', 'inerts', 'overflow']

export class PHViewModel {
    constructor() {
        this.solids = new BehaviorSubject(0)

        this['CaSO4*2H2O'] = new BehaviorSubject(0)
        this['CaSO3*(1/2)H2O'] = new BehaviorSubject(0)
        this.CaCO3 = new BehaviorSubject(0)
        this.MgSO4 = new BehaviorSubject(0)
        this.MgCO3 = new BehaviorSubject(0)
        this.inerts = new BehaviorSubject(0)

        this.overflow = new BehaviorSubject(phs[0])
    }
    pickeys() {
        return inputs
    }

}
