import { span } from '../../hyperscript'
import {  numberbox } from '../../hyperscript/form'

import { FlatViewModel } from './FlatViewModel'

export const flatInput = (props = {},
model = new FlatViewModel()) =>
    span(
        props,
        numberbox({ size: 8, placeholder: 'w(mm)', number: model.w }),
        '×',
        numberbox({ size: 5, placeholder: 't(mm)', number: model.t })
    )
