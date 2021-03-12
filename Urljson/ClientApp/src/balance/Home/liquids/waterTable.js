import { table, tbody, td, textNode, th, thead, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'

export const waterTable = (balance = new BalanceViewModel()) => {
   let { makeup, wash, mistElim } = balance
   return table(
      { className: 'table-sm table-bordered table-hover' },
      thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
      tbody(
         tr(td('补给水'), td('kg/hr'), td({ className: 'text-right' }, textNode(makeup)), td()),

         tr(td('石膏冲洗水'), td('kg/hr'), td({ className: 'text-right' }, textNode(wash)), td()),

         tr(td('除雾器冲洗水'), td('kg/hr'), td({ className: 'text-right' }, textNode(mistElim)), td())
      )
   )
}
