import { BehaviorSubject, Subject } from "rxjs";
import { GasViewModel } from "./GasViewModel";

export class OxiairViewModel {
    constructor() {
        this.feed = new GasViewModel()
        this.compress = new GasViewModel()
        this.satur = new GasViewModel()
        this.ratioSO = new BehaviorSubject(0)

        //覆盖类自带的方法
        this.feed.pickeys = () => ['O2']
        this.compress.pickeys = () => ['pressureg']
    }

    pickeys() {
        return ['feed', 'compress', ]
    }

}
