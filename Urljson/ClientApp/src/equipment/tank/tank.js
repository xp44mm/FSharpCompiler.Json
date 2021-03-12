import { pickout, restore } from '../../deep'
import { button, div, h3, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import initialData from './initialData.json'
import { TankViewModel } from './TankViewModel'

export const tank = (model = new TankViewModel()) =>
    div(
        h3('箱罐'),

        div(
            table(
                thead(tr(
                    th({ 'style.width': '10em' }, '名称'),
                    th({ 'style.width': '5em' }, '单位'),
                    th('数值'),
                    th('备注')
                )),
                tbody(
                    tr(
                        td('直径'),
                        td('m'),
                        td({ className: 'text-right' }, numberbox({ number: model.circle.diameter })),
                        td()
                    ),

                    tr(
                        td('高度'),
                        td('m'),
                        td({ className: 'text-right' }, numberbox({ number: model.height })),
                        td()
                    ),

                    tr(
                        td('有效容积'),
                        td('m3'),
                        td({ className: 'text-right' }, textNode(model.volume)),
                        td()
                    ),

                    tr(
                        td('重量'),
                        td('ton'),
                        td({ className: 'text-right' }, textNode(model.weight)),
                        td()
                    ),

                    tr(
                        td('搅拌器'),
                        td('kW'),
                        td({ className: 'text-right' }, textNode(model.agitator)),
                        td()
                    ),

                    tr(
                        td('双层衬胶的高度'),
                        td('m'),
                        td({ className: 'text-right' }, numberbox({ number: model.liningHeight })),
                        td()
                    ),

                    tr(
                        td('单层衬胶面积'),
                        td('m2'),
                        td({ className: 'text-right' }, textNode(model.singleLining)),
                        td()
                    ),

                    tr(
                        td('双层衬胶面积'),
                        td('m2'),
                        td({ className: 'text-right' }, textNode(model.doubleLining)),
                        td()
                    )
                )
            )
        ),
        button({}, '重置').subscribeEvent('click', _ => {
            restore(model, initialData)
        }),
        button('保存').subscribeEvent('click', _ => {
            let data = pickout(model)
            console.log(data)
        })
    )
