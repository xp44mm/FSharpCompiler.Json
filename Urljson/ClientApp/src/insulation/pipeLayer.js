import { numberbox, tbody, td, textNode, tr } from '../hyperscript'
import { select } from '../hyperscript/form'
import { availableInsulas, PipeLayerViewModel } from './model'

export const pipeLayer = (model = new PipeLayerViewModel()) =>
    tbody(
        tr(
            td('保温材料'),
            td('#'),
            td(
                select(
                    { value: model.insula },
                    availableInsulas.map(text => option({ text }))
                ),
                td()
            ),

            tr(
                td('保温最高使用温度'),
                td('℃'),
                td({ className: 'text-right', }, textNode(model.maxTemperature)),
                td()
            ),

            tr(
                td('保温厚度'),
                td('mm'),
                td({ className: 'text-right', }, numberbox({ number: model.thick })),
                td()
            ),

            tr(
                td('保温外直径'),
                td('mm'),
                td({ className: 'text-right', }, textNode(model.d1)),
                td()
            ),

            tr(
                td('保温外表面温度'),
                td('℃'),
                td({ className: 'text-right', }, textNode(model.outerTemperature)),
                td()
            )
        )
    )
