import { td, th, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'

import { BalanceViewModel } from '../../model'

//vacuumFilter
export const vacuumFilterRows = (balance = new BalanceViewModel()) => {
    let { vacuumFilter: vf } = balance.dewatering
    return [
        tr(th(('真空皮带机')), td(), td(), td()),

        tr(
            td('Gypsum Solids'),
            td('%'),
            td({ className: 'text-right' }, numberbox({ number: vf.solids })),
            td()
        ),

        tr(
            td('Gypsum Cl conc'),
            td('ppmwt'),
            td({ className: 'text-right' }, numberbox({ number: vf.concCl })),
            td()
        ),

        tr(
            td('CaSO4*2H2O'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: vf['CaSO4*2H2O'] })),
            td()
        ),

        tr(
            td('CaSO3*(1/2)H2O'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: vf['CaSO3*(1/2)H2O'] })),
            td()
        ),

        tr(
            td('CaCO3'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: vf.CaCO3 })),
            td()
        ),

        tr(
            td('MgSO4'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: vf.MgSO4 })),
            td()
        ),

        tr(
            td('MgCO3'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: vf.MgCO3 })),
            td()
        ),

        tr(
            td('inerts'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: vf.inerts })),
            td()
        ),

        tr(td('ash'), td('split %'), td({ className: 'text-right' }, numberbox({ number: vf.ash })), td()),

        tr(td('CaF2'), td('split %'), td({ className: 'text-right' }, numberbox({ number: vf.CaF2 })), td()),

        tr(td('MgF2'), td('split %'), td({ className: 'text-right' }, numberbox({ number: vf.MgF2 })), td()),
    ]
}
