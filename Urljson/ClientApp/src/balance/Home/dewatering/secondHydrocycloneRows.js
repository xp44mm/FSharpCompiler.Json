import { map } from 'rxjs/operators'
import { b, option, td, tr } from '../../../hyperscript'
import { numberbox, select } from '../../../hyperscript/form'
import { BalanceViewModel, chlorideBleeds, shs } from '../../model'
import { collapse } from '../../../hyperscript/component'

export const secondHydrocycloneRows = (balance = new BalanceViewModel()) => {
    let { dewatering } = balance
    let { secondHydrocyclone: sh } = dewatering

    return [
        tr(
            td('Chloride Bleed'),
            td(),
            td(
                select(
                    { value: dewatering.chlorideBleed },
                    chlorideBleeds.map(text => option({ text }))
                )
            ),
            td()
        ),
        ...collapse(
            dewatering.chlorideBleed
            |> map(cb => cb === 'SH OF'),
            secondHydrocycloneDataRows(balance)
        ),
    ]
}

function secondHydrocycloneDataRows(balance) {
    let { dewatering } = balance
    let { secondHydrocyclone: sh } = dewatering

    let root = [
        tr(td(b('废水旋流站')), td(), td(), td()),

        tr(
            td('Solids'),
            td('%'),
            td({ className: 'text-right' }, numberbox({ number: sh.solids })),
            td()
        ),

        tr(
            td('CaSO4*2H2O'),
            td('kg/hr'),
            td({ className: 'text-right' }, numberbox({ number: sh['CaSO4*2H2O'] })),
            td()
        ),

        tr(
            td('CaSO3*(1/2)H2O'),
            td('kg/hr'),
            td({ className: 'text-right' }, numberbox({ number: sh['CaSO3*(1/2)H2O'] })),
            td()
        ),

        tr(
            td('CaCO3'),
            td('kg/hr'),
            td({ className: 'text-right' }, numberbox({ number: sh.CaCO3 })),
            td()
        ),

        tr(
            td('MgSO4'),
            td('kg/hr'),
            td({ className: 'text-right' }, numberbox({ number: sh.MgSO4 })),
            td()
        ),

        tr(
            td('MgCO3'),
            td('kg/hr'),
            td({ className: 'text-right' }, numberbox({ number: sh.MgCO3 })),
            td()
        ),

        tr(
            td('inerts'),
            td('kg/hr'),
            td({ className: 'text-right' }, numberbox({ number: sh.inerts })),
            td()
        ),

        tr(
            td('Secondary Hydrocyclone Underflow'),
            td(),
            td(
                select(
                    { value: sh.underflow },
                    shs.map(text => option({ text }))
                )
            ),
            td()
        ),
    ]
    return root
}
