import { b, table, tbody, td, textNode, th, thead, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'

import { BalanceViewModel } from '../../model'

export const limestoneTable = (balance = new BalanceViewModel()) => {
    let { limestone } = balance
    return table(
        thead(tr(
            th('名称'),
            th('单位'),
            th('数值'),
            th('备注'),
        )),

        tbody(
            tr(
                td(b('石灰石')),
                td(),
                td(),
                td(),
            ),
            tr(
                td('MgCO3 Availability'),
                td('%'),
                td({ className: 'text-right' }, numberbox({ number: limestone.availableMgCO3 })),
                td(),
            ),

            tr(
                td('CaCO3'),
                td('wt %'),
                td({ className: 'text-right' }, numberbox({ number: limestone.CaCO3 })),
                td(),
            ),

            tr(
                td('MgCO3'),
                td('wt %'),
                td({ className: 'text-right' }, numberbox({ number: limestone.MgCO3 })),
                td(),
            ),

            tr(
                td('inerts'),
                td('wt %'),
                td({ className: 'text-right' }, textNode(limestone.inerts)),
                td(),
            ),

            tr(
                td('Limestone Solids'),
                td('wt %'),
                td({ className: 'text-right' }, numberbox({ number: limestone.solids })),
                td(),
            ),

            tr(
                td('Ca / SO2 Stoich'),
                td('#'),
                td({ className: 'text-right' }, numberbox({ number: limestone.stoich })),
                td('1.02~1.1(1.03)'),
            ),

            tr(
                td('Grind'),
                td('% passing 325 mesh'),
                td({ className: 'text-right' }, numberbox({ number: limestone.grind })),
                td('65~95'),
            ),

            tr(
                td('石灰石浆液含固量'),
                td('wt %'),
                td({ className: 'text-right' }, numberbox({ number: limestone.slurrySolids })),
                td(),
            ),

        ),
    )
}
