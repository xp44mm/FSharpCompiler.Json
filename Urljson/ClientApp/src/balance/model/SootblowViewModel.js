import { BehaviorSubject } from "rxjs";
import { GasViewModel } from "./GasViewModel";

let inputs = ['pressureg', 'total']

export class SootblowViewModel extends GasViewModel {
    constructor() {
        super()
        this.total = new BehaviorSubject(0)
    }
    pickeys() {
        return inputs
    }

}
