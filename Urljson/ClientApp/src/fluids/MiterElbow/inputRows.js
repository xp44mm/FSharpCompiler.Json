import { tbody, td, tr } from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'

export const inputRows = data =>
    tbody([
        tr(
            td('直径(D)'),
            td('m'),
            td({ className: 'text-right' }, numberbox({ number: data.diameter })),
            td()
        ),
        tr(
            td('半径(R)'),
            td('m'),
            td({ className: 'text-right' }, numberbox({ number: data.radius })),
            td()
        ),
        tr(
            td('转角'),
            td('°'),
            td({ className: 'text-right' }, numberbox({ number: data.angle })),
            td()
        ),
    ])
