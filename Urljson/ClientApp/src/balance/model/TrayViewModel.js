import { BehaviorSubject } from "rxjs";

let inputs = ['openArea']

export class TrayViewModel {
    constructor() {
        this.openArea = new BehaviorSubject(0);

        this.maxVel = new BehaviorSubject(0);
        this.pressureDrop = new BehaviorSubject(0);

        this.stdPressureDrop = new BehaviorSubject(0);

        this.velocity = new BehaviorSubject(0);

        this.ng = new BehaviorSubject(0);
    }
    pickeys() {
        return inputs
    }

}
