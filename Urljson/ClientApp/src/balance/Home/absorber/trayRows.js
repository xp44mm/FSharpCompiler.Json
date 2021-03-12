import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { option, td, textNode, tr } from '../../../hyperscript'
import { collapse } from '../../../hyperscript/component'
import { checkbox, numberbox, select } from '../../../hyperscript/form'
import { BalanceViewModel, towerTypes } from '../../model'

export const trayRows = (balance = new BalanceViewModel()) => {
    let { absorber } = balance

    return [
        tr(
            td('吸收塔类型'),
            td(),
            td(
                select(
                    { value: absorber.towerType },
                    towerTypes.map(text => option({ text }))
                )
            ),
            td()
        ),
        ...collapse(
            absorber.towerType
            |> map(tt => tt === 'Tray Tower'),
            [
                tr(
                    td('托盘开孔率'),
                    td('%'),
                    td({ className: 'text-right' }, numberbox({ number: absorber.tray.openArea })),
                    td('max 45')
                ),

                tr(
                    td(
                        checkbox({ checked: absorber.hasUndertrayHeader }),
                        '有托盘下喷淋层？'
                    ),
                    td('m3/hr'),
                    td({ className: 'text-right' },
                        textNode(
                            combineLatest(
                                absorber.hasUndertrayHeader,
                                absorber.undertrayPumpFlow
                            )
                            |> map(([a, b]) => a && b)
                        )
                    ),
                    td()
                ),
            ]),
    ]
}
