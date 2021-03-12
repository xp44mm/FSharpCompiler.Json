import { b, td, textNode, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'

export const flueGasRows = (balance = new BalanceViewModel()) => {
   let {
      combustion: { fluegas },
   } = balance

   return [
      tr(td(b('质量烟气量')), td(), td(), td()),

      tr(td('H2O'), td('kg/hr'), td({ className: 'text-right' }, textNode(fluegas.H2O)), td()),

      tr(td('O2'), td('kg/hr'), td({ className: 'text-right' }, textNode(fluegas.O2)), td()),

      tr(td('N2'), td('kg/hr'), td({ className: 'text-right' }, textNode(fluegas.N2)), td()),

      tr(td('CO2'), td('kg/hr'), td({ className: 'text-right' }, textNode(fluegas.CO2)), td()),

      tr(td('SO2'), td('kg/hr'), td({ className: 'text-right' }, textNode(fluegas.SO2)), td()),

      tr(td('SO3'), td('kg/hr'), td({ className: 'text-right' }, textNode(fluegas.SO3)), td()),

      tr(td('HCl'), td('kg/hr'), td({ className: 'text-right' }, textNode(fluegas.HCl)), td()),

      tr(td('HF'), td('kg/hr'), td({ className: 'text-right' }, textNode(fluegas.HF)), td()),

      tr(td('ash'), td('kg/hr'), td({ className: 'text-right' }, textNode(fluegas.ash)), td()),
   ]
}
