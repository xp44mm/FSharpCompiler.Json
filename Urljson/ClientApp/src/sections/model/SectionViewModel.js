import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

export class CircleViewModel {
    constructor() {
        this.diameter = new BehaviorSubject(0)
        this.area = this.diameter |> map(d => Math.PI / 4 * d ** 2)
        this.dimension = this.diameter
            |> map(d => `φ${d}`)

    }
}

export class RectangleViewModel {
    constructor() {
        this.width = new BehaviorSubject(0)
        this.height = new BehaviorSubject(0)
        this.area =
            combineLatest(this.width, this.height)
            |> map(([w, h]) => w * h)

        this.dimension = combineLatest(this.width, this.height)
            |> map(([w, h]) => `${w}×${h}`)
    }
}

export class ShapeViewModel {
    constructor() {
        this.rectangle = new RectangleViewModel()
        this.circle = new CircleViewModel()
        this.kind = new BehaviorSubject('circle') //: 'rectangle' | 'circle'

        this.area =
            this.kind
            |> mergeMap(kind => this[kind].area)

        this.dimension = 
            this.kind
            |> mergeMap(k => this[k].dimension)

    }


}

export class SectionViewModel
    extends ShapeViewModel {
    constructor() {
        super()
        this.name = new BehaviorSubject('管道')
        this.volume = new BehaviorSubject(0)

        //流速
        this.velocity =
            combineLatest(
                this.volume,
                this.area |> map(a => a * 1e-6)  //mm2 -> m2
            )
            |> map(([volume, area]) => volume / 3600 / area)
    }

    pickeys() {
        return ['name', 'volume', 'kind', this.kind.value]
    }

}
