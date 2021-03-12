import { SurfaceViewModel } from './model/SurfaceViewModel'
import { button, option, td, textNode, tr, div, span } from '../hyperscript'
import { numberbox, textbox, } from '../hyperscript/form'

import { mergeMap, sample, withLatestFrom, map } from 'rxjs/operators'
import { BehaviorSubject, fromEvent } from 'rxjs'

export function dimensionCell(surface = new SurfaceViewModel()) {
    let shapeKind = surface.kind |> mergeMap(k => surface[k].shape.kind)

    let ww = new BehaviorSubject(0)
    let hh = new BehaviorSubject(0)
    let dd = new BehaviorSubject(0)

    let cell = td(
        span({ '.hidden': shapeKind |> map(k => k !== 'rectangle'), },
            numberbox({ number: ww, size: 10, }),
            '×',
            numberbox({ number: hh, size: 10, }),
        ),

        span({ '.hidden': shapeKind |> map(k => k !== 'circle'), },
            numberbox({ number: dd, size: 10, }),
        ),

        span({ '.hidden': surface.kind |> map(k => k !== 'tube'), },
            '×',
            numberbox({
                number: surface.tube.length, size: 10,
            }),
        ),

    )

    //宽度
    surface.kind
        |> mergeMap(k => surface[k].shape.rectangle.width)
        |> (o => o.subscribe(ww))

    ww |> sample(fromEvent(cell.getElementsByTagName('input')[0], 'blur'))
        |> withLatestFrom(surface.kind)
        |> (o => o.subscribe(([w, k]) => {
            surface[k].shape.rectangle.width.next(w)
        }))

    //高度
    surface.kind
        |> mergeMap(k => surface[k].shape.rectangle.height)
        |> (o => o.subscribe(hh))

    hh |> sample(fromEvent(cell.getElementsByTagName('input')[1], 'blur'))
        |> withLatestFrom(surface.kind)
        |> (o => o.subscribe(([h, k]) => {
            surface[k].shape.rectangle.height.next(h)
        }))

    //直径
    surface.kind
        |> mergeMap(k => surface[k].shape.circle.diameter)
        |> (o => o.subscribe(dd))

    dd |> sample(fromEvent(cell.getElementsByTagName('input')[2], 'blur'))
        |> withLatestFrom(surface.kind)
        |> (o => o.subscribe(([d, k]) => {
            surface[k].shape.circle.diameter.next(d)
        }))

    return cell
}