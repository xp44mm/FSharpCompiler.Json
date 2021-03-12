import { map, tap } from 'rxjs/operators'
import { span, option } from '../../hyperscript'
import { select } from '../../hyperscript/form/select'
import { shapeSteels } from './shapeSteels'
import { ShapeSteelViewModel } from './ShapeSteelViewModel'

export const shapeSteelInput = (
    props = {},
    model = new ShapeSteelViewModel()
) => {
    let root = span(
        props,
        select(
            { value: model.shape },
            Object.keys(shapeSteels).map(text => option({ text }))
        ),

        select({ value: model.specification })
    )

    let specSelect = root.lastChild

    model.specifications
        |> tap(() => {
            while (specSelect.hasChildNodes()) {
                specSelect.removeChild(specSelect.lastChild)
            }
        })
        |> map(specs => specs.map(text => option({ text })))
        |> (o=>o.subscribe(options => {
            options.forEach(op => {
                specSelect.appendChild(op)
            })
        }))
    return root
}
