import { map } from 'rxjs/operators'
import { button, div, h4, table, tbody, td, tfoot, th, thead, tr } from '../hyperscript'
import { numberbox, textbox } from '../hyperscript/form'

import { ProjectViewModel } from './model'

export const project = (model = new ProjectViewModel()) => {
    let root = div(
        { className: 'panel panel-primary' },
        h4('項目數據'),
        table(
            { className: 'table table-condensed table-bordered' },
            thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
            tbody(
                tr(
                    td('大气压力'),
                    td('kPa'),
                    td({ className: 'text-right' }, numberbox({ number: model.p0 })),
                    td()
                )
            )
        ),
        h4('管道列表'),
        table(
            thead(tr(th({ 'style.width': '70%' }, '名称'), th('备注'))),
            tbody(),
            tfoot(
                button('添加管道').subscribeEvent('click', _ => {
                    model.push()
                }),
            )
        )
    )

    let pipelineTbody = root.lastChild.children[1]

    model.pipelines.push$
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
        |> (o => o.subscribe(tr => {
            pipelineTbody.appendChild(tr)
        }))

    model.pipelines.remove$
        |> (o => o.subscribe(i => {
            pipelineTbody.removeChild(pipelineTbody.children[i])
        }))

    return root
}
