import { td } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'

import { ExpansionViewModel } from '../model/ExpansionViewModel'
import { shapeInput } from './shapeInput'

export const expansionloadTpl = (
    expansion = new ExpansionViewModel()
) => [
        td(
            ...shapeInput(expansion.section),
            'm',

            numberbox({ size: 5, title: '压力(kPa)', number: expansion.pressure }),
            'kPa',
        ),

        td(
            '倾角：',
            numberbox({ size: 8, title: '倾角(°)', number: expansion.inclination }),
            '°，方向角：',
            numberbox({ size: 8, title: '方向角(°)', number: expansion.direction }),
            '°',
        ),
        //td(),
        //td(        ),
        //td(        ),
    ]
