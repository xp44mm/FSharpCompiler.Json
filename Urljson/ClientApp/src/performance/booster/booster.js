import { pickout, restore } from '../../deep'
import { button, div, h3, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { BoosterViewModel } from './BoosterViewModel'
import initialData from './initialData.json'

export const booster = (model = new BoosterViewModel()) =>
    div(
        h3('风机出口温度'),

        div(
            { className: 'panel panel-primary' },
            table(
                { className: 'table table-condensed table-bordered' },
                thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
                tbody([
                    tr(
                        td('大气压力'),
                        td('kPa'),
                        td(
                            { className: 'text-right' },
                            numberbox({ number: model.p0 })
                        ),
                        td()
                    ),

                    tr(
                        td('入口压力(gauge)'),
                        td('kPa'),
                        td(
                            { className: 'text-right' },
                            numberbox({ number: model.p1 })
                        ),
                        td()
                    ),

                    tr(
                        td('入口温度'),
                        td('℃'),
                        td(
                            { className: 'text-right' },
                            numberbox({ number: model.t1 })
                        ),
                        td()
                    ),

                    tr(
                        td('Fan Pressure Rise'),
                        td('kPa'),
                        td(
                            { className: 'text-right' },
                            numberbox({ number: model.dp })
                        ),
                        td()
                    ),

                    tr(
                        td('出口压力(gauge)'),
                        td('kPa'),
                        td({ className: 'text-right' }, textNode(model.p2)),
                        td()
                    ),

                    tr(
                        td('出口温度'),
                        td('℃'),
                        td({ className: 'text-right' }, textNode(model.t2)),
                        td()
                    ),
                ]),
                button('重置').subscribeEvent('click', _ => {
                    restore(model, initialData)
                }),
                button('保存').subscribeEvent('click', _ => {
                    let data = pickout(model)
                    console.log(data)
                })
            )
        )
    )
