import { map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { Deep, deepCombineLatest, pickout, restore } from '../../deep'
import { httpGetFull } from '../../http/httpGetFull'
import { button, div, h3, table, tbody, td, th, thead, tr } from '../../hyperscript'
import initialData from './initialData.json'
import { inputTbody } from './inputTbody'
import { resultTbody } from './resultTbody'
import { SingleMiterElbowViewModel } from './SingleMiterElbowViewModel'

export const singleMiterElbow = (model = new SingleMiterElbowViewModel()) => {
    let { input, result } = model
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    return div(
        h3('单节虾米弯'),

        div(
            table(
                thead(
                    tr(
                        th({ 'style.width': '10em' }, '名称'),
                        th({ 'style.width': '5em' }, '单位'),
                        th({ 'style.width': '50%' }, '数值'),
                        th({ 'style.width': '20%' }, '备注')
                    )
                ),
                inputTbody(input),
                tbody(
                    tr(
                        td(),
                        td(
                            button('保存').subscribeEvent('click', _ => {
                                let data = pickout(input)
                                console.log(data)
                            })
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
                                            'fluids/SingleMiterElbow?',
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
                            button('重置').subscribeEvent('click', _ => {
                                restore(model.input, initialData)
                            })
                        )
                    )
                ),
                resultTbody(model.result)
            )
        )
    )
}
