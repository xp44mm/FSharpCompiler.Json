import { pickout, restore } from '../../deep'
import { button, div, h3, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { BuoyantViewModel } from './BuoyantViewModel'
import initialData from './initialData.json'

export const buoyant = (model = new BuoyantViewModel()) =>
    div(
        h3('浮力'),

        div(
            table(
                thead(tr(
                    th({ 'style.width': '10em' },'名称'),
                    th({ 'style.width': '5em' },'单位'),
                    th('数值'),
                )),
                tbody(
                    tr(
                        td('深度'),
                        td('m'),
                        td({ className: 'text-right', }, numberbox({ number: model.depth }))
                    ),

                    tr(
                        td('密度'),
                        td('kg/m3'),
                        td({ className: 'text-right', }, numberbox({ number: model.density }))
                    ),

                    tr(
                        td('浮力'),
                        td('kPa'),
                        td({ className: 'text-right', }, textNode(model.buoyant))
                    )
                )
            ),
            button('重置').subscribeEvent('click', _ => {
                restore(model, initialData)
            }),
            button('保存').subscribeEvent('click', _ => {
                let data = pickout(model)
                console.log(data)
            })
        )
    )
