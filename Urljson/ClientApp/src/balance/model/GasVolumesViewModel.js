import { BehaviorSubject, Subject } from 'rxjs'

///烟气各状态体积
export class GasVolumesViewModel {
    constructor() {
        this.dryVolume0 = new BehaviorSubject(0)

        this.volume0 = new BehaviorSubject(0)

        //折算烟气量（干态，基准氧）
        this.baseVolume = new BehaviorSubject(0)

        //实际烟气量
        this.volume = new BehaviorSubject(0)
    }

    pickeys() {
        return ['dryVolume0']
    }
}
