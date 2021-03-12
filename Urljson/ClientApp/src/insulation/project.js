import { map } from 'rxjs/operators'
import { button, div, h4, table, tbody, td, tfoot, th, thead, tr } from '../hyperscript'
import { numberbox, textbox, } from '../hyperscript/form'

import { ProjectViewModel } from './model'


export const project = (model = new ProjectViewModel()) => {
    let root = div(
        h4('保温厚度计算'),

        div(
            table(
                thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
                tbody(
                    tr(
                        td('环境温度'),
                        td('℃'),
                        td({ className: 'text-right', }, numberbox({ number: model.ta })),
                        td()
                    )
                )
            )
        ),

        h4('列表'),
        table(
            thead(tr(th({ 'style.width': '70%' }, '名称'), th('备注'))),
            tbody(),
            tfoot(
                button('添加').subscribeEvent('click', _ => {
                    model.push()
                })
            )
        ),

    )

    let insulationsTbody = root.children[3].children[1]

    model.insulations.push$
        |> map(item =>
            tr(
                td(textbox({ value: item.title, 'style.width': '96%' })),
                td(
                    button('移除').subscribeEvent('click', _ => {
                        model.remove(item)
                    })
                )
            )
        )
        |> (obs =>
            obs.subscribe(tr => {
                insulationsTbody.appendChild(tr)
            }))

    model.insulations.remove$
        |> (obs =>
            obs.subscribe(i => {
                insulationsTbody.removeChild(insulationsTbody.children[i])
            }))

    return root
}
