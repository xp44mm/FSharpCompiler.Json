import { tbody, td, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { InputViewModel } from './SingleMiterElbowViewModel'

export const inputTbody = (model = new InputViewModel()) =>
   tbody([
      tr(td('直径'), td('m'), td({ className: 'text-right' }, numberbox({ number: model.diameter })), td()),
      tr(td('转角'), td('°'), td({ className: 'text-right' }, numberbox({ number: model.angle })), td()),
   ])
