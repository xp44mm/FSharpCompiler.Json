import { BehaviorSubject } from "rxjs";

let inputs = ['H2O', 'O2', 'N2', 'CO2', 'SO2', 'SO3', 'HCl', 'HF', 'ash', 'pressureg']

export class TerminalViewModel {
    constructor() {
        this.H2O = new BehaviorSubject(0)
        this.O2 = new BehaviorSubject(0)
        this.N2 = new BehaviorSubject(0)
        this.CO2 = new BehaviorSubject(0)
        this.SO2 = new BehaviorSubject(0)
        this.SO3 = new BehaviorSubject(0)
        this.HCl = new BehaviorSubject(0)
        this.HF = new BehaviorSubject(0)
        this.ash = new BehaviorSubject(0)

        this.temperature = new BehaviorSubject(0)
        this.pressureg = new BehaviorSubject(0)
    }
    pickeys() {
        return inputs
    }

}
