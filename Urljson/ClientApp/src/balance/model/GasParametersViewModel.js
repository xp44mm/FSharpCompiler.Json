import { BehaviorSubject } from 'rxjs'
import { ConcentrationViewModel } from './ConcentrationViewModel'

export class GasParametersViewModel {
    constructor() {
        this.temperature = new BehaviorSubject(0)
        this.pressureg = new BehaviorSubject(0)
        this.pressure = new BehaviorSubject(0)
        this.pcorrect = new BehaviorSubject(0)
        this.tcorrect = new BehaviorSubject(0)
        this.vcorrect = new BehaviorSubject(0)
        this.baseO2 = new BehaviorSubject(0)

        this.concentration = new ConcentrationViewModel()
    }
    pickeys() {
        return ['temperature', 'pressureg', 'baseO2', 'concentration']
    }
}
