import { map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { Deep, deepCombineLatest, restore } from '../../deep'
import { httpGetFull } from '../../http/httpGetFull'
import { button, div, h3, table, tbody, td, th, thead, tr } from '../../hyperscript'
import { inputTbody } from './inputTbody'
import { RectangleBendViewModel } from './RectangleBendViewModel'
import { resultTbody } from './resultTbody'
import { Subject } from 'rxjs'
import initialData from './initialData.json'

export const rectangleBend = (model = new RectangleBendViewModel()) => {
    let { input, result } = model
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    return div(
        h3('矩形弯头'),

        div(
            table(
                thead(tr(

                    th('名称'), th('单位'), th('数值'), th('备注'))
                ),
                inputTbody(input),
                tbody(
                    tr(
                        td(),
                        td(
                            button('保存').pipeEvent(
                                'click',
                                click$ =>
                                    click$
                                    |> withLatestFrom(
                                        deepCombineLatest(inputDeep)
                                    )
                                    |> map(([_, data]) => data.toObject())
                                    |> (o =>
                                        o.subscribe(data => {
                                            console.log(data)
                                        }))
                            )
                        ),
                        td(
                            button('计算').pipeEvent(
                                'click',
                                click$ =>
                                    click$
                                    |> withLatestFrom(
                                        deepCombineLatest(inputDeep)
                                    )
                                    |> map(([_, data]) => data.toObject())
                                    |> mergeMap(data =>
                                        httpGetFull(
                                            'fluids/RectangleBend?',
                                            data
                                        )
                                    )
                                    |> map(data => Deep.fromObject(data))
                                    |> (o =>
                                        o.subscribe(data => {
                                            if (
                                                resultDeep.structureEqual(data.keys)
                                            ) {
                                                data
                                                    .zip(resultDeep.values)
                                                    .forEach(([k, [data, subject]]) => {
                                                        subject.next(data)
                                                    })
                                            } else {
                                                throw new Error(
                                                    'Deep.zip strucure should equal.'
                                                )
                                            }
                                        }))
                            )
                        ),
                        td(
                            button({}, '重置').subscribeEvent('click', _ => {
                                restore(model.input, initialData)
                            })
                        )
                    )
                ),
                resultTbody(result)
            )
        )
    )
}
