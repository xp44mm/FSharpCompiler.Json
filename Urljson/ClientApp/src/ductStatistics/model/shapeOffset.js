import { combineLatest, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { ShapeViewModel } from '../../shapes'

///计算圆形外沿周长
export function circlePerimeterOffset(diameter, ext) {
    return combineLatest(diameter, ext)
        |> map(([x, ext]) => x + 2 * ext)
        |> map(d => Math.PI * d)
}

//计算矩形外沿周长
export function rectanglePerimeterOffset(width, height, ext) {
    let w =
        combineLatest(width, ext)
        |> map(([x, ext]) => x + 2 * ext)

    let h =
        combineLatest(height, ext)
        |> map(([x, ext]) => x + 2 * ext)

    return combineLatest(w, h)
        |> map(([w, h]) => 2 * (w + h))
}


