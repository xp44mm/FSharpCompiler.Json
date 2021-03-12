import { ObservableArray } from '../../deep'
import { ShapeViewModel } from './ShapeViewModel'

export class ShapeListViewModel {
    constructor(shapes = new ObservableArray()) {
        this.shapes = shapes
        this.shapes.create = this.push.bind(this)
    }

    push() {
        let shape = new ShapeViewModel()
        this.shapes.push(shape)
    }

    remove(shape) {
        let i = this.shapes.indexOf(shape)
        if (i > -1) {
            this.shapes.splice(i, 1)
        }
    }
}
