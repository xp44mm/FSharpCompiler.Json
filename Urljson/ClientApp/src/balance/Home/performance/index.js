import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { b, option, table, tbody, td, textNode, th, thead, tr } from '../../../hyperscript'
import { checkbox, numberbox, select } from '../../../hyperscript/form'
import { acidTypes, BalanceViewModel } from '../../model'

export const performanceTable = (balance = new BalanceViewModel()) => {
    let {
        absorber,
        tower,
        performance,
        limestone,
        nozzle,
        hasQuench,
        acidType,
        acidConc,
    } = balance

    return table(
        { className: 'table-sm table-bordered table-hover' },
        thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
        tbody(
            tr(
                td('Header Type'),
                td(),
                td(textNode(absorber.headerType)),
                td()
            ),

            tr(
                td('Margin'),
                td('% safety'),
                td({ className: 'text-right' }, numberbox({ number: performance.margin })),
                td(textNode(performance.risk))
            ),

            tr(
                td('rtu Margin'),
                td(),
                td(
                    { className: 'text-right' },
                    textNode(performance.rtu.margin)
                ),
                td()
            ),

            tr(td('Tower Type'), td(), td(textNode(absorber.towerType)), td()),

            tr(
                td('Base rtu'),
                td(),
                td({ className: 'text-right' }, textNode(performance.rtu.base)),
                td()
            ),

            tr(
                td('Stoich Ca/S'),
                td('mole Ca/mole SO2 rem'),
                td({ className: 'text-right' }, textNode(limestone.stoich)),
                td()
            ),

            tr(
                td('rtu Stoich Ca/S'),
                td(),
                td({ className: 'text-right' }, textNode(performance.rtu.sr)),
                td()
            ),

            tr(
                td('Grind'),
                td('% passing 325 mesh'),
                td({ className: 'text-right' }, textNode(limestone.grind)),
                td()
            ),

            tr(
                td('rtu Grind'),
                td(),
                td(
                    { className: 'text-right' },
                    textNode(performance.rtu.grind)
                ),
                td()
            ),

            tr(
                {
                    className:
                        absorber.inlet.ppmSO2
                        |> map(ppmSO2 => 200 < ppmSO2 && ppmSO2 < 4000)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('吸收塔入口SO2（dry,real O2）'),
                td('ppmdv'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.inlet.ppmSO2)
                ),
                td('200~4000')
            ),

            tr(
                td('rtu 入口SO2'),
                td(),
                td({ className: 'text-right' }, textNode(performance.rtu.SO2)),
                td()
            ),

            tr(
                td('Solids'),
                td('%'),
                td({ className: 'text-right' }, textNode(tower.solids)),
                td()
            ),

            tr(
                td('rtu Solids'),
                td(),
                td(
                    { className: 'text-right' },
                    textNode(performance.rtu.solids)
                ),
                td()
            ),

            tr(td(b('Nozzle')), td(), td(), td()),

            tr(
                td('喷嘴压力降'),
                td('MPa'),
                td({ className: 'text-right' }, numberbox({ number: nozzle.pressureDrop })),
                td('0.05~0.14')
            ),

            tr(
                td('喷射角'),
                td('°'),
                td({ className: 'text-right' }, numberbox({ number: nozzle.angle })),
                td('90~120')
            ),

            tr(
                td('rtu 喷嘴'),
                td(),
                td(
                    { className: 'text-right' },
                    textNode(performance.rtu.nozzle)
                ),
                td()
            ),

            tr(
                td('rtu pH'),
                td(),
                td({ className: 'text-right' }, textNode(performance.rtu.pH)),
                td()
            ),

            tr(
                td('吸收塔流速'),
                td('m/s'),
                td({ className: 'text-right' }, textNode(absorber.velocity)),
                td()
            ),

            tr(
                td('rtu 吸收塔流速'),
                td(),
                td(
                    { className: 'text-right' },
                    textNode(performance.rtu.velocity)
                ),
                td()
            ),

            tr(
                td('Levels'),
                td(),
                td(
                    { className: 'text-right' },
                    textNode(absorber.operatingHeaders)
                ),
                td('1~5')
            ),

            tr(
                td('L/G @ 3.048 m/s'),
                td('l/m3'),
                td({ className: 'text-right' }, textNode(absorber.stdLg)),
                td()
            ),

            tr(
                td('rtu L/G'),
                td(),
                td({ className: 'text-right' }, textNode(performance.rtu.lg)),
                td()
            ),

            tr(
                {
                    className:
                        absorber.spraysStdDp
                        |> map(dp => 250 < dp && dp < 1500)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('喷淋层压力降，3.048 m/s'),
                td('Pa'),
                td({ className: 'text-right' }, textNode(absorber.spraysStdDp)),
                td('250~1500')
            ),

            tr(
                {
                    className:
                        absorber.tray.stdPressureDrop
                        |> map(dp => dp < 747.246)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('托盘压力降，3.048 m/s'),
                td('Pa'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.tray.stdPressureDrop)
                ),
                td('max 747.246')
            ),

            tr(
                td('下喷淋层压力降'),
                td('Pa'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.undersprayPressureDrop)
                ),
                td()
            ),

            tr(
                td('吸收区压力降，3.048 m/s'),
                td('Pa'),
                td({ className: 'text-right' }, textNode(absorber.stdDp)),
                td('喷淋层+托盘+下喷淋层')
            ),

            tr(
                td('rtu 吸收塔压力降'),
                td(),
                td({ className: 'text-right' }, textNode(performance.rtu.dp)),
                td()
            ),

            tr(
                td('通量'),
                td('(m3/hr)/m2'),
                td({ className: 'text-right' }, textNode(absorber.flux)),
                td()
            ),

            tr(
                td('Cl离子'),
                td('ppmwt'),
                td({ className: 'text-right' }, textNode(tower.concCl)),
                td()
            ),

            tr(
                td('rtu Cl离子'),
                td(),
                td({ className: 'text-right' }, textNode(performance.rtu.Cl)),
                td()
            ),

            tr(
                td('Has Quench?'),
                td(),
                td(checkbox({ checked: hasQuench })),
                td()
            ),

            tr(
                td('rtu Quench'),
                td(),
                td(
                    { className: 'text-right' },
                    textNode(performance.rtu.quench)
                ),
                td()
            ),

            tr(
                td('Acid Type'),
                td(),
                td(
                    select(
                        { value: acidType },
                        acidTypes.map(text => option({ text }))
                    )
                ),
                td()
            ),

            tr(
                {
                    'style.display':
                        acidType
                        |> map(t => (t === 'None' ? 'none' : 'table-row')),
                },
                td('Acid 浓度'),
                td('ppm'),
                td({ className: 'text-right' }, numberbox({ number: acidConc })),
                td()
            ),

            tr(
                td('rtu Acid'),
                td(),
                td({ className: 'text-right' }, textNode(performance.rtu.acid)),
                td()
            ),

            tr(
                td('ntu'),
                td(),
                td({ className: 'text-right' }, textNode(performance.ntu)),
                td()
            ),

            tr(
                {
                    className:
                        combineLatest(
                            performance.efficiency,
                            balance.effect.SO2
                        )
                        |> map(([act, inp]) => act > inp)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('脱硫效率'),
                td('%'),
                td(
                    { className: 'text-right' },
                    textNode(performance.efficiency)
                ),
                td({ className: 'text-right' }, textNode(balance.effect.SO2))
            )
        )
    )
}
