import { map } from 'rxjs/operators'
import { pickout, restore } from '../deep'
import { button, div, table, tbody, th, thead, tr } from '../hyperscript'
import { inputLine } from './inputLine'
import { ProjectViewModel } from './ProjectViewModel'


export const inputPanel = (model = new ProjectViewModel()) => {
    let root = div(
        table(
            thead(
                tr(
                    th('kind'),
                    th('quantity'),
                    th('输入'),
                    th('description'),
                    th('measure'),
                    th('weight(kg)'),
                    th('total'),
                    th()
                )
            ),

            tbody(model.parts.map(part => inputLine(part, model)))
        ),

        button('添加').subscribeEvent('click', _ => {
            model.push()
        }),

        button('保存').subscribeEvent('click', _ => {
            let data = pickout(model)
            console.log(data)
        }),
        //button('重置').subscribeEvent('click', _ => {
        //    restore(model, resetData)
        //})
    )

    let container = root.firstChild.lastChild // tbody

    //append
    model.parts.push$
        |> map(item => inputLine(item, model))
        |> (o =>
            o.subscribe(line => {
                container.appendChild(line)
            }))

    //remove
    model.parts.remove$
        |> map(i => container.children[i])
        |> (o =>
            o.subscribe(elem => {
                elem.parentNode.removeChild(elem)
            }))

    return root
}
