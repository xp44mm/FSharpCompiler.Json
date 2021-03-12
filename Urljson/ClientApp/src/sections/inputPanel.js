import { map,tap } from 'rxjs/operators'
import { table, tbody, tfoot, th, thead, tr, button } from '../hyperscript'
import { editRow } from './editRow'
import { SectionsViewModel } from './model/SectionsViewModel'

export const inputPanel = (model = new SectionsViewModel()) => {
    let linesTbody = tbody()

    //append a section
    model.sections.push$
        |> map(line => editRow(line, model))
        |> (o => o.subscribe(tr => {
            linesTbody.appendChild(tr)
        }))

    //remove a section
    model.sections.remove$
        |> map(i => linesTbody.childNodes[i])
        |> (o => o.subscribe(tr => linesTbody.removeChild(tr)))

    return table({ 'style.marginTop': '4px' },
        thead(
            tr(
                th({ 'style.width': '24%' }, '名称'),
                th({ 'style.width': '12%' }, '流量'),
                th({ 'style.width': '30%' }, '尺寸'),
                th({ 'style.width': '12%' }, '截面积'),
                th({ 'style.width': '12%' }, '流速'),
                th({ 'style.width': '10%' }, '备注')
            ),

            tr(th(), th('m3/hr'), th('mm'), th('mm2'), th('m/s'), th())
        ),
        linesTbody,
        tfoot(
            button('添加').subscribeEvent('click', _ => {
                model.push()
            }))
    )
}
