import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { molars } from '../molars'

export class NH3ViewModel {
    constructor() {
        this.outletNOx = new BehaviorSubject(0)

        this.inletNOx = new BehaviorSubject(0)
        this.volume = new BehaviorSubject(0)

        this.efficiency =
            combineLatest(this.inletNOx, this.outletNOx)
            |> map(([i, o]) => (i - o) / i * 100)

        this.nh3 =
            combineLatest(this.inletNOx, this.outletNOx, this.volume)
            |> map(([i, o, v]) => {
                let NOx = i - o
                let wt = NOx * v * 1e-6
                let kmol = wt / molars.NO2
                let nokmol = 0.95 * kmol
                let no2kmol = 0.05 * kmol
                return (nokmol + 2 * no2kmol) * molars.NH3
            })
    }

    pickeys() {
        return ['outletNOx']
    }
}
