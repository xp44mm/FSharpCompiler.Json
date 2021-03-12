import { BehaviorSubject, combineLatest, of } from 'rxjs'
import { map } from 'rxjs/operators'

export const areaUnits = { m2: 1, mm2: 1e-6, cm2: 1e-4, dm2: 1e-2 }

export class AreaShape {
    constructor() {
        this.area = new BehaviorSubject(0)
        this.unit = new BehaviorSubject('m2')

        this.dimension =
            combineLatest(this.area, this.unit)
            |> map(([area, unit]) => 'A=' + area + unit)

        this.measure = of('')
    }
}

export class UnitShape {
    constructor() {
        this.area = of(1)
        this.unit = new BehaviorSubject('m2')
        this.dimension = of('')
        this.measure = this.unit
    }

}
