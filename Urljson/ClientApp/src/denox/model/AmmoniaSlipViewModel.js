import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { molars } from '../molars'

export class AmmoniaSlipViewModel {
    constructor() {
        this.ppmv = new BehaviorSubject(6)
        this.volume = new BehaviorSubject(0)

        this.nh3 =
            combineLatest(this.ppmv, this.volume)
            |> map(([ppm, vol]) => ppm * 1e-6 * vol / 22.414 * molars.NH3)

    }


    //需要保存的成员
    pickeys() {
        return ['ppmv']
    }
}
