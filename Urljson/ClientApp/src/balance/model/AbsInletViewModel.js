import { BehaviorSubject } from 'rxjs'
import { GasViewModel } from './GasViewModel'

export class AbsInletViewModel extends GasViewModel {
    constructor() {
        super()
        this.velocity = new BehaviorSubject(0)
        this.ppmSO2 = new BehaviorSubject(0)
        this.pressureDrop = new BehaviorSubject(0)
    }
    pickeys() {
        return ['velocity']
    }
}
