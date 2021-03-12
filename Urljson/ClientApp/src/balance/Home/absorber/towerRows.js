import { b, td, textNode, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'

import { BalanceViewModel } from '../../model'
import { flareRows } from './flareRows'

export const towerRows = (balance = new BalanceViewModel()) => {
    let { tower, gypsumBleed } = balance

    return [
        tr(td(b('吸收塔浆池')), td(), td(), td()),

        tr(
            td('High'),
            td('m'),
            td({ className: 'text-right' }, numberbox({ number: tower.high })),
            td()
        ),

        tr(
            td('Injection Elevation'),
            td('m'),
            td({ className: 'text-right' }, numberbox({ number: tower.injectElevation })),
            td()
        ),

        ...flareRows(balance),

        tr(
            td('Absorber Solids'),
            td('%'),
            td({ className: 'text-right' }, numberbox({ number: tower.solids })),
            td('10~20')
        ),

        tr(
            td('Cl Conc'),
            td('ppmwt'),
            td({ className: 'text-right' }, numberbox({ number: tower.concCl })),
            td('max 120k')
        ),

        tr(
            td('Slurry Density'),
            td('kg/m3'),
            td({ className: 'text-right' }, textNode(gypsumBleed.density)),
            td()
        ),
    ]
}
