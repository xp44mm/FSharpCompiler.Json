import { map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { pickout, restore } from '../../deep'
import { httpGetFull } from '../../http/httpGetFull'
import { button, div, h3, table, tbody, td, th, thead, tr } from '../../hyperscript'
import { FrictionalResistanceViewModel } from './frictionalResistanceViewModel'
import { inputTbody } from './inputTbody'
import { resultTbody } from './resultTbody'

let resetData = { density: 1000, solids: 0, flow: 20, diameter: 100 }

export const frictionalResistance = (
    model = new FrictionalResistanceViewModel()
) => {
    let btn = button('计算').pipeEvent(
        'click',
        click$ =>
            click$
            |> withLatestFrom(
                model.input.density,
                model.input.solids,
                model.input.flow,
                model.input.diameter
            )
            |> map(([_, density, solids, flow, diameter]) => ({
                density,
                solids,
                flow,
                diameter,
            }))
            |> mergeMap(data =>
                httpGetFull('fluids/frictionalResistance?', data)
            )
            |> (o =>
                o.subscribe(res => {
                    for (let prop in res) {
                        if (prop in model.result) {
                            model.result[prop].next(res[prop])
                        }
                    }
                }))
    )

    return div(
        h3('沿程阻力系数'),

        div(
            { className: 'panel panel-primary' },
            table({ className: 'table table-condensed table-bordered' }, [
                thead(tr(
                    th('名称'), th('单位'), th('数值'), th('备注')
                )),

                inputTbody(model.input),
                tbody(
                    tr(
                        td(),
                        td(
                            button('保存').subscribeEvent('click', _ => {
                                let data = pickout(model)
                                console.log(data)
                            })
                        ),
                        td(btn),
                        td(
                            button({}, '重置').subscribeEvent('click', _ => {
                                restore(model.input, resetData)
                            })
                        )
                    )
                ),
                resultTbody(model.result),
            ])
        )
    )
}
