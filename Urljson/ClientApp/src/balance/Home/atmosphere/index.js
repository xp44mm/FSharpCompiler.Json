import { table, tbody, th, thead, tr } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'
import { atmosphereRows } from './atmosphereRows'
import { gasParameterRows } from './gasParameterRows'

export const atmospherePanel = (balance = new BalanceViewModel()) =>
    table(
        { className: 'table-sm table-bordered table-hover' },
        thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),

        tbody(...atmosphereRows(balance.atmosphere), ...gasParameterRows(balance))
    )
