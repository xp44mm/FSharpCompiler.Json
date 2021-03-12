import { span } from '../../hyperscript'
import {  numberbox } from '../../hyperscript/form'

import { PipeViewModel } from './PipeViewModel'

export const pipeInput = (props = {},
model = new PipeViewModel()) =>
    span(
        props,
        numberbox({ size: 8, placeholder: 'dw(mm)', number: model.dw }),
        '×',
        numberbox({ size: 5, placeholder: 't(mm)', number: model.t })
    )
