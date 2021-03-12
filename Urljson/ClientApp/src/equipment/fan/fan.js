import { pickout, restore } from '../../deep'
import { button, div, h3, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { FanViewModel } from './FanViewModel'
import initialData from './initialData.json'

export const fan = (model = new FanViewModel()) =>
    div(
        h3('风机选型'),

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
                        td('m3/s'),
                        td({ className: 'text-right' }, numberbox({ number: model.flow })),
                        td()
                    ),

                    tr(
                        td('压升'),
                        td('kPa'),
                        td({ className: 'text-right' }, numberbox({ number: model.pressure })),
                        td()
                    ),
                    tr(
                        td('效率'),
                        td('%'),
                        td({ className: 'text-right' }, numberbox({ number: model.efficiency })),
                        td()
                    ),

                    tr(
                        td('轴功率'),
                        td('kW'),
                        td({ className: 'text-right' }, textNode(model.motor.axialpower)),
                        td()
                    ),

                    tr(
                        td('电机功率'),
                        td('kW'),
                        td({ className: 'text-right' }, textNode(model.motor.power)),
                        td()
                    ),

                    tr(
                        td('电机安全余量'),
                        td('%'),
                        td({ className: 'text-right' }, textNode(model.motor.motorMargin)),
                        td()
                    )
                )
            ),
            button({}, '重置').subscribeEvent('click', _ => {
                restore(model, initialData)
            })
            ,
            button('保存').subscribeEvent('click', _ => {
                let data = pickout(model)
                console.log(data)
            })


        )
    )
