import { tbody, td, tr } from '../../hyperscript'
import { numberbox, } from '../../hyperscript/form'

import { InputViewModel } from './RectangleBendViewModel'

export const inputTbody = (model = new InputViewModel()) =>
    tbody({ key: 'input' }, [
        tr(
            td('入口宽度'),
            td('m'),
            td({ className: 'text-right' }, numberbox({ number: model.widthInlet })),
            td()
        ),
        tr(
            td('出口宽度'),
            td('m'),
            td({ className: 'text-right' }, numberbox({ number: model.widthOutlet })),
            td()
        ),
        tr(
            td('高度'),
            td('m'),
            td({ className: 'text-right' }, numberbox({ number: model.height })),
            td()
        ),
        tr(
            td('半径'),
            td('m'),
            td({ className: 'text-right' }, numberbox({ number: model.radius })),
            td()
        ),
        tr(
            td('转角'),
            td('°'),
            td({ className: 'text-right' }, numberbox({ number: model.angle })),
            td()
        ),
    ])
