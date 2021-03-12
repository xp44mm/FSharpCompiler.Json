import { pickout, restore } from '../../deep'
import { button, div, h3, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { AshLoadViewModel } from './AshLoadViewModel'
import initialData from './initialData.json'

export const ashLoad = (model = new AshLoadViewModel()) =>
    div(
        h3('烟道灰荷载计算'),

        div(
            table(
                thead(tr(
                    th({ 'style.width': '10em' }, '名称'),
                    th({ 'style.width': '5em' }, '单位'),
                    th('数值'),
                )),
                tbody(
                    tr(
                        td('灰密度'),
                        td('kN/m3'),
                        td({ className: 'text-right' }, numberbox({ number: model.density }))
                    ),

                    tr(
                        td('截面高度'),
                        td('m'),
                        td({ className: 'text-right' }, numberbox({ number: model.height }))
                    ),

                    tr(
                        td('积灰分数'),
                        td('#'),
                        td({ className: 'text-right' }, numberbox({ number: model.denominator }))
                    ),

                    tr(
                        td('烟道倾角'),
                        td('°'),
                        td({ className: 'text-right' }, numberbox({ number: model.angle }))
                    ),
                    tr(
                        td('灰荷载'),
                        td('kPa'),
                        td({ className: 'text-right' }, textNode(model.ashLoad))
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
