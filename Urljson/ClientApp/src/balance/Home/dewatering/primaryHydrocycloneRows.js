import { option, td, th, tr } from '../../../hyperscript'
import { numberbox, select } from '../../../hyperscript/form'
import { BalanceViewModel, phs } from '../../model'

export const primaryHydrocycloneRows = (balance = new BalanceViewModel()) => {
    let {
        dewatering: { primaryHydrocyclone: ph },
    } = balance

    return [
        tr(th('石膏旋流站'), td(), td(), td()),

        tr(
            td('Solids'),
            td('%'),
            td({ className: 'text-right' }, numberbox({ number: ph.solids })),
            td()
        ),

        tr(
            td('CaSO4*2H2O'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: ph['CaSO4*2H2O'] })),
            td()
        ),

        tr(
            td('CaSO3*(1/2)H2O'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: ph['CaSO3*(1/2)H2O'] })),
            td()
        ),

        tr(
            td('CaCO3'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: ph.CaCO3 })),
            td()
        ),

        tr(
            td('MgSO4'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: ph.MgSO4 })),
            td()
        ),

        tr(
            td('MgCO3'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: ph.MgCO3 })),
            td()
        ),

        tr(
            td('inerts'),
            td('split %'),
            td({ className: 'text-right' }, numberbox({ number: ph.inerts })),
            td()
        ),

        tr(
            td('Primary Hydrocyclone Overflow'),
            td(),
            td(
                select(
                    { value: ph.overflow },
                    phs.map(text => option({ text }))
                )
            ),
            td()
        ),
    ]
}
