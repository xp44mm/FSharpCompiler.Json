import { tbody, td, textNode, tr } from '../hyperscript'
import { numberbox, } from '../hyperscript/form'

import { OrrificeViewModel } from './model'

export const orrifice = (model = new OrrificeViewModel()) => {
    return tbody([
        tr(
            td('孔板内径'),
            td('mm'),
            td({ className: 'text-right' }, numberbox({ number: model.dn })),
            td()
        ),

        tr(
            td('孔板动压力'),
            td('kPa'),
            td({ className: 'text-right' }, textNode(model.dp)),
            td()
        ),

        tr(
            td('孔板阻力系数'),
            td('#'),
            td({ className: 'text-right' }, textNode(model.zeta)),
            td()
        ),

        tr(
            td('许用阻力系数'),
            td('#'),
            td({ className: 'text-right' }, textNode(model.maxZeta)),
            td()
        ),

        tr(
            td('孔板前直段长度'),
            td('mm'),
            td({ className: 'text-right' }, textNode(model.span)),
            td()
        ),

        tr(
            td('孔板出口压力'),
            td('kPa'),
            td({ className: 'text-right' }, textNode(model.p2)),
            td()
        ),
    ])
}
