import { BehaviorSubject } from 'rxjs'


// ConcentrationViewModel => 有害物污染物
export class EffectViewModel {
    constructor() {
        this.SO2 = new BehaviorSubject(0)
        this.SO3 = new BehaviorSubject(0)
        this.HCl = new BehaviorSubject(0)
        this.HF = new BehaviorSubject(0)
        this.ash = new BehaviorSubject(0)
    }
}
