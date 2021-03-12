import { isObservable } from 'rxjs'
import { map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { Deep, deepCombineLatest, restore } from '../../deep'
import { httpGetFull } from '../../http/httpGetFull'
import { button, div, h3, h4, img, li, p, table, tbody, td, th, thead, tr, ul } from '../../hyperscript'
import { inputTbody } from './inputTbody'
import { ReducerViewModel } from './ReducerViewModel'
import { resultTbody, shapeResult } from './resultTbody'
import protrait from './变径管.png'
import initialData from './initialData.json'

export const reducer = (model = new ReducerViewModel()) => {
    let { input, result } = model
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    return div(
        h3('变径管'),

        div({ className: 'panel panel-primary' }, [
            table(
                { className: 'table table-condensed table-bordered' },
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
                                        httpGetFull('fluids/Reducer?', data)
                                    )
                                    |> map(data =>
                                        Object.assign(data, {
                                            sinlet: shapeResult(data.sinlet),
                                            soutlet: shapeResult(data.soutlet),
                                        })
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
                resultTbody(result)
            ),
        ]),

        div(
            h4('输入说明：'),
            ul(
                li(p('扩散角α所在面的的尺寸填写在宽度(d)栏中。')),
                li(
                    p(
                        '扩散角α可从CAD图纸中测量得出，当矩形管道两个侧面的α不同时，按照较大的阻力系数取值。'
                    )
                ),
                li(
                    p(
                        '当为偏心大小头时，扩散角α值按大斜面乘以2。当偏心大小头偏向一侧时，应该按照截面的中心线简化成两个尖角弯头和一个突变截面。'
                    )
                )
            ),
            img({ src: protrait })
        )
    )
}
