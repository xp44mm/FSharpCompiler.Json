import { BehaviorSubject } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { b, button,  table, tbody, td, textNode, th, thead, tr } from '../../../hyperscript'
import { numberbox } from '../../../hyperscript/form'

import { flip } from '../../../hyperscript/component'
import { BalanceViewModel } from '../../model'
import { flueGasRows } from './flueGasRows'

export const gasAnalysisTable = (balance = new BalanceViewModel()) => {
    let {
        gasParameters: { vcorrect, baseO2, temperature, pressureg },
        combustion: {
            realGas: { baseFactor, dry, total },
            gasState: { dryVolume0, volume0, baseVolume, volume },
        },
    } = balance

    let volume0_write = new BehaviorSubject(0)
    let baseVolume_write = new BehaviorSubject(0)
    let volume_write = new BehaviorSubject(0)

    let editMode = new BehaviorSubject('dryVolume0')

    let volume0EditRow = tr([
        td('烟气量'),
        td('Nm3/hr'),
        td({ className: 'text-right' },
            numberbox({
                number: volume0_write,
            })
        ),

        td(
            button('設定').pipeEvent(
                'click',
                click$ =>
                    click$
                    |> withLatestFrom(volume0_write, dry, total)
                    |> map(([_, v0, dry, total]) => v0 * dry / total)
                    |> tap(() => {
                        editMode.next('dryVolume0')
                    })
                    |> (o => o.subscribe(dryVolume0))
            ),
            button('取消').subscribeEvent('click', _ => {
                editMode.next('dryVolume0')
            })
        ),
    ])
    let volume0Row = flip(
        editMode |> map(edit => edit !== 'volume0'),
        tr([
            td('烟气量'),
            td('Nm3/hr'),
            td({ className: 'text-right' }, textNode(volume0)),
            td(
                button('编辑').pipeEvent(
                    'click',
                    click$ =>
                        click$
                        |> withLatestFrom(volume0)
                        |> map(([_, x]) => x)
                        |> tap(x => {
                            editMode.next('volume0')
                        })
                        |> (o => o.subscribe(volume0_write))
                )
            ),
        ]),
        volume0EditRow
    )

    let baseVolumeEditRow = tr([
        td('标态（干态，', textNode(baseO2), ' % O2）'),
        td('Nm3/hr'),
        td({ className: 'text-right' },
            numberbox({
                number: baseVolume_write,
            })
        ),
        td(
            button('設定').pipeEvent(
                'click',
                click$ =>
                    click$
                    |> withLatestFrom(baseVolume_write, baseFactor)
                    |> map(([_, v, f]) => v * f)
                    |> tap(() => {
                        editMode.next('dryVolume0')
                    })
                    |> (o => o.subscribe(dryVolume0))
            ),
            button('取消').subscribeEvent('click', _ => {
                editMode.next('dryVolume0')
            })
        ),
    ])

    let baseVolumeRows = flip(
        editMode |> map(edit => edit !== 'baseVolume'),
        tr(
            td('标态（干态，', textNode(baseO2), ' % O2）'),
            td('Nm3/hr'),
            td({ className: 'text-right' }, textNode(baseVolume)),

            td(
                button('编辑').pipeEvent(
                    'click',
                    click$ =>
                        click$
                        |> withLatestFrom(baseVolume)
                        |> map(([_, x]) => x)
                        |> tap(x => {
                            editMode.next('baseVolume')
                        })
                        |> (o => o.subscribe(baseVolume_write))
                )
            )
        ),
        baseVolumeEditRow //上一行的編輯模式
    )

    let volumeEditRow = tr(
        td(
            '工况（',
            textNode(temperature |> map(n => n.toFixed(1))),
            '℃，',
            textNode(pressureg |> map(n => n.toFixed(0))),
            'Pa）'
        ),
        td('m3/hr'),
        td({ className: 'text-right' },
            numberbox({
                number: volume_write,
            })
        ),
        td(
            button('設定').pipeEvent(
                'click',
                click$ =>
                    click$
                    |> withLatestFrom(volume_write, vcorrect, dry, total)
                    |> map(([_, v, c, d, t]) => v / c * (d / t))
                    |> tap(() => {
                        editMode.next('dryVolume0')
                    })
                    |> (o => o.subscribe(dryVolume0))
            ),
            button('取消').subscribeEvent('click', _ => {
                editMode.next('dryVolume0')
            })
        )
    )

    let volumeRows = flip(
        editMode |> map(edit => edit !== 'volume'),
        tr(

            td(
                '工况（',
                textNode(temperature |> map(n => n.toFixed(1))),
                '℃，',
                textNode(pressureg |> map(n => n.toFixed(0))),
                'Pa）'
            ),
            td('m3/hr'),
            td({ className: 'text-right' }, textNode(volume)),
            td(
                button('编辑').pipeEvent(
                    'click',
                    click$ =>
                        click$
                        |> withLatestFrom(volume)
                        |> map(([_, x]) => x)
                        |> tap(x => {
                            editMode.next('volume')
                        })
                        |> (o => o.subscribe(volume_write))
                )
            )
        ),
        volumeEditRow //上一行的編輯模式
    )

    return table(
        thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),

        tbody(
            tr(td(b('烟气体积计算')), td(), td(), td()),
            tr(
                td('干烟气量'),
                td('Nm3/hr'),
                ...flip(
                    editMode |> map(edit => edit !== 'dryVolume0'),

                    td({ className: 'text-right' }, textNode(dryVolume0)),

                    td({ className: 'text-right' },
                        numberbox({
                            number: dryVolume0,
                        })
                    ),
                ),

                td()
            ),

            ...volume0Row,

            ...baseVolumeRows,

            ...volumeRows,

            ...flueGasRows(balance)
        )
    )
}
