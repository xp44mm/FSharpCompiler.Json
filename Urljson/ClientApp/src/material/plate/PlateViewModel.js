import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { Shape } from './shape'

export class PlateViewModel {
    constructor() {
        this.wall = new BehaviorSubject(6)
        this.shape = new Shape()

        //kg
        this.weight =
            combineLatest(this.shape.areaM2, this.wall)
            |> map(([a, w]) => 7.85 * a * w)

        this.description =
            combineLatest(this.shape.dimension, this.wall)
            |> map(([shape, wall]) => `δ${wall};${shape}`)

        this.measure = this.shape.measure
    }
}
