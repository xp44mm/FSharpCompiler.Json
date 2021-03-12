import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class GypsumHouseViewModel {
    constructor() {
        this.gypsumWeight = new BehaviorSubject(200)
        this.density = new BehaviorSubject(1.2)
        this.houseWidth = new BehaviorSubject(16)
        this.beltQuantity = new BehaviorSubject(2)

        this.volume =
            combineLatest(this.gypsumWeight, this.density)
            |> map(([gypsumWeight, density]) => gypsumWeight / density)

        this.heapHeight =
            combineLatest(this.houseWidth, this.beltQuantity)
            |> map(
                ([houseWidth, beltQuantity]) => 0.6 * houseWidth / beltQuantity
            )

        this.houseLength =
            combineLatest(this.volume, this.houseWidth, this.heapHeight)
            |> map(
                ([volume, houseWidth, heapHeight]) =>
                    volume / houseWidth / heapHeight
            )
    }

    pickeys() {
        return ['gypsumWeight', 'density', 'houseWidth', 'beltQuantity']
    }
}
