import { combineLatest, of } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { CircleViewModel as C, RectangleViewModel as R, ShapeViewModel as RC } from '../../shapes'
import { AreaShape, areaUnits, UnitShape } from './AreaShape'
import { Trap } from './trap'

export const shapes = {
    rectangle: '矩形',
    trap: '梯形',
    circle: '圆形',
    areaShape: '按图',
    unitShape: '按量',
}

export class Rectangle extends R {
    constructor() {
        super()
        this.measure = of('')
        this.unit = of('mm2')
    }
}

export class Circle extends C {
    constructor() {
        super()
        this.measure = of('')
        this.unit = of('mm2')
    }
}

export class Shape extends RC {
    constructor(
        rectangle = new Rectangle(),
        circle = new Circle(),
        trap = new Trap(),
        areaShape = new AreaShape(),
        unitShape = new UnitShape()
    ) {
        super(rectangle, circle)
        this.trap = trap
        this.areaShape = areaShape
        this.unitShape = unitShape


        this.unit = this.kind |> mergeMap(kind => this[kind].unit)

        this.valueOfUnit = this.unit |> map(i => areaUnits[i])

        this.areaM2 =
            combineLatest(this.area, this.valueOfUnit) |> map(([a, u]) => a * u)

        this.measure = this.kind |> mergeMap(kind => this[kind].measure)
    }
}
