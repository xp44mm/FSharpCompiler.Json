import { map } from 'rxjs/operators'
import { button, table, tbody, tfoot, th, thead, tr } from '../hyperscript'
import { ductLine } from './ductLine'
import { TableViewModel } from './model'

export const inputTable = (model = new TableViewModel()) => {
    let tableBody = tbody()

    //append a line
    model.lines.push$
        |> map(duct => ductLine(duct, model))
        |> (o => o.subscribe(tr => tableBody.appendChild(tr)))

    //remove a line
    model.lines.remove$
        |> map(i => tableBody.childNodes[i])
        |> (o => o.subscribe(tr => tableBody.removeChild(tr)))

    return table(
        thead(
            tr([
                th('名称'),
                th({ 'style.width': '5em' }, '类型'),
                th({ 'style.width': '300px' }, '形状'),
                th({ 'style.width': '4em' }, '壁厚'),
                th({ 'style.width': '6em' }, '油漆道数'),
                th({ 'style.width': '12em' }, '保温厚度与空气层高度'),
                th({ 'style.width': '8em' }, '外护板支架高度'),
                th({ 'style.width': '5em' },),
            ]),
            tr([
                th(), th(), th('m'), th('mm'),
                th(), th('mm'), th('mm'), th(),
            ])
        ),
        tableBody,
        tfoot(
            button('添加').subscribeEvent('click', _ => {
                model.push()
            }),
        )
    )
}
