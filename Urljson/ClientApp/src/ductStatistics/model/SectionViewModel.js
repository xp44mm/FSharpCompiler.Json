import { ShapeViewModel } from '../../shapes'


/** 柱體的截面 */
export class SectionViewModel {
    constructor() {
        this.shape = new ShapeViewModel()
        this.surface = this.shape.area
        this.dimension = this.shape.dimension

    }
}
