import { BehaviorSubject, combineLatest } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'

export class WindLoadViewModel {
    constructor() {
        this.kind = new BehaviorSubject('B')
        this.elevation = new BehaviorSubject(15)

        this.coefficient =
            combineLatest(this.kind, this.elevation)
            |> mergeMap(([topography, elev]) =>
                httpGetJson(
                    'load/windElevCoeff?' + jzonQueryData({ topography, elev })
                )
            )
    }
}
