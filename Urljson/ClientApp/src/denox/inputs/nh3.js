import { td, textNode, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'

import { DenoxViewModel } from '../model/DenoxViewModel'

export const nh3 = (denox = new DenoxViewModel(), nm) => {

    return [
        tr([
            td('出口NOx(NO2)'),
            td('mg/Nm3'),
            td({ className: 'text-right', }, numberbox({ number: denox[nm].outletNOx })),
            td(),
        ]),

        tr([
            td('脱硝效率'),
            td('%'),
            td({ className: 'text-right', }, textNode(denox[nm].efficiency)),
            td(),
        ]),

        tr([
            td('理论氨耗量'),
            td('kg/hr'),
            td({ className: 'text-right', }, textNode(denox[nm].nh3)),
            td(),
        ]),
    ]
}

