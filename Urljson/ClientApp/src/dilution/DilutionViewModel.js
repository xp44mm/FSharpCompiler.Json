import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class DilutionViewModel {
    constructor() {
        this.solute = new BehaviorSubject(0)
        this.concentration = new BehaviorSubject(0)
        this.diConcentration = new BehaviorSubject(0)

        this.liquor =
            combineLatest(this.solute, this.concentration)
            |> map(([sl, conc]) => sl / conc * 100)

        this.diLiquor =
            combineLatest(this.solute, this.diConcentration)
            |> map(([sl, dconc]) => sl / dconc * 100)

        this.water =
            combineLatest(this.diLiquor, this.liquor)
            |> map(([dil, l]) => dil - l)
    }
}
