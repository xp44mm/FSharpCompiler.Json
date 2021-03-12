import { BehaviorSubject } from "rxjs";

export class NozzleViewModel {
    constructor() {
        this.pressureDrop = new BehaviorSubject(0)
        this.angle = new BehaviorSubject(0)
    }
}
