import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { table, tbody, td, textNode, th, thead, tr } from '../../../hyperscript'
import { collapse } from '../../../hyperscript/component'
import { BalanceViewModel } from '../../model'

export const towerResultTable = (balance = new BalanceViewModel()) => {
    let { absorber, tower, oxiair, limestone, effect } = balance

    return table(
        { className: 'table-sm table-bordered table-hover' },
        thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
        tbody([
            tr(
                td('吸收塔直径'),
                td('m'),
                td({ className: 'text-right' }, textNode(absorber.diameter)),
                td()
            ),
            tr(
                td('喷嘴数量'),
                td('#'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.nozzleNumber)
                ),
                td('最小数量，可以增加')
            ),

            tr(
                td('循环泵流量'),
                td('m3/hr'),
                td({ className: 'text-right' }, textNode(absorber.pumpFlow)),
                td()
            ),

            tr(
                td('喷淋层数'),
                td('#'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.operatingHeaders)
                ),
                td()
            ),

            tr(
                td('吸收塔类型'),
                td(),
                td(textNode(absorber.towerType)),
                td()
            ),

            ...collapse(
                absorber.towerType |> map(tt => tt === 'Tray Tower'),
                tr(
                    td('托盘开孔率'),
                    td('%'),
                    td(
                        { className: 'text-right' },
                        textNode(absorber.tray.openArea)
                    ),
                    td()
                ),

                tr(
                    {
                        className:
                            combineLatest(
                                absorber.tray.velocity,
                                absorber.tray.maxVel
                            )
                            |> map(([v, vx]) => 4.8768 < v && v < vx)
                            |> map(
                                success =>
                                    success ? 'table-success' : 'table-danger'
                            ),
                    },
                    td('托盘开孔流速'),
                    td('m/s'),
                    td(
                        { className: 'text-right' },
                        textNode(absorber.tray.velocity)
                    ),
                    td('4.8768~', textNode(absorber.tray.maxVel))
                ),

                tr(
                    {
                        className:
                            absorber.tray.ng
                            |> map(ng => {
                                let gohara = 8 * 0.1336805471
                                return ng < gohara
                            })
                            |> map(
                                success =>
                                    success ? 'table-success' : 'table-danger'
                            ),
                    },
                    td('托盘 Ng'),
                    td('# @ 3.048 m/s'),
                    td({ className: 'text-right' }, textNode(absorber.tray.ng)),
                    td('max 1.07')
                ),

                tr(
                    td('有下层喷淋层？'),
                    td(),
                    td(
                        textNode(
                            absorber.hasUndertrayHeader,
                            map(u => (u ? '有' : '无'))
                        )
                    ),
                    td()
                )
            ),

            tr(
                td('喷淋层压力降'),
                td('Pa'),
                td({ className: 'text-right' }, textNode(absorber.spraysDp)),
                td()
            ),

            tr(
                {
                    'style.display':
                        absorber.towerType
                        |> map(
                            tt => (tt == 'Tray Tower' ? 'table-row' : 'none')
                        ),
                },
                td('托盘压力降'),
                td('Pa'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.tray.pressureDrop)
                ),
                td()
            ),

            tr(
                {
                    'style.display':
                        absorber.hasUndertrayHeader
                        |> map(x => (x ? 'table-row' : 'none')),
                },
                td('下喷淋层压力降'),
                td('Pa'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.undersprayPressureDrop)
                ),
                td()
            ),

            tr(
                td('吸收塔入口压力降'),
                td('Pa'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.inlet.pressureDrop)
                ),
                td()
            ),

            tr(
                {
                    className:
                        absorber.lg
                        |> map(lg => 5.35 < lg && lg < 20.05)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('L/G'),
                td('l/m3'),
                td({ className: 'text-right' }, textNode(absorber.lg)),
                td('5.35~20.05')
            ),

            tr(
                td('浆池顶标高'),
                td('m'),
                td({ className: 'text-right' }, textNode(tower.high)),
                td()
            ),

            ...collapse(tower.isFlare, [
                tr(
                    td('变径宽'),
                    td('m'),
                    td({ className: 'text-right' }, textNode(tower.flare)),
                    td()
                ),

                tr(
                    td('变径高'),
                    td('m'),
                    td(
                        { className: 'text-right' },
                        textNode(tower.flareHeight)
                    ),
                    td()
                ),
            ]),
            tr(
                td('设计液位'),
                td('m'),
                td({ className: 'text-right' }, textNode(tower.dll)),
                td()
            ),

            tr(
                td('氧化空气注入标高'),
                td('m'),
                td(
                    { className: 'text-right' },
                    textNode(tower.injectElevation)
                ),
                td()
            ),

            tr(
                td('吸收塔浆液体积'),
                td('m3'),
                td({ className: 'text-right' }, textNode(tower.slurryVolume)),
                td()
            ),

            tr(
                td('Solids Mass'),
                td('kg'),
                td({ className: 'text-right' }, textNode(tower.solidsMass)),
                td()
            ),

            tr(
                {
                    className:
                        combineLatest(tower.minO2, oxiair.feed.O2)
                        |> map(([m, f]) => m < f)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('最小氧气量'),
                td('kg/hr'),
                td({ className: 'text-right' }, textNode(tower.minO2)),
                td(
                    { className: 'text-right' },
                    '风机: ',
                    textNode(oxiair.feed.O2)
                )
            ),

            tr(
                {
                    className:
                        combineLatest(
                            tower.injectPressure,
                            oxiair.compress.pressure
                        )
                        |> map(([i, c]) => c - 3000 > i)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('氧化空气注入压力'),
                td('Pa'),
                td({ className: 'text-right' }, textNode(tower.injectPressure)),
                td(
                    { className: 'text-right' },
                    '风机克服管道: ',
                    textNode(oxiair.compress.pressure, map(p => p - 3000))
                )
            ),

            tr(
                {
                    className:
                        tower.retentionTime
                        |> map(t => 4 < t && t < 5)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('液体停留时间'),
                td('min'),
                td({ className: 'text-right' }, textNode(tower.retentionTime)),
                td('4~5')
            ),

            tr(
                {
                    className:
                        tower.residenceTime
                        |> map(t => 10 < t && t < 30)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('固体停留时间'),
                td('hr'),
                td({ className: 'text-right' }, textNode(tower.residenceTime)),
                td('10~30')
            ),

            tr(
                td('Ca / SO2 Stoich'),
                td('#'),
                td({ className: 'text-right' }, textNode(limestone.stoich)),
                td('1.02~1.1(1.03)')
            ),

            tr(
                {
                    className:
                        tower.pH
                        |> map(pH => 4.8 < pH && pH < 6)
                        |> map(
                            success =>
                                success ? 'table-success' : 'table-danger'
                        ),
                },
                td('pH'),
                td('#'),
                td({ className: 'text-right' }, textNode(tower.pH)),
                td('4.8~6.0(5.5)')
            ),

            tr(
                td('塔内SO2脱除率'),
                td('%'),
                td({ className: 'text-right' }, textNode(effect.SO2)),
                td()
            ),
        ])
    )
}
