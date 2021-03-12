import { td, tr } from '../../../hyperscript'
import { collapse } from '../../../hyperscript/component'
import { checkbox, numberbox } from '../../../hyperscript/form'

import { BalanceViewModel } from '../../model'

export const flareRows = (balance = new BalanceViewModel()) => {
    let { tower } = balance
    return [
        tr(
            td(checkbox({ checked: tower.isFlare }), '变径塔？'),
            td(),
            td(),
            td()
        ),
        ...collapse(tower.isFlare, [
            tr(
                td('变径宽'),
                td('m'),
                td({ className: 'text-right' }, numberbox({ number: tower.flare })),
                td()
            ),

            tr(
                td('变径高'),
                td('m'),
                td({ className: 'text-right' }, numberbox({ number: tower.flareHeight })),
                td()
            ),
        ]),
    ]
}
