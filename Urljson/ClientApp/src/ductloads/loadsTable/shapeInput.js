import { option } from '../../hyperscript'
import { choice } from '../../hyperscript/component'
import { numberbox, select } from '../../hyperscript/form'
import {
    CircleViewModel,
    RectangleViewModel,
    ShapeViewModel
} from '../../shapes'


let shapes = { 方: 'rectangle', 圆: 'circle' }

export const shapeInput = (model = new ShapeViewModel()) => {
    let rectangle = model.rectangle
    let circle = model.circle

    let options = Object.entries(shapes).map(([text, value]) =>
        option({ text, value })
    )

    return [
        select({ value: model.kind }, options),

        ...choice(model.kind, {
            rectangle: rectangleFragment(model.rectangle),
            circle: circleFragment(model.circle),
        }),
    ]
}

function rectangleFragment(rectangle = new RectangleViewModel()) {
    return [
        numberbox({
            number: rectangle.width,
            size: 10,
        }),
        numberbox({
            number: rectangle.height,
            size: 10,
        }),
    ]
}

function circleFragment(circle = new CircleViewModel()) {
    return numberbox({
        number: circle.diameter,
        size: 10,
    })
}
