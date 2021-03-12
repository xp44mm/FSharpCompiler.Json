import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { PlateViewModel } from './plate/PlateViewModel'
import { ProfileSteelViewModel } from './profileSteel/ProfileSteelViewModel'

export const partKinds = { plate: '板', profileSteel: '型钢' }

export class PartViewModel {
    constructor(
        plate = new PlateViewModel(),
        profileSteel = new ProfileSteelViewModel()
    ) {
        this.plate = plate
        this.profileSteel = profileSteel
        this.kind = new BehaviorSubject('plate')

        this.quantity = new BehaviorSubject(1)

        this.weight = this.kind |> mergeMap(kind => this[kind].weight)

        this.description = this.kind |> mergeMap(kind => this[kind].description)

        this.measure = this.kind |> mergeMap(kind => this[kind].measure)

        this.total =
            combineLatest(this.weight, this.quantity)
            |> map(([weight, quantity]) => weight * quantity)

    }

    pickeys() {
        return ['kind', this.kind.value]
    }
}
