import {  td } from '../../hyperscript';
import { numberbox } from '../../hyperscript/form'

import { DamperViewModel } from '../model/DamperViewModel';
import { shapeInput } from './shapeInput'

export const damperloadTpl = (damper = new DamperViewModel()) => [
    td(
        ...shapeInput(damper.section),
        'm',
        numberbox({ size: 5, title: '当量壁厚(mm)', number: damper.wall }),
        'mm',

    ),
    //td(),
    //td(),
    //td(),
    td(),
]
