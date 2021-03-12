import { b, button, td, textNode, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'

import { changeExcessAirByO2 } from '../../bindings/changeExcessAir'
import { BalanceViewModel } from '../../model'

export const realGasPercentRows = (balance = new BalanceViewModel()) => {
    let { combustion } = balance
    let { realGasPercent } = combustion

    return [
        tr(
            td(b('体积百分比')),
            td(),
            td(),
            td('实际烟气成分含量'),
        ),

        tr(
            td('H2O'),
            td('vol. %'),
            td({ className: 'text-right' }, textNode(realGasPercent.H2O)),
            td(),
        ),

        tr(
            td('O2'),
            td('vol. %'),
            td({ className: 'text-right' }, textNode(realGasPercent.O2)),
            td(),
        ),

        tr(
            td('N2'),
            td('vol. %'),
            td({ className: 'text-right' }, textNode(realGasPercent.N2)),
            td(),
        ),

        tr(
            td('CO2'),
            td('vol. %'),
            td({ className: 'text-right' }, textNode(realGasPercent.CO2)),
            td(),
        ),

        tr(
            td('SO2'),
            td('vol. %'),
            td({ className: 'text-right' }, textNode(realGasPercent.SO2)),
            td(),
        ),

        tr(
            td('目标湿氧量'),
            td('vol. %'),
            td({ className: 'text-right' },
                numberbox({ number: combustion.target_realO2 })
            ),
            td(
                button(
                    '设置过量空气系数'
                ),
            ).subscribeEvent('click', _ => {
                changeExcessAirByO2(combustion)
            }),
        ),

    ]
}
