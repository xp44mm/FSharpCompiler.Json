import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from 'rxjs/operators';
import { RibSectionViewModel } from "./RibSectionViewModel";
import { WallLoadViewModel } from "./WallLoadViewModel";

export class PinnedWallViewModel extends RibSectionViewModel {
    constructor() {
        super()
        this.plateFrequency = new BehaviorSubject(0)
        this.ribFrequency = new BehaviorSubject(0)
        this.stable = new BehaviorSubject(0)

        this.vaccum = new WallLoadViewModel()
        this.barotropy = new WallLoadViewModel()

    }
}

export class WallViewModel extends PinnedWallViewModel {
    constructor() {
        super()
        this.rigid = new BehaviorSubject(0)
        this.beta = new BehaviorSubject(0)
    }
}
