import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { BearingViewModel } from './BearingViewModel'
import { SlipSupportViewModel } from './SlipSupportViewModel'

export class SupportViewModel extends BearingViewModel {
    constructor(cluster) {
        super()
        this.isFixed = new BehaviorSubject(false) 
        this.slip = new SlipSupportViewModel(this)

        let obj$ = this.isFixed |> map(fixed => (fixed ? cluster : this.slip))

        this.weightFrictionX = obj$ |> switchMap(obj => obj.weightFrictionX)

        this.weightFrictionY = obj$ |> switchMap(obj => obj.weightFrictionY)

        this.ashWeightFrictionX =
            obj$ |> switchMap(obj => obj.ashWeightFrictionX)

        this.ashWeightFrictionY =
            obj$ |> switchMap(obj => obj.ashWeightFrictionY)
    }

    pickeys() {
        let res = ['isFixed', ...super.pickeys()]
        if (!this.isFixed.value) {
            res.push('slip')
        }
        return res
    }
}
