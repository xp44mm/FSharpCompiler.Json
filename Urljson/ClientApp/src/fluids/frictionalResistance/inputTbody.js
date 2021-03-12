import { tbody, td, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { FrictionalResistanceViewModel } from './frictionalResistanceViewModel'

export const inputTbody = (model = new FrictionalResistanceViewModel()) =>
    tbody([
        tr(
            td('密度'),
            td('kg/m3'),
            td({ className: 'text-right' }, numberbox({ number: model.density })),
            td()
        ),

        tr(
            td('含固量'),
            td('%'),
            td({ className: 'text-right' }, numberbox({ number: model.solids })),
            td()
        ),

        tr(
            td('流量'),
            td('m3/hr'),
            td({ className: 'text-right' }, numberbox({ number: model.flow })),
            td()
        ),

        tr(
            td('管道直径'),
            td('mm'),
            td({ className: 'text-right' }, numberbox({ number: model.diameter })),
            td()
        ),
    ])
