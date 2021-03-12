import { div, option } from '../hyperscript'
import { choice } from '../hyperscript/component'
import { select } from '../hyperscript/form'
import { planeInsulation } from './planeInsulation'
import { InsulationViewModel } from './model'
import { pipeInsulation } from './pipeInsulation'

export const insulation = (model = new InsulationViewModel(), project) => {
    let root = div(
        select(
            { value: model.kind },
            Object.entries({ plane: '平面保温', pipe: '管道保温' }).map(
                ([value, text]) => option({ value, text })
            )
        ),

        //todo:不需要choice:直接不显示根元素。
        ...choice(model.kind, {
            plane: planeInsulation(model.plane),
            pipe: pipeInsulation(model.pipe),
        })
    )

    return root
}
