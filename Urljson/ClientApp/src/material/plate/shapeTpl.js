import { span } from '../../hyperscript'
import { choice } from '../../hyperscript/component'
import {
    areaShapeInput,
    circleInput,
    rectangleInput,
    trapInput,
    unitShapeInput,
} from './rectangleInput'
import { Shape } from './shape'

export const shapeTpl = (shape = new Shape()) => {
    return span(
        ...choice(shape.kind, {
            rectangle: rectangleInput(shape.rectangle),
            circle: circleInput(shape.circle),
            trap: trapInput(shape.trap),
            areaShape: areaShapeInput(shape.areaShape),
            unitShape: unitShapeInput(shape.unitShape),
        })
    )
}
