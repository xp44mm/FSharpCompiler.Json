import { map, tap, withLatestFrom } from 'rxjs/operators'
import { button, div, tbody, td, tr } from '../hyperscript'
import { colorConvertTable } from './colorConvertTable'
import { colorHex, distance } from './colorFns'
import { colorRgbNames } from './colorRgbNames'
import { ColorViewModel } from './ColorViewModel'
import { keywordColorTable } from './keywordColorTable'

let rows =
    colorRgbNames
        .map(([r, g, b, kw]) => {
            let hex = colorHex(r, g, b)

            let row = tr(td(kw), td(r), td(g), td(b), td(hex), td({
                'style.backgroundColor': kw
            }))

            return { keyword: kw, rgb: [r, g, b], hex, row }
        })

export function color() {
    let input = new ColorViewModel()

    let colors = keywordColorTable()

    return div(
        "颜色工具",
        colorConvertTable(input),
        button("关键字颜色").pipeEvent('click', click$ =>
            click$
            |> withLatestFrom(input.red, input.green, input.blue)
            |> map(([_, ...rest]) => rest)
            |> map(rgb0 => rows
                .map(obj => Object.assign({}, obj, { distance: distance(obj.rgb, rgb0) }))
                .sort((a, b) => a.distance - b.distance)
            )
            |> map(ls => tbody(...ls.slice(0, 10).map(obj => obj.row)))
            |> tap(_ => {
                let tbd = colors.getElementsByTagName('tbody')[0]
                colors.removeChild(tbd)
            })
            |> (o => o.subscribe(tbd => {
                colors.appendChild(tbd)
            }))
        ),
        colors,
    )
}

