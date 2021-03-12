import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class GasViewModel {
    constructor() {
        this.H2O = new BehaviorSubject(0)
        this.O2 = new BehaviorSubject(0)
        this.N2 = new BehaviorSubject(0)
        this.CO2 = new BehaviorSubject(0)
        this.SO2 = new BehaviorSubject(0)
        this.SO3 = new BehaviorSubject(0)
        this.volume = new BehaviorSubject(0)
        this.O2std = new BehaviorSubject(6)

        this.total =
            combineLatest(
                this.H2O,
                this.O2,
                this.N2,
                this.CO2,
                this.SO2,
                this.SO3
            ) |> map(arr => arr.reduce((x, y) => x + y, 0))

        this.O2indry =
            combineLatest(this.total, this.H2O, this.O2)
            |> map(([tt, w, o]) => o / (tt - w) * 100)

        this.dryVolume =
            combineLatest(this.volume, this.total, this.H2O)
            |> map(([v, tt, w]) => v * (tt - w) / tt)

        this.stdVolume =
            combineLatest(this.O2indry, this.O2std, this.dryVolume)
            |> map(([od, os, dv]) => (21 - od) / (21 - os) * dv)

    }
}
