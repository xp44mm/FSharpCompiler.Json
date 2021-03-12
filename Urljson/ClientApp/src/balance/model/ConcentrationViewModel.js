import { BehaviorSubject } from 'rxjs'

// EffectViewModel
export class ConcentrationViewModel {
    constructor() {
        this.SO2 = new BehaviorSubject(0)
        this.SO3 = new BehaviorSubject(0)
        this.HCl = new BehaviorSubject(0)
        this.HF = new BehaviorSubject(0)
        this.ash = new BehaviorSubject(0)
    }
}
