import { BehaviorSubject } from "rxjs";

export class PipeLoadViewModel {
    constructor() {
        this.load = new BehaviorSubject(0)
        this.force = new BehaviorSubject(0)
        this.stress = new BehaviorSubject(0)
    }
}
