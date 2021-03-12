import { b, td, textNode, tr } from '../../../hyperscript'
import { CombusGasViewModel } from '../../model/CombusGasViewModel'

export const productRows = (product = new CombusGasViewModel()) => [
   tr(td(b('理论产物')), td(), td(), td('100kg燃料')),

   tr(td('H2O'), td('kmol'), td({ className: 'text-right' }, textNode(product.H2O)), td()),

   tr(td('O2'), td('kmol'), td({ className: 'text-right' }, textNode(product.O2)), td()),

   tr(td('N2'), td('kmol'), td({ className: 'text-right' }, textNode(product.N2)), td()),

   tr(td('CO2'), td('kmol'), td({ className: 'text-right' }, textNode(product.CO2)), td()),

   tr(td('SO2'), td('kmol'), td({ className: 'text-right' }, textNode(product.SO2)), td()),
]
