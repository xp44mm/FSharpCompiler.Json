import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { FlatViewModel } from './FlatViewModel'
import { LengthUnion } from './LengthUnion'
import { PipeViewModel } from './PipeViewModel'
import { ShapeSteelViewModel } from './ShapeSteelViewModel'

export const profileSteelKinds = {
    shapeSteel: '型钢',
    pipe: '管子',
    flat: '扁钢',
}

export class ProfileSteelViewModel {
    constructor(
        shapeSteel = new ShapeSteelViewModel(),
        pipe = new PipeViewModel(),
        flat = new FlatViewModel(),
        lengthUnion = new LengthUnion()
    ) {
        this.shapeSteel = shapeSteel
        this.pipe = pipe
        this.flat = flat

        this.lengthUnion = lengthUnion

        this.kind = new BehaviorSubject('shapeSteel')


        //每米重量
        this.mWeight = this.kind |> mergeMap(kind => this[kind].weight)

        this.weight =
            combineLatest(this.mWeight, this.lengthUnion.meterValue)
            |> map(([w, l]) => w * l)

        let section = this.kind |> mergeMap(kind => this[kind].specification)

        this.description =
            combineLatest(section, this.lengthUnion.description)
            |> map(([section, lens]) => section + ';' + lens)

        this.measure = this.lengthUnion.measure
    }

    pickeys() {
        return ['kind', this.kind.value, 'lengthUnion']
    }

}
