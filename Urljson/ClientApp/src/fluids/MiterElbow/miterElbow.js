import { map, mergeMap, withLatestFrom,tap } from 'rxjs/operators'
import { Deep, deepCombineLatest, restore } from '../../deep'
import { httpGetFull } from '../../http/httpGetFull'
import { button, div, h3, img, table, tbody, td, th, thead, tr } from '../../hyperscript'
import initialData from './initialData.json'
import { inputRows } from './inputRows'
import { MiterElbowViewModel } from './MiterElbowViewModel'
import { resultRows } from './resultRows'
import protrait from './虾米弯头.png'

export const miterElbow = (model = new MiterElbowViewModel()) => {
    let { input, result } = model
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    let root = div(
        h3('虾米弯头'),
        div(
            table(
                thead(tr(
                    th('名称'), th('单位'), th('数值'), th('备注')
                )),
                inputRows(input),
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
                                    |> withLatestFrom(deepCombineLatest(inputDeep))
                                    |> map(([_, data]) => data.toObject())
                                    |> mergeMap(data =>
                                        httpGetFull('fluids/miterElbow?', data)
                                    )
                                    |> map(data => Deep.fromObject(data))
                                    |> (o => o.subscribe(data => {
                                        if (resultDeep.structureEqual(data.keys)) {
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
                resultRows(result)
            ),
            img({ src: protrait })
        )
    )

    return root
}
