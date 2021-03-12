import { b, td, textNode, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'

export const realAirRows = (balance = new BalanceViewModel()) => {
   let { realAir } = balance.combustion

   return [
      tr(td(b('实际空气量')), td(), td(), td('100kg燃料')),

      tr(td('H2O'), td('kmol'), td({ className: 'text-right' }, textNode(realAir.H2O)), td()),

      tr(td('O2'), td('kmol'), td({ className: 'text-right' }, textNode(realAir.O2)), td()),

      tr(td('N2'), td('kmol'), td({ className: 'text-right' }, textNode(realAir.N2)), td()),
   ]
}
