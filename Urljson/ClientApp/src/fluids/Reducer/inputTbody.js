import { option, tbody, td, tr } from '../../hyperscript'
import { choice } from '../../hyperscript/component'
import { numberbox, select } from '../../hyperscript/form'
import { ShapeViewModel } from '../../shapes'
import { ReducerViewModel } from './ReducerViewModel'


export const inputTbody = (model = new ReducerViewModel()) =>
    tbody({ key: 'input' }, [
        tr(td('入口(1)'), td(), td(), td()),
        ...shapeInp(model.sinlet),
        tr(td('出口(2)'), td(), td(), td()),
        ...shapeInp(model.soutlet),
        tr(
            td('扩散角/收缩角'),
            td('°'),
            td({ className: 'text-right' }, numberbox({ number: model.angle })),
            td()
        ),
    ])

let kinds = ['rectangle', 'circle']

export function shapeInp(model = new ShapeViewModel()) {
    let options = kinds.map(text => option({ text }))

    return [
        tr(td('形狀'), td(), td(select({ value: model.kind }, options)), td()),
        ...choice(model.kind, {
            rectangle: [
                tr(
                    td('寬度'),
                    td('m'),
                    td({ className: 'text-right' }, numberbox({ number: model.rectangle.width })),
                    td()
                ),
                tr(
                    td('高度'),
                    td('m'),
                    td({ className: 'text-right' }, numberbox({ number: model.rectangle.height })),
                    td()
                ),
            ],
            circle: tr(
                td('直徑'),
                td('m'),
                td({ className: 'text-right' }, numberbox({ number: model.circle.diameter })),
                td()
            ),
        }),
    ]
}
