import {
    table,
    tbody,
    td,
    th,
    thead,
    tr,
} from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'

import { BalanceViewModel } from '../../model'
import { realAirRows } from './realAirRows'
import { realGasDryPercentRows } from './realGasDryPercentRows'
import { realGasPercentRows } from './realGasPercentRows'
import { realGasRows } from './realGasRows'

export const exessairPanel = (balance = new BalanceViewModel()) => {
    let { combustion } = balance

    return table(
        { className: 'table-sm table-bordered table-hover' },
        thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),

        tbody(
            tr(
                td('过量空气系数'),
                td('1.0~n'),
                td(
                    { className: 'text-right' },
                    numberbox({ number: combustion.exessAir })
                ),
                td()
            ),
            ...realAirRows(balance),
            ...realGasRows(balance),
            ...realGasPercentRows(balance),
            ...realGasDryPercentRows(balance)
        )
    )
}
