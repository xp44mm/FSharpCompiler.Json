import { b, button, td, textNode, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'

import { changeExcessAirByDryO2 } from '../../bindings/changeExcessAir'
import { BalanceViewModel } from '../../model'

export const realGasDryPercentRows = (balance = new BalanceViewModel()) => {
   let { combustion } = balance
   let { realGasDryPercent } = combustion
   return [
      tr(td(b('干态体积百分比')), td(), td(), td('干烟气成分含量')),

      tr(td('O2'), td('vol. %'), td({ className: 'text-right' }, textNode(realGasDryPercent.O2)), td()),

      tr(td('N2'), td('vol. %'), td({ className: 'text-right' }, textNode(realGasDryPercent.N2)), td()),

      tr(td('CO2'), td('vol. %'), td({ className: 'text-right' }, textNode(realGasDryPercent.CO2)), td()),

      tr(td('SO2'), td('vol. %'), td({ className: 'text-right' }, textNode(realGasDryPercent.SO2)), td()),

      tr(
         td('目标干氧量'),
         td('vol. %'),
         td({ className: 'text-right' }, numberbox({ number: combustion.target_dryO2 })),
         td(
            button('设置过量空气系数').subscribeEvent('click', _ => {
               changeExcessAirByDryO2(combustion)
            })
         )
      ),
   ]
}
