import { pickout, restore } from '../../deep'
import { button, div, h3, option, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox, select } from '../../hyperscript/form'
import { BucklingViewModel } from './BucklingViewModel'
import initialData from './initialData.json'

let connections = { '固定-自由': 'ff', '固定-铰接': 'fp', '铰接-铰接': 'pp' }

export const buckling = (model = new BucklingViewModel()) => {
    return div(
        h3('轴心受压构件稳定性'),
        div(
            table(
                thead(tr(
                    th({ 'style.width': '10em' }, '名称'),
                    th({ 'style.width': '5em' }, '单位'),
                    th('数值'),
                    th('备注'),
                )),
                tbody(
                    tr(
                        td('连接方式'),
                        td('#'),
                        td(
                            select(
                                {
                                    value: model.connection,
                                },
                                Object.entries(connections).map(
                                    ([text, value]) => option({ text, value })
                                )
                            )
                        ),
                        td()
                    ),

                    tr(
                        td('压杆长度系数'),
                        td('#'),
                        td({ className: 'text-right' }, textNode(model.coeff)),
                        td()
                    ),

                    tr(
                        td('长度'),
                        td('m'),
                        td({ className: 'text-right' }, numberbox({ number: model.length })),
                        td()
                    ),

                    tr(
                        td('截面积'),
                        td('cm2'),
                        td({ className: 'text-right' }, numberbox({ number: model.area })),
                        td()
                    ),

                    tr(
                        td('惯性矩'),
                        td('cm4'),
                        td({ className: 'text-right' }, numberbox({ number: model.moment })),
                        td()
                    ),

                    tr(
                        td('惯性半径'),
                        td('cm'),
                        td({ className: 'text-right' }, textNode(model.radius)),
                        td()
                    ),

                    tr(
                        td('长细比'),
                        td('#'),
                        td({ className: 'text-right' }, textNode(model.ratio)),
                        td('长细比 < 250')
                    ),

                    tr(
                        td('压杆稳定系数'),
                        td('#'),
                        td({ className: 'text-right' }, textNode(model.stable)),
                        td()
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
    )
}
