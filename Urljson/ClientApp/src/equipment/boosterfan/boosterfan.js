import { pickout, restore } from '../../deep'
import { b, button, div, h3, table, tbody, td, textNode, tfoot, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { BoosterfanViewModel } from './BoosterfanViewModel'
import initialData from './initialData.json'

export const boosterfan = (model = new BoosterfanViewModel()) =>
    div(
        h3('增压风机选型'),

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
                        td('大气压力'),
                        td('kPa'),
                        td({ className: 'text-right' }, numberbox({ number: model.p0 })),
                        td()
                    ),

                    tr(
                        td('风机入口压力'),
                        td('kPa'),
                        td({ className: 'text-right' }, numberbox({ number: model.pin })),
                        td(
                        )
                    ),

                    tr(
                        td('风机效率'),
                        td('%'),
                        td({ className: 'text-right' }, numberbox({ number: model.efficiency })),
                        td()
                    ),

                    tr(td(b('BMCR')), td(), td(), td()),

                    tr(
                        td('压升'),
                        td('kPa'),
                        td({ className: 'text-right' }, numberbox({ number: model.bmcr.pressure })),
                        td()
                    ),

                    tr(
                        td('温度'),
                        td('℃'),
                        td({ className: 'text-right' }, numberbox({ number: model.bmcr.temperature })),
                        td()
                    ),

                    tr(
                        td('标态流量'),
                        td('Nm3/s'),
                        td({ className: 'text-right' }, numberbox({ number: model.bmcr.stdflow })),
                        td()
                    ),

                    tr(
                        td('实际流量'),
                        td('m3/s'),
                        td({ className: 'text-right' }, textNode(model.bmcr.flow)),
                        td()
                    ),

                    tr(
                        td('轴功率'),
                        td('kW'),
                        td({ className: 'text-right' }, textNode(model.bmcr.axial)),
                        td()
                    ),

                    tr(td(b('TB')), td(), td(), td()),

                    tr(
                        td('压升'),
                        td('kPa'),
                        td({ className: 'text-right' }, textNode(model.tb.pressure)),
                        td()
                    ),

                    tr(
                        td('温度'),
                        td('℃'),
                        td({ className: 'text-right' }, textNode(model.tb.temperature)),
                        td()
                    ),

                    tr(
                        td('标态流量'),
                        td('Nm3/s'),
                        td({ className: 'text-right' }, textNode(model.tb.stdflow)),
                        td()
                    ),

                    tr(
                        td('实际流量'),
                        td('m3/s'),
                        td({ className: 'text-right' }, textNode(model.tb.flow)),
                        td()
                    ),

                    tr(
                        td('轴功率'),
                        td('kW'),
                        td({ className: 'text-right' }, textNode(model.tb.axial)),
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
                ),
                tfoot(tr(
                    td(
                        button({}, '重置').subscribeEvent('click', _ => {
                            restore(model, initialData)
                        })

                    ),
                    td(
                        button('保存').subscribeEvent('click', _ => {
                            let data = pickout(model)
                            console.log(data)
                        })

                    )
                )),
            )
        )
    )
