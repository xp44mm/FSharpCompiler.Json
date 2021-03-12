import { span, option, td } from '../../hyperscript'
import { numberbox, select } from '../../hyperscript/form'
import { PlateViewModel } from './PlateViewModel'
import { shapes } from './shape'
import { shapeTpl } from './shapeTpl'

export const plateInput = (model = new PlateViewModel()) =>
    td(
        numberbox({ size: 8, number: model.wall }),
        span(
            select(
                { value: model.shape.kind },
                Object.entries(shapes).map(([value, text]) =>
                    option({ value, text })
                )
            ),
            shapeTpl(model.shape)
        )
    )
