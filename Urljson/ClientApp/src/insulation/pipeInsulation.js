import { map } from 'rxjs/operators'
import {
    button,
    div,
    h3,
    table,
    tbody,
    td,
    textNode,
    th,
    thead,
    tr
} from '../hyperscript'
import { numberbox, } from '../hyperscript/form'

import { PipeInsulationViewModel } from './model'
import { planeLayer } from './planeLayer'

export const pipeInsulation = (model = new PipeInsulationViewModel()) => {
    let root = div(
        h3('管道保温'),
        div(
            table(
                thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
                tbody(
                    tr(
                        td('管道外径'),
                        td('mm'),
                        td({ className: 'text-right', }, numberbox({ number: model.d })),
                        td()
                    ),

                    tr(
                        td('介质温度'),
                        td('℃'),
                        td({ className: 'text-right', }, numberbox({ number: model.t })),
                        td()
                    ),

                    tr(
                        td('常年允许散热密度'),
                        td('W/m2'),
                        td({ className: 'text-right', }, textNode(model.heatLoss)),
                        td()
                    ),

                    tr(
                        td('常年允许外表面温度'),
                        td('℃'),
                        td({ className: 'text-right', }, textNode(model.ts)),
                        td('相对环境温度')
                    )
                )
            ),
            button('添加保温层').subscribeEvent('click', _ => {
                model.push()
            }),
            button('移除保温层').subscribeEvent('click', _ => {
                model.layers.pop()
            })
        )
    )

    let tbl = root.children[1].firstChild

    model.layers.push$
        |> map(lyr => planeLayer(lyr, model))
        |> (obs => obs.subscribe(tbd => tbl.appendChild(tbd)))

    model.layers.pop$.subscribe(() => {
        if (tbl.lastChild.previousSibling.tagName === 'TBODY') {
            tbl.removeChild(tbl.lastChild)
        }
    })

    return root
}
