import { pickout, restore } from '../../deep'
import { button, div, h3, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import initialData from './initialData.json'
import { PumpViewModel } from './PumpViewModel'

export const pump = (model = new PumpViewModel()) =>
    div(
        h3('水泵选型'),

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
                        td('m3/hr'),
                        td({ className: 'text-right' }, numberbox({ number: model.flow })),
                        td()
                    ),

                    tr(
                        td('扬程'),
                        td('m液柱'),
                        td({ className: 'text-right' }, numberbox({ number: model.head })),
                        td()
                    ),

                    tr(
                        td('密度'),
                        td('ton/m3'),
                        td({ className: 'text-right' }, numberbox({ number: model.density })),
                        td()
                    ),

                    tr(
                        td('效率'),
                        td('%'),
                        td({ className: 'text-right' }, numberbox({ number: model.efficiency })),
                        td({ className: 'text-right' }, textNode(model.guessEff))
                    ),

                    tr(
                        td('猜测效率'),
                        td('%'),
                        td({ className: 'text-right' }, textNode(model.guessEff)),
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
            button('重置').subscribeEvent('click', _ => {
                restore(model, initialData)
            }),
            button('保存').subscribeEvent('click', _ => {
                let data = pickout(model)
                console.log(data)
            })


        )
    )
