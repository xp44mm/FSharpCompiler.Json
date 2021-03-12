import { BehaviorSubject } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { button, option, table, tbody, td, textNode, th, thead, tr } from '../../../hyperscript'
import { flip } from '../../../hyperscript/component'
import { numberbox, select } from '../../../hyperscript/form'
import { suggestDiameter } from '../../bindings/suggestDiameter'
import { suggestNozzleNumber } from '../../bindings/suggestNozzleNumber'
import { availableHeaders, BalanceViewModel } from '../../model'
import { towerRows } from './towerRows'
import { trayRows } from './trayRows'

export const absorberTable = (balance = new BalanceViewModel()) => {
    let { absorber } = balance

    let editMode = new BehaviorSubject('nozzleFlow')
    let pumpFlow_write = new BehaviorSubject(0)

    return table(
        thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
        tbody([
            tr(
                td('烟气流量'),
                td('m3/hr'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.outlet.volume)
                ),
                td()
            ),

            tr(
                td('吸收塔直径'),
                td('m'),
                td({ className: 'text-right' }, numberbox({ number: absorber.diameter })),
                td(
                    button(
                        '推荐'
                    ).subscribeEvent('click', _ => {
                        suggestDiameter(absorber)
                    })
                )
            ),

            tr(
                {
                    className: 'table-danger',
                    '.table-success':
                        absorber.velocity
                        |> map(v => 1.5 < v && v < 6)
                },
                td('流速'),
                td('m/s'),
                td({ className: 'text-right' }, textNode(absorber.velocity)),
                td('1.5~6.0(3.5)')
            ),

            tr(
                td('吸收塔截面积'),
                td('m2'),
                td({ className: 'text-right' }, textNode(absorber.area)),
                td()
            ),

            tr(
                td('喷嘴数量'),
                td('#'),
                td({ className: 'text-right' }, numberbox({ number: absorber.nozzleNumber })),
                td(
                    button(
                        '推荐'
                    ).subscribeEvent('click', _ => {
                        suggestNozzleNumber(absorber)
                    })
                )
            ),

            tr(
                {
                    //咨询供应商
                    className:
                        absorber.nozzleDensity
                        |> map(d => 0.6 < d && d < 1.8)
                        |> map(success => success ? 'table-success' : 'table-danger'),
                },
                td('喷嘴密度'),
                td('#/m2'),
                td(
                    { className: 'text-right' },
                    textNode(absorber.nozzleDensity)
                ),
                td('~1#/m2')
            ),

            tr(
                td('喷嘴流量'),
                td('m3/hr'),
                ...flip(
                    editMode |> map(edit => edit !== 'nozzleFlow'),

                    td({ className: 'text-right' },
                        textNode(absorber.nozzleFlow)
                    ),

                    td({ className: 'text-right' },
                        numberbox({ number: absorber.nozzleFlow })
                    ),
                ),

                td('34~100(60)')
            ),

            tr(
                td('循环泵流量'),
                td('m3/hr'),
                ...flip(
                    editMode |> map(edit => edit !== 'pumpFlow'),
                    [
                        td({ className: 'text-right' }, textNode(absorber.pumpFlow)),
                        td(
                            button('编辑').pipeEvent(
                                'click',
                                click$ =>
                                    click$
                                    |> withLatestFrom(absorber.pumpFlow)
                                    |> map(([_, x]) => x)
                                    |> tap(x => {
                                        editMode.next('pumpFlow')
                                    })
                                    |> (o => o.subscribe(pumpFlow_write))
                            )
                        )
                    ],
                    [
                        td({ className: 'text-right' },
                            numberbox({
                                number: pumpFlow_write,
                            })
                        ),
                        td(
                            button('設定').pipeEvent('click', click$ =>
                                click$
                                |> withLatestFrom(pumpFlow_write, absorber.nozzleNumber)
                                |> map(([_, flow, nozzleNumber]) => flow / nozzleNumber)
                                |> tap(() => {
                                    editMode.next('nozzleFlow')
                                })
                                |> (o => o.subscribe(absorber.nozzleFlow))
                            ),
                            button('取消').subscribeEvent('click', _ => {
                                editMode.next('nozzleFlow')
                            })
                        )
                    ]
                ),
            ),

            tr(
                td('喷淋层6'),
                td(),
                td(
                    select(
                        { value: absorber.sprays[5] },
                        availableHeaders.map(text => option({ text }))
                    )
                ),
                td()
            ),

            tr(
                td('喷淋层5'),
                td(),
                td(
                    select(
                        { value: absorber.sprays[4] },
                        availableHeaders.map(text => option({ text }))
                    )
                ),
                td()
            ),

            tr(
                td('喷淋层4'),
                td(),
                td(
                    select(
                        { value: absorber.sprays[3] },
                        availableHeaders.map(text => option({ text }))
                    )
                ),
                td()
            ),
            tr(
                td('喷淋层3'),
                td(),
                td(
                    select(
                        { value: absorber.sprays[2] },
                        availableHeaders.map(text => option({ text }))
                    )
                ),
                td()
            ),
            tr(
                td('喷淋层2'),
                td(),
                td(
                    select(
                        { value: absorber.sprays[1] },
                        availableHeaders.map(text => option({ text }))
                    )
                ),
                td()
            ),

            tr(
                td('喷淋层1'),
                td(),
                td(
                    select(
                        { value: absorber.sprays[0] },
                        availableHeaders.map(text => option({ text }))
                    )
                ),
                td()
            ),

            ...trayRows(balance),

            tr(
                td('吸收塔入口流速'),
                td('m/s'),
                td({ className: 'text-right' }, numberbox({ number: absorber.inlet.velocity })),
                td()
            ),

            tr(
                td('除雾器压力降'),
                td('Pa'),
                td({ className: 'text-right' }, numberbox({ number: absorber.mistDp })),
                td()
            ),

            tr(
                td('吸收塔出口压力降'),
                td('Pa'),
                td({ className: 'text-right' }, numberbox({ number: absorber.outletDp })),
                td()
            ),

            ...towerRows(balance),
        ])
    )
}
