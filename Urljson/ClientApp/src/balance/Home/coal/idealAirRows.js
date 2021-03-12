import { b, td, textNode, tr } from '../../../hyperscript'
import { AirViewModel } from '../../model/AirViewModel'

export const idealAirRows = (idealAir = new AirViewModel()) => [
   tr(td(b('理论空气量')), td(), td(), td('100kg燃料')),

   tr(td('H2O'), td('kmol'), td({ className: 'text-right' }, textNode(idealAir.H2O)), td()),

   tr(td('O2'), td('kmol'), td({ className: 'text-right' }, textNode(idealAir.O2)), td()),

   tr(td('N2'), td('kmol'), td({ className: 'text-right' }, textNode(idealAir.N2)), td()),
]
