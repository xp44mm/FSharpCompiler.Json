import {  td } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'

import { DuctViewModel } from '../model/DuctViewModel'
import { shapeInput } from './shapeInput'

export const ductloadTpl = (duct = new DuctViewModel()) => [
    td(
        ...shapeInput(duct.section),
        'm',
        numberbox({
            number: duct.wall,
            size: 5,
            title: '当量壁厚(mm)',
        }),
        'mm',
        numberbox({
            number: duct.length,
            size: 8,
            title: '长度(m)',
        }),
        'm',
    ),


    td(
        '倾角：',
        numberbox({
            number: duct.inclination,
            key: 'duct.wall',
            size: 8,
            title: '倾角(°)',
        }),
        "°，灰密度：",
        numberbox({
            number: duct.ashDensity,
            size: 8,
            title: '灰密度(kN/m3)',
        }),
        'kN/m3，积灰充满度：',
        numberbox({
            number: duct.fullness,
            size: 8,
            title: '积灰充满度(0~1)',
        }),
        '#',
    ),

]
