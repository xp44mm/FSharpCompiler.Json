import { table, tbody, th, thead, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'
import { coalAnalysisRows } from './coalAnalysisRows'
import { idealAirRows } from './idealAirRows'
import { idealGasRows } from './idealGasRows'
import { productRows } from './productRows'

export const coalPanel = (balance = new BalanceViewModel()) =>
   table(
      { className: 'table-sm table-bordered table-hover' },
      thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),

      tbody(
         ...coalAnalysisRows(balance.combustion.coal),
         ...productRows(balance.combustion.product),
         ...idealAirRows(balance.combustion.idealAir),
         ...idealGasRows(balance)
      )
   )
