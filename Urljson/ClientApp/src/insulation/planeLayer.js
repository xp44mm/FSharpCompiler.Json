import { option, tbody, td, textNode, tr } from '../hyperscript'
import { numberbox, select } from '../hyperscript/form'
import { availableInsulas, PlaneLayerViewModel } from './model'

export const planeLayer = (model = new PlaneLayerViewModel()) =>
    tbody([
        tr(
            td('保温材料'),
            td('#'),
            td(
                select(
                    { value: model.insula },
                    availableInsulas.map(text => option({ text }))
                )
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
            td('保温外表面温度'),
            td('℃'),
            td({ className: 'text-right', }, textNode(model.outerTemperature)),
            td()
        ),
    ])
