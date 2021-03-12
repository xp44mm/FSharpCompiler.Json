import { b, td, textNode, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { DenoxViewModel } from '../model/DenoxViewModel'

export const ammoniaSlip = (denox = new DenoxViewModel()) => [
   tr(td(b('氨逃逸')), td(), td(), td()),

   tr(td('浓度'), td('ppmv'), td({ className: 'text-right' }, numberbox({ number: denox.ammoniaSlip.ppmv })), td()),

   tr(td('理论氨耗量'), td('kg/hr'), td({ className: 'text-right' }, textNode(denox.ammoniaSlip.nh3)), td()),
]
