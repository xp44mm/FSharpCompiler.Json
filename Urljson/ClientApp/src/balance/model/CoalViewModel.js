import { BehaviorSubject } from 'rxjs'

///煤收到基质量百分比
export class CoalViewModel {
    constructor() {
        this.C = new BehaviorSubject(0)
        this.H = new BehaviorSubject(0)
        this.O = new BehaviorSubject(0)
        this.N = new BehaviorSubject(0)
        this.S = new BehaviorSubject(0)
        this.H2O = new BehaviorSubject(0)
        this.A = new BehaviorSubject(0) //
    }

    pickeys() {
        return ['C', 'H', 'O', 'N', 'S', 'H2O']
    }
}
