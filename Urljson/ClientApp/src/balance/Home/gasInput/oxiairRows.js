import { map } from 'rxjs/operators'
import { b, button, td, textNode, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'
import { suggestOxiO2 } from '../../bindings/suggestOxiO2'
import { BalanceViewModel } from '../../model'


export const oxiairRows = (balance = new BalanceViewModel()) => {
    let { ratioSO, oxiair } = balance
    return [
        tr(td(b('氧化空气')), td(), td(), td()),
        tr(
            td('输入O2质量'),
            td('kg/hr'),
            td({ className: 'text-right' }, numberbox({ number: oxiair.feed.O2 })),
            td(
                button(
                    '推荐'
                ).subscribeEvent('click', _ => {
                    suggestOxiO2(balance)
                })
            )
        ),
        tr(
            {
                className:
                    ratioSO
                    |> map(rat => 1.2 < rat && rat < 1.6)
                    |> map(success => success ? 'table-success' : 'table-danger'),
            },
            td('SO2/O2'),
            td('kg/kg'),
            td({ className: 'text-right' }, textNode(ratioSO)),
            td('(1.2)~1.6')
        ),

        tr(
            td('氧化风机出口压力(g)'),
            td('Pa'),
            td({ className: 'text-right' }, numberbox({ number: oxiair.compress.pressureg })),
            td()
        ),

        //tr(
        //    td('氧化风机出口压力(abs)'),
        //    td('Pa'),
        //    td(
        //        //numberbox(
        //        //    oxiair.compress.pressure,
        //        //    oxiair.compress.pressure_write
        //        //)
        //    ),
        //    td('可能不需要，很少用到绝对压力')
        //),
    ]
}
