import { table, tbody, td, textNode, th, thead, tr } from '../hyperscript'
import { numberbox } from '../hyperscript/form'
import { DilutionViewModel } from './DilutionViewModel'


export const inputs = (model = new DilutionViewModel()) => {
    return table(
        thead(
            tr(
                th({ 'style.width': '20%' }, '名称'),
                th({ 'style.width': '10%' }, '单位'),
                th({ 'style.width': '50%' }, '数值'),
                th({ 'style.width': '20%' }, '备注')
            )
        ),
        tbody([
            tr(
                td('溶质量'),
                td('kg/hr'),
                td({ className: 'text-right', }, numberbox({ number: model.solute })),
                td()
            ),

            tr(
                td('原始浓度'),
                td('%'),
                td({ className: 'text-right', }, numberbox({ number: model.concentration })),
                td()
            ),

            tr(
                td('稀释后浓度'),
                td('%'),
                td({ className: 'text-right', }, numberbox({ number: model.diConcentration })),
                td()
            ),

            tr(
                td('原始溶液量'),
                td('kg/hr'),
                td({ className: 'text-right' }, textNode(model.liquor)),
                td()
            ),

            tr(
                td('稀释后溶液量'),
                td('kg/hr'),
                td({ className: 'text-right' }, textNode(model.diLiquor)),
                td()
            ),

            tr(
                td('稀释水量'),
                td('kg/hr'),
                td({ className: 'text-right' }, textNode(model.water)),
                td()
            ),
        ])
    )
}
