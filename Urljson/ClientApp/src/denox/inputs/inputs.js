import { b, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { collapse } from '../../hyperscript/component'
import { numberbox, checkbox } from '../../hyperscript/form'
import { DenoxViewModel } from '../model/DenoxViewModel'
import { ammoniaSlip } from './ammoniaSlip'
import { nh3 } from './nh3'

export const inputs = (model = new DenoxViewModel()) => {
    let { gas } = model

    return table(
        thead(
            tr(
                th({ 'style.width': '10em' }, '名称'),
                th({ 'style.width': '5em' }, '单位'),
                th({ 'style.width': '20em' }, '数值'),
                th({ 'style.width': '10em' }, '备注')
            )
        ),
        tbody(
            tr(td(b('实际烟气成分')), td(), td(), td()),

            tr(
                td('H2O'),
                td('vol.%'),
                td({ className: 'text-right', }, numberbox({ number: gas.H2O })),
                td()
            ),

            tr(
                td('O2'),
                td('vol.%'),
                td({ className: 'text-right', }, numberbox({ number: gas.O2 })),
                td()
            ),

            tr(
                td('N2'),
                td('vol.%'),
                td({ className: 'text-right', }, numberbox({ number: gas.N2 })),
                td()
            ),

            tr(
                td('CO2'),
                td('vol.%'),
                td({ className: 'text-right', }, numberbox({ number: gas.CO2 })),
                td()
            ),

            tr(
                td('SO2'),
                td('vol.%'),
                td({ className: 'text-right', }, numberbox({ number: gas.SO2 })),
                td()
            ),

            tr(
                td('SO3'),
                td('vol.%'),
                td({ className: 'text-right', }, numberbox({ number: gas.SO3 })),
                td()
            ),

            tr(td(), td('vol.%'), td({ className: 'text-right', }, textNode(gas.total)), td()),

            tr(
                td('实际烟气量'),
                td('Nm3/hr'),
                td({ className: 'text-right', }, numberbox({ number: gas.volume })),
                td()
            ),

            tr(
                td('实际干氧量'),
                td('vol.%'),
                td({ className: 'text-right', }, textNode(gas.O2indry)),
                td()
            ),

            tr(
                td('标准干氧量'),
                td('vol.%'),
                td({ className: 'text-right', }, numberbox({ number: gas.O2std })),
                td()
            ),

            tr(
                td('实际干烟气量'),
                td('Nm3/hr'),
                td({ className: 'text-right', }, textNode(gas.dryVolume)),
                td()
            ),

            tr(
                td('标准烟气量'),
                td('Nm3/hr'),
                td({ className: 'text-right', }, textNode(gas.stdVolume)),
                td('标准干氧量下干烟气量')
            ),

            tr(
                td('入口NOx(NO2)'),
                td('mg/Nm3'),
                td({ className: 'text-right', }, numberbox({ number: model.inletNOx })),
                td()
            ),

            tr(
                td(b('SNCR')),
                td('#'),
                td(checkbox({ checked: model.bsncr })),
                td()
            ),

            ...collapse(model.bsncr, ...nh3(model, 'sncr')),

            tr(
                td(b('SCR')),
                td('#'),
                td(checkbox({ checked: model.bscr })),
                td()
            ),

            ...collapse(model.bscr, ...nh3(model, 'scr')),

            ...ammoniaSlip(model)
        )
    )
}
