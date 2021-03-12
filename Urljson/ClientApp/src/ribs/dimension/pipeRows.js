import { map } from 'rxjs/operators'
import { numberbox, td, textNode, tr } from '../../hyperscript'

export const pipeRows = (pipes = [], colspans = [4, 2]) => {
    return [
        tr(
            td('内撑杆荷载面积'),
            td('m2'),
            ...pipes.map((pipe, i) =>
                td(
                    { className: 'text-right', colSpan: colspans[i] },
                    textNode(
                        pipe.wallArea |> map(v => v.toFixed(2))
                    )
                )
            ),
            td()
        ),

        tr(
            td('内撑杆长度'),
            td('mm'),
            ...pipes.map((pipe, i) =>
                td(
                    { className: 'text-right', colSpan: colspans[i] },
                    textNode(
                        pipe.length |> map(v => v.toFixed(1))
                    )
                )
            ),
            td()
        ),

        tr(
            td('内撑杆规格'),
            td('mm'),
            ...pipes.map((pipe, i) =>
                td({ colSpan: colspans[i] },
                    numberbox({ size: 6, number: pipe.dw }),
                    '×',
                    numberbox({ size: 4, number: pipe.t })
                )
            ),
            td()
        ),

        tr(
            td('内撑杆截面积'),
            td('cm2'),
            ...pipes.map((pipe, i) =>
                td(
                    { className: 'text-right', colSpan: colspans[i] },
                    textNode(pipe.area |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr(
            td('内撑杆长细比'),
            td('≤250'),
            ...pipes.map((pipe, i) =>
                td(
                    { className: 'text-right', colSpan: colspans[i] },
                    textNode(
                        pipe.lambda |> map(v => v.toFixed(1))
                    )
                )
            ),
            td()
        ),

        tr(
            td('内撑杆稳定系数'),
            td('#'),
            ...pipes.map((pipe, i) =>
                td(
                    { className: 'text-right', colSpan: colspans[i] },
                    textNode(
                        pipe.stable |> map(v => v.toFixed(3))
                    )
                )
            ),
            td()
        ),
    ]
}
