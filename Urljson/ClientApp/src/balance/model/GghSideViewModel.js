import { BehaviorSubject } from 'rxjs'

export class GghSideViewModel {
    constructor() {
        this.leakage = new BehaviorSubject(0)
        this.gghPressureDrop = new BehaviorSubject(500)
        this.ductPressureDrop = new BehaviorSubject(200)
        this.pressureDrop = new BehaviorSubject(0)
    }

    pickeys() {
        return ['leakage', 'gghPressureDrop', 'ductPressureDrop']
    }
}
