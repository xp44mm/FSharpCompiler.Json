import { table, tbody, th, thead, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'
import { primaryHydrocycloneRows } from './primaryHydrocycloneRows'
import { secondHydrocycloneRows } from './secondHydrocycloneRows'
import { vacuumFilterRows } from './vacuumFilterRows'

export const dewateringTable = (balance = new BalanceViewModel()) => [
   table(
      { className: 'table-sm table-bordered table-hover' },
      thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),

      tbody(...primaryHydrocycloneRows(balance), ...vacuumFilterRows(balance), ...secondHydrocycloneRows(balance))
   ),
]
