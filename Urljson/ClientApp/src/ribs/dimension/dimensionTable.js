import { map } from 'rxjs/operators'
import { td, textNode, table, tbody, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'

export const dimensionTable = rib => {
    let dimensions = [rib.latitude, rib.longitude]
    let pipes = dimensions.map(dim => dim.pipe)
    return table(
        thead(
            tr(
                th('名称'),
                th('单位'),
                th('维度'),
                th('经度'),
                th('备注')
            )
        ),
        tbody(
            tr(
                td('面板宽度'),
                td('mm'),
                ...dimensions.map((side) =>
                    td({ className: 'text-right' }, numberbox({ number: side.length }))
                ),
                td()
            ),

            tr(
                td('内撑杆数目'),
                td('#'),
                ...dimensions.map((side) =>
                    td({ className: 'text-right' },
                        numberbox({ number: side.pipeNumber })
                    )
                ),
                td()
            ),

            tr(
                td('加固肋计算长度'),
                td('mm'),
                ...dimensions.map((side) =>
                    td(
                        { className: 'text-right' },
                        textNode(
                            side.designLength
                            |> map(v => v.toFixed(1))
                        )
                    )
                ),
                td()
            ),

            //管道
            tr(
                td('内撑杆荷载面积'),
                td('m2'),
                ...pipes.map((pipe, i) =>
                    td(
                        { className: 'text-right' },
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
                        { className: 'text-right' },
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
                    td(
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
                        { className: 'text-right' },
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
                        { className: 'text-right' },
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
                        { className: 'text-right' },
                        textNode(
                            pipe.stable |> map(v => v.toFixed(3))
                        )
                    )
                ),
                td()
            ),

        )
    )
}
