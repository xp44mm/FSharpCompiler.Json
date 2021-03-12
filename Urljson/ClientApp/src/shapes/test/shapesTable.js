import { map } from 'rxjs/operators'
import { pickout, restore } from '../../deep'
import { button, table, tbody, tfoot, th, thead, tr } from '../../hyperscript'
import { ShapeListViewModel } from '../model'
import { shapeRow } from './shapeRow'

export const shapesTable = (model = new ShapeListViewModel()) => {
    let resetData = {
        shapes: [
            { rectangle: { width: 10, height: 20 }, kind: 'rectangle' },
            { circle: { diameter: 30 }, kind: 'circle' },
        ],
    }

    let tableBody = tbody(model.shapes.map(shape => shapeRow(shape, model)))

    //append a line
    model.shapes.push$
        |> map(shape => shapeRow(shape, model))
        |> (o => o.subscribe(tr => tableBody.appendChild(tr)))

    //remove a line
    model.shapes.remove$
        |> map(i => tableBody.childNodes[i])
        |> (o => o.subscribe(tr => tableBody.removeChild(tr)))

    return table(
        thead(
            tr(
                th({ 'style.width': '20%' }, '名称'),
                th({ 'style.width': '40%' }, '尺寸'),
                th({ 'style.width': '10%' }, '截面积'),
                th({ 'style.width': '10%' }, '周长'),
                th({ 'style.width': '20%' }, '备注')
            ),
            tr(th(), th('mm'), th('m2'), th('m'), th())
        ),
        tableBody,
        tfoot(
            button('添加').subscribeEvent('click', _ => {
                model.pushShape()
            }),

            button('保存').subscribeEvent('click', _ => {
                let data = pickout(model)
                console.log(data)
            }),

            button({}, '重置').subscribeEvent('click', _ => {
                restore(model, resetData)
            })
        )
    )
}
