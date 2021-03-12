import { table, tbody, th, thead, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'
import { effectRows } from './effectRows'
import { gghRows } from './gghRows'
import { oxiairRows } from './oxiairRows'
import { terminalRows } from './terminalRows'

export const gasInputTable = (balance = new BalanceViewModel()) =>
   table(
      { className: 'table-sm table-bordered table-hover' },
      thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),

      tbody(...terminalRows(balance), ...effectRows(balance), ...oxiairRows(balance), ...gghRows(balance))
   )
