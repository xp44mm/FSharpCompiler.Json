import { b, td, textNode, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'
import { CoalViewModel } from '../../model/CoalViewModel'

export const coalAnalysisRows = (coal = new CoalViewModel()) => [
    tr(
        td(b('煤收到基')),
        td(),
        td(),
        td(),
    ),

    tr(
        td('C'),
        td('wt. %'),
        td({ className: 'text-right' },
            numberbox({ number: coal.C })
        ),
        td(),
    ),

    tr(
        td('H'),
        td('wt. %'),
        td({ className: 'text-right' },
            numberbox({ number: coal.H })
        ),
        td(),
    ),

    tr(
        td('O'),
        td('wt. %'),
        td({ className: 'text-right' },
            numberbox({ number: coal.O })
        ),
        td(),
    ),

    tr(
        td('N'),
        td('wt. %'),
        td({ className: 'text-right' },
            numberbox({ number: coal.N })
        ),
        td(),
    ),

    tr(
        td('S'),
        td('wt. %'),
        td({ className: 'text-right' },
            numberbox({ number: coal.S })
        ),
        td(),
    ),

    tr(
        td('H2O'),
        td('wt. %'),
        td({ className: 'text-right' },
            numberbox({ number: coal.H2O })
        ),
        td(),
    ),

    tr(
        td('Ash'),
        td('wt. %'),
        td({ className: 'text-right' },
            textNode(coal.A)
        ),
        td(),
    ),

]
