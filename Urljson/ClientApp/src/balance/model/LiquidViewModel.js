import { BehaviorSubject } from 'rxjs';

export class LiquidViewModel {
    constructor() {
        this['CaSO4*2H2O'] = new BehaviorSubject(0)
        this['CaSO3*(1/2)H2O'] = new BehaviorSubject(0)
        this.CaCO3 = new BehaviorSubject(0)
        this.MgSO4 = new BehaviorSubject(0)
        this.MgCO3 = new BehaviorSubject(0)
        this.inerts = new BehaviorSubject(0)
        this.ash = new BehaviorSubject(0)
        this.CaF2 = new BehaviorSubject(0)
        this.MgF2 = new BehaviorSubject(0)
        this['Cl-'] = new BehaviorSubject(0)
        this['F-'] = new BehaviorSubject(0)
        this['Mg++'] = new BehaviorSubject(0)
        this['Ca++'] = new BehaviorSubject(0)
        this['SO4--'] = new BehaviorSubject(0)
        this.H2O = new BehaviorSubject(0)

        this.tss = new BehaviorSubject(0)
        this.tds = new BehaviorSubject(0)
        this.fw = new BehaviorSubject(0)
        this.tf = new BehaviorSubject(0)

        this.solids = new BehaviorSubject(0)
        this.concCl = new BehaviorSubject(0)

        this.sgSolution = new BehaviorSubject(0)
        this.sgSolid = new BehaviorSubject(0)
        this.sg = new BehaviorSubject(0)

        this.density = new BehaviorSubject(0)
        this.volume = new BehaviorSubject(0)
    }
}
