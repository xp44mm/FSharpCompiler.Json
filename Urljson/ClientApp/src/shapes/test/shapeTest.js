import { pickout, restore } from '../../deep'
import { button, div, numberbox, option, textNode } from '../../hyperscript'
import { choice } from '../../hyperscript/component/choice'
import { select } from '../../hyperscript/form'
import { CircleViewModel, RectangleViewModel, ShapeViewModel } from '../model'



const circle = (model = new CircleViewModel()) =>
    div(
        numberbox({ number: model.diameter }),
        div(textNode(model.peri)),
        div(textNode(model.area))
    )

const rectangle = (model = new RectangleViewModel()) =>
    div(
        numberbox({ number: model.width }),
        numberbox({ number: model.height }),
        div(textNode(model.peri)),
        div(textNode(model.area))
    )

let kinds = ['rectangle', 'circle']

export function shapeTest() {
    let model = new ShapeViewModel()
    let options = kinds.map(text => option({ text }))
    let resetData = { rectangle: { width: 10, height: 20 }, kind: 'rectangle' }

    return div(
        select({ value: model.kind }, options),
        ...choice(model.kind, {
            circle:circle(model.circle), rectangle:rectangle(model.rectangle)
        }),

        //div(
        //    {
        //        'style.display': model.kind.pipe(
        //            map(k => (k === 'rectangle' ? 'block' : 'none'))
        //        ),
        //    },
        //    label('width', numberbox({ number: model.rectangle.width })),
        //    label('height', numberbox({ number: model.rectangle.height }))
        //),
        //div(
        //    {
        //        'style.display': model.kind.pipe(
        //            map(k => (k === 'circle' ? 'block' : 'none'))
        //        ),
        //    },

        //    label('diameter', numberbox({ number: model.circle.diameter }))
        //),

        div(textNode(model.peri)),
        div(textNode(model.area)),
        div(
            button('保存').subscribeEvent('click', _ => {
                let data = pickout(model)
                console.log(data)
            }),

            button({}, '重置').subscribeEvent('click', _ => {
                restore(model, resetData)
            })
        )
    )
}
