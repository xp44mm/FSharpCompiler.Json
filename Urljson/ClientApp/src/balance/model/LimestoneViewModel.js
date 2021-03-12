import { BehaviorSubject } from "rxjs";
import { LiquidViewModel } from "./LiquidViewModel";

export class LimestoneViewModel {
    constructor() {
        this.availableMgCO3 = new BehaviorSubject(70)
        this.CaCO3 = new BehaviorSubject(90)
        this.MgCO3 = new BehaviorSubject(5)
        this.inerts = new BehaviorSubject(0)

        this.stoich = new BehaviorSubject(1.03)
        this.solids = new BehaviorSubject(95)
        this.grind = new BehaviorSubject(90)
        this.slurrySolids = new BehaviorSubject(20)

        this.rtuSr = new BehaviorSubject(-1)
        this.rtuGrind = new BehaviorSubject(-1)

        this.feed = new LiquidViewModel()
        this.slurry = new LiquidViewModel()

    }

    pickeys() {
        return ['availableMgCO3', 'CaCO3', 'MgCO3', 'solids', 'stoich', 'grind', 'slurrySolids']
    }
}
