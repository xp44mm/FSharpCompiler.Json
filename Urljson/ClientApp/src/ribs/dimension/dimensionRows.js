import { map } from 'rxjs/operators'
import { numberbox, td, textNode, tr } from '../../hyperscript'

export const dimensionRows = (dimensions = [], colspans = [4, 2]) => {
    return [
        tr(
            td('面板宽度'),
            td('mm'),
            ...dimensions.map((side, i) =>
                td({ colSpan: colspans[i] }, numberbox({ number: side.length }))
            ),
            td()
        ),

        tr(
            td('内撑杆数目'),
            td('#'),
            ...dimensions.map((side, i) =>
                td(
                    { colSpan: colspans[i] },
                    numberbox({ number: side.pipeNumber })
                )
            ),
            td()
        ),

        tr(
            td('加固肋计算长度'),
            td('mm'),
            ...dimensions.map((side, i) =>
                td(
                    { className: 'text-right', colSpan: colspans[i] },
                    textNode(
                        side.designLength
                        |> map(v => v.toFixed(1))
                    )
                )
            ),
            td()
        ),
    ]
}
