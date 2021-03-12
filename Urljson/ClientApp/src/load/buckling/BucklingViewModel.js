import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'

//压杆长度系数
let coeffs = { ff: 2, fp: 0.7, pp: 1 }

export class BucklingViewModel {
    constructor() {
        this.connection = new BehaviorSubject('ff')
        this.length = new BehaviorSubject(2)
        this.area = new BehaviorSubject(6.93)
        this.moment = new BehaviorSubject(26)

        this.coeff = this.connection |> map(c => coeffs[c])

        this.radius =
            combineLatest(this.moment, this.area)
            |> map(([moment, area]) => Math.sqrt(moment / area))

        this.ratio =
            combineLatest(this.coeff, this.length, this.radius)
            |> map(([coeff, length, radius]) => coeff * length / radius * 100)

        this.stable =
            this.ratio
            |> mergeMap(ratio =>
                httpGetJson('load/buckling?' + jzonQueryData({ ratio }))
            )
    }
}
