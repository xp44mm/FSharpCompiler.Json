import { BehaviorSubject } from "rxjs";

let inputs = ['high', 'isFlare', 'flare', 'flareHeight', 'injectElevation', 'solids', 'concCl']

export class TowerViewModel {
    constructor() {
        this.high = new BehaviorSubject(0)
        this.injectElevation = new BehaviorSubject(0)
        this.isFlare = new BehaviorSubject(true)
        this.flare = new BehaviorSubject(0)
        this.flareHeight = new BehaviorSubject(0)
        this.solids = new BehaviorSubject(0)
        this.concCl = new BehaviorSubject(0)
        this.density = new BehaviorSubject(0)
        this.sgSln = new BehaviorSubject(0)
        this.dll = new BehaviorSubject(0)
        this.slurryVolume = new BehaviorSubject(0)
        this.solidsMass = new BehaviorSubject(0)
        this.minO2 = new BehaviorSubject(0)
        this.injectPressure = new BehaviorSubject(0)

        this.retentionTime = new BehaviorSubject(0)

        this.residenceTime = new BehaviorSubject(0)
        this.pH = new BehaviorSubject(0)

    }
    pickeys() {
        return inputs
    }

}
