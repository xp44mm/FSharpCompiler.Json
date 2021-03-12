import { map } from 'rxjs/operators'
import { button, table, tbody, td,  tfoot, th, thead, tr } from '../hyperscript'
import {  textbox } from '../hyperscript/form'

import { ProjectViewModel } from './model'

let resetData = {}

export const ribTabTable = (model = new ProjectViewModel()) => {
    let root = table([
        thead(tr(th({ 'style.width': '70%' }, '名称'), th('备注'))),
        tbody(),
        tfoot(
            tr(
                button('添加').subscribeEvent('click', _ => {
                    model.push()
                })
            )
        )
    ])

    let tbd = root.childNodes[1]

    model.ribs.push$
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
                tbd.appendChild(tr)
            }))

    model.ribs.remove$
        |> (obs =>
            obs.subscribe(i => {
                tbd.removeChild(tbd.childNodes[i])
            }))

    return root
}
