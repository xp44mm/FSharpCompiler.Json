import { b, td, textNode, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'

export const realGasRows = (balance = new BalanceViewModel()) => {
   let { realGas } = balance.combustion
   return [
      tr(td(b('实际烟气量')), td(), td(), td('100kg燃料')),

      tr(td('H2O'), td('kmol'), td({ className: 'text-right' }, textNode(realGas.H2O)), td()),

      tr(td('O2'), td('kmol'), td({ className: 'text-right' }, textNode(realGas.O2)), td()),

      tr(td('N2'), td('kmol'), td({ className: 'text-right' }, textNode(realGas.N2)), td()),

      tr(td('CO2'), td('kmol'), td({ className: 'text-right' }, textNode(realGas.CO2)), td()),

      tr(td('SO2'), td('kmol'), td({ className: 'text-right' }, textNode(realGas.SO2)), td()),
   ]
}
