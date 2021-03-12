import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { ShapeViewModel } from '../../shapes'
import { circlePerimeterOffset, rectanglePerimeterOffset } from './shapeOffset'

/**柱體的柱面 */
export class TubeViewModel {
    constructor() {
        this.shape = new ShapeViewModel()
        this.length = new BehaviorSubject(0)

        this.surface =
            combineLatest(this.shape.peri, this.length)
            |> map(([peri, length]) => peri * length)

        this.dimension =
            combineLatest(this.shape.dimension, this.length)
            |> map(([shape, len]) => `${shape}; L=${len}`)
    }


    //根据this基准向外偏移ext
    offsetSurface(ext) {
        return (
            this.shape.kind
            |> mergeMap(k => {
                if (k === 'rectangle') {
                    let { width, height } = this.shape.rectangle
                    return rectanglePerimeterOffset(width, height, ext)
                } else {
                    let { diameter } = this.shape.circle
                    return circlePerimeterOffset(diameter, ext)
                }
            })
            |> mergeMap(p => this.length |> map(l => p * l))
        )
    }
}
