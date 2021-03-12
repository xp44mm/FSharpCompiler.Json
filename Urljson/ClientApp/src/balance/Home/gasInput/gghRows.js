import { b, td, textNode, tr } from '../../../hyperscript'
import {  checkbox, numberbox } from '../../../hyperscript/form'

import { collapse } from '../../../hyperscript/component'
import { BalanceViewModel } from '../../model'
import { tap } from 'rxjs/operators'

export const gghRows = (balance = new BalanceViewModel()) => {
    let { ggh } = balance
    return [
        tr(
            td('有GGH ?'),
            td(),
            td(checkbox({
                checked:
                    balance.hasGGH
            })),
            td()
        ),
        ...collapse(balance.hasGGH, ...gghDataRows(ggh)),
    ]
}

function gghDataRows(ggh) {
    let root = [
        tr(td(b('GGH')), td(), td(), td()),

        tr(
            td('Outlet Temperature'),
            td('℃'),
            td({ className: 'text-right' }, numberbox({ number: ggh.outlet.temperature })),
            td()
        ),

        tr(td(b('GGH 压力降')), td(), td(), td()),

        tr(
            td('Dirty Side'),
            td('Pa'),
            td({ className: 'text-right' }, numberbox({ number: ggh.dirty.gghPressureDrop })),
            td()
        ),

        tr(
            td('ggh至吸收塔入口'),
            td('Pa'),
            td({ className: 'text-right' }, numberbox({ number: ggh.dirty.ductPressureDrop })),
            td()
        ),

        tr(
            td('吸收塔出口至ggh'),
            td('Pa'), 
            td({ className: 'text-right' }, numberbox({ number: ggh.clean.ductPressureDrop })),
            td()
        ),
        tr(
            td('Clean Side'),
            td('Pa'),
            td({ className: 'text-right' }, numberbox({ number: ggh.clean.gghPressureDrop })),
            td()
        ),

        tr(td(b('泄露率')), td(), td(), td()),

        tr(
            td('Dirty to Clean'),
            td('%'),
            td({ className: 'text-right' }, numberbox({ number: ggh.dirty.leakage })),
            td()
        ),

        tr(
            td('Clean to Dirty'),
            td('%'),
            td({ className: 'text-right' }, numberbox({ number: ggh.clean.leakage })),
            td()
        ),

        tr(td(b('低泄露吹扫风机')), td(), td(), td()),

        tr(
            td('GGH Sootblow'),
            td('kg/hr'),
            td({ className: 'text-right' }, numberbox({ number: ggh.sootblow.total })),
            td()
        ),

        tr(
            td('GGH Sootblow Pressure(gauge)'),
            td('Pa'),
            td({ className: 'text-right' }, numberbox({ number: ggh.sootblow.pressureg })),
            td()
        ),

        tr(
            td('理论换热量'),
            td('kJ/hr'),
            td({ className: 'text-right' }, textNode(ggh.enth)),
            td()
        ),
    ]

    return root
}
