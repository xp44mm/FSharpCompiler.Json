import { map } from 'rxjs/operators'
import { button, div, p, table, tbody, td, textNode, th, thead, tr } from '../hyperscript'
import { numberbox } from '../hyperscript/form'

import { PipelineViewModel } from './model'
import { orrifice } from './orrifice'

export const pipeline = (model = new PipelineViewModel()) => {
    let root = div(
        div(
            table(
                thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
                tbody([
                    tr(
                        td('大气压力'),
                        td('kPa'),
                        td({ className: 'text-right' }, textNode(model.p0)),
                        td('来自首页')
                    ),

                    tr(
                        td('入口压力（表压）'),
                        td('kPa'),
                        td({ className: 'text-right' }, numberbox({ number: model.p1 })),
                        td()
                    ),

                    tr(
                        td('介质温度'),
                        td('℃'),
                        td({ className: 'text-right' }, numberbox({ number: model.t })),
                        td()
                    ),

                    tr(
                        td('温度负压'),
                        td('kPa'),
                        td({ className: 'text-right' }, textNode(model.pt)),
                        td()
                    ),

                    tr(
                        td('介质密度'),
                        td('kg/m3'),
                        td({ className: 'text-right' }, numberbox({ number: model.dens })),
                        td()
                    ),

                    tr(
                        td('介质流量'),
                        td('m3/hr'),
                        td({ className: 'text-right' }, numberbox({ number: model.flow })),
                        td()
                    ),

                    tr(
                        td('管子直径'),
                        td('mm'),
                        td({ className: 'text-right' }, numberbox({ number: model.dw })),
                        td()
                    ),

                    tr(
                        td('孔板最小壁厚'),
                        td('mm'),
                        td({ className: 'text-right' }, textNode(model.minThick)),
                        td()
                    ),

                    tr(
                        td('孔板壁厚'),
                        td('mm'),
                        td({ className: 'text-right' }, numberbox({ number: model.thick })),
                        td()
                    ),
                ])
            ),

            button('添加孔板').subscribeEvent('click', _ => {
                model.addOrrifice()
            }),

            button('移除孔板').subscribeEvent('click', _ => {
                model.removeOrrifice()
            }),

            p('如果出口压力仍然很高，可在下游继续增加孔板')
        )
    )

    let tbl = root.firstChild.firstChild

    //append a line
    model.orrifices.push$
        |> map(orfc => orrifice(orfc, model))
        |> (o => o.subscribe(tbody => tbl.appendChild(tbody)))

    //remove a line
    model.orrifices.remove$
        |> map(i => tbl.childNodes[i + 2])
        |> (o => o.subscribe(e => tbl.removeChild(e)))

    return root
}
