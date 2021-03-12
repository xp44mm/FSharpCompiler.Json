import { map, mergeMap } from 'rxjs/operators'
import { button, option, td, textNode, tr, div, span } from '../hyperscript'
import { textbox, numberbox, select } from '../hyperscript/form'
import { SectionsViewModel, SectionViewModel } from './model'

let shapes = { 圆: 'circle', 方: 'rectangle', }

export const editRow = (
    line = new SectionViewModel(),
    sections = new SectionsViewModel()
) => {
    let rectangle = line.rectangle
    let circle = line.circle

    let options = Object.entries(shapes).map(([text, value]) =>
        option({ text, value })
    )

    return tr([
        td(textbox({ value: line.name, 'style.width': 'calc(100% - 10px)' })),
        td(numberbox({ number: line.volume, 'style.width': 'calc(100% - 10px)' })),
        td(
            select({ value: line.kind }, options),

            span({ '.hidden': line.kind |> map(k => k !== 'rectangle'), },
                numberbox({
                    number: rectangle.width, size: 10,
                }),
                '×',
                numberbox({
                    number: rectangle.height, size: 10,
                }),
            ),

            numberbox({
                '.hidden': line.kind |> map(k => k !== 'circle'),
                number: circle.diameter,
                size: 10,
            })

        ),

        td({ className: 'text-right' }, textNode(line.area |> map(v => v.toFixed(0)))),

        td({ className: 'text-right' }, textNode(line.velocity |> map(v => v.toFixed(2)))),

        td(
            button('移除').subscribeEvent('click', _ => {
                sections.remove(line)
            })
        ),
    ])
}

