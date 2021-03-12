import { b, td, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'
import { BalanceViewModel } from '../../model'

export const effectRows = (balance = new BalanceViewModel()) => {
   let { effect } = balance
   return [
      tr(td(b('塔内效率')), td(), td(), td()),

      tr(td('SO2'), td('%'), td({ className: 'text-right' }, numberbox({ number: effect.SO2 })), td()),

      tr(td('SO3'), td('%'), td({ className: 'text-right' }, numberbox({ number: effect.SO3 })), td()),

      tr(td('HCl'), td('%'), td({ className: 'text-right' }, numberbox({ number: effect.HCl })), td()),

      tr(td('HF'), td('%'), td({ className: 'text-right' }, numberbox({ number: effect.HF })), td()),

      tr(td('ash'), td('%'), td({ className: 'text-right' }, numberbox({ number: effect.ash })), td()),
   ]
}
