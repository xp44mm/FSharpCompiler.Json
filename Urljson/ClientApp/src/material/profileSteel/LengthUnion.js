import { BehaviorSubject, combineLatest, of } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

export const lengthUnits = { m: 1, mm: 1e-3, cm: 0.01, dm: 0.1 }

export class LengthUnion {
    constructor() {
        this.givenLength = new BehaviorSubject(false)
        this.length = new BehaviorSubject(0)
        this.unit = new BehaviorSubject('m')

        this.valueOfLength =
            this.givenLength |> mergeMap(gv => (gv ? this.length : of(1)))

        this.valueOfUnit = this.unit |> map(u => lengthUnits[u])

        //米数
        this.meterValue =
            combineLatest(this.valueOfLength, this.valueOfUnit)
            |> map(([l, u]) => l * u)

        //长度说明
        this.description =
            this.givenLength
            |> mergeMap(
                gv =>
                    gv
                        ? combineLatest(this.length, this.unit)
                          |> map(([length, unit]) => 'L=' + length + unit)
                        : of('')
            )

        this.measure =
            this.givenLength |> mergeMap(gv => (gv ? of('') : this.unit))

    }

    pickeys() {
        return [this.givenLength.value, 'givenLength', 'unit']
    }
}
