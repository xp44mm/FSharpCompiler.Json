import { BehaviorSubject, combineLatest,of } from 'rxjs'
import { map } from 'rxjs/operators'

export class Trap {
    constructor() {
        this.top = new BehaviorSubject(0)
        this.bottom = new BehaviorSubject(0)
        this.height = new BehaviorSubject(0)

        this.area =
            combineLatest(this.top, this.bottom, this.height)
            |> map(([top, bottom, height]) => (top + bottom) * height / 2)

        this.unit = of('mm2')

        this.dimension =
            combineLatest(this.top, this.bottom, this.height)
            |> map(([top, bottom, height]) => top + '/' + bottom + '×' + height)

        this.measure = of('')
    }
}
