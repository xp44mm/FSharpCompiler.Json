import { pickout, restore } from '../../deep'
import { button, div, h3, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { CavitationErosionViewModel } from './CavitationErosionViewModel'
import initialData from './initialData.json'


export const cavitationErosion = (model = new CavitationErosionViewModel()) =>
    div(
        h3('气蚀'),

        div(
            { className: 'panel panel-primary' },
            table(
                { className: 'table table-condensed table-bordered' },
                thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
                tbody([
                    tr(
                        td('气蚀裕量'),
                        td('m'),
                        td(
                            { className: 'text-right' },
                            numberbox({ number: model.margin })
                        ),
                        td('说明书上标示的汽蚀余量')
                    ),

                    tr(
                        td('液体密度'),
                        td('kg/m3'),
                        td(
                            { className: 'text-right' },
                            numberbox({ number: model.density })
                        ),
                        td()
                    ),

                    tr(
                        td('压力(gauge)'),
                        td('kPa'),
                        td({ className: 'text-right' }, textNode(model.depth)),
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
