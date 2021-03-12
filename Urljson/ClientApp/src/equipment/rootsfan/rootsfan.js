import { pickout, restore } from '../../deep'
import { button, div, h3, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import initialData from './initialData.json'
import { RootsfanViewModel } from './RootsfanViewModel'

export const rootsfan = (model = new RootsfanViewModel()) =>
    div(
        h3('罗茨风机选型'),

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
                        td('流量'),
                        td('m3/min'),
                        td({ className: 'text-right' }, 
                            numberbox({ number: model.flow }) //todo:按系列选择！
                        ),
                        td('靠档流量')
                    ),

                    tr(
                        td('压升'),
                        td('kPa'),
                        td({ className: 'text-right' }, numberbox({ number: model.pressure })), //todo:按系列选择！
                        td('靠档压力')
                    ),

                    tr(
                        td('电机功率'),
                        td('kW'),
                        td({ className: 'text-right' }, textNode(model.motor)),
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
