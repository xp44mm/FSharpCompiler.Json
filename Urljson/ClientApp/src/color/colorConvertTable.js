import { combineLatest } from "rxjs"
import { map, withLatestFrom } from "rxjs/operators"
import { table, tbody, td, th, thead, tr } from '../hyperscript'
import { numberbox, textbox } from '../hyperscript/form'
import { colorHex, colorRgb } from './colorFns'
import { ColorViewModel } from './ColorViewModel'

export function colorConvertTable(model = new ColorViewModel()) {
    let rgbBlur = blur$ =>
        blur$
        |> withLatestFrom(model.red, model.green, model.blue)
        |> map(([_, ...x]) => x)
        |> map(([r, g, b]) => colorHex(r, g, b))
        |> (o => o.subscribe(model.hex))

    return table(
        thead(
            tr(th('名称'), th('输入'), th('色卡')),
        ),
        tbody([
            tr(
                td('十六进制'),
                td(textbox({ value: model.hex }).pipeEvent('blur', blur$ =>
                    blur$
                    |> withLatestFrom(model.hex)
                    |> map(([_, x]) => x)
                    |> map(hex => hex[0] === "#" ? hex.substring(1) : hex)
                    |> map(hex => colorRgb(hex))
                    |> (o => o.subscribe(([r, g, b]) => {
                        model.red.next(r)
                        model.green.next(g)
                        model.blue.next(b)
                    })))),
                td({
                    'style.backgroundColor':
                        combineLatest(model.red, model.green, model.blue)
                        |> map(([r, g, b]) => `rgb(${r},${g},${b})`)
                }),
            ),

            tr(
                td('红'),
                td(numberbox({ number: model.red }).pipeEvent('blur', rgbBlur)),

                td({
                    'style.backgroundColor':
                        model.red
                        |> map(r => `rgb(${r},0,0)`)
                }),

            ),

            tr(
                td('绿'),
                td(numberbox({ number: model.green }).pipeEvent('blur', rgbBlur)),
                td({
                    'style.backgroundColor':
                        model.green
                        |> map(g => `rgb(0,${g},0)`)
                }),
            ),

            tr(
                td('蓝'),
                td(numberbox({ number: model.blue }).pipeEvent('blur', rgbBlur)),
                td({
                    'style.backgroundColor':
                        model.blue
                        |> map(b => `rgb(0,0,${b})`)
                }),
            ),
        ])
    )

}