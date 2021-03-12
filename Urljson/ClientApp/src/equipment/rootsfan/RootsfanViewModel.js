import { BehaviorSubject, combineLatest } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'

export class RootsfanViewModel {
    constructor() {
        this.flow = new BehaviorSubject(44)
        this.pressure = new BehaviorSubject(98)

        this.motor =
            combineLatest(this.flow, this.pressure)
            |> mergeMap(([flow, pressure]) =>
                httpGetJson(
                    'equipment/rootsfan?' + jzonQueryData({ flow, pressure })
                )
            )
    }
}
