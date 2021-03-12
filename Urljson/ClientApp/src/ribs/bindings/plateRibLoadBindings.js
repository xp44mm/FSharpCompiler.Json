import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { loads } from '../path/keys'

//绑定单独的分项荷载
export function plateRibLoadBindings(rib) {
    let { span, horizon: { top, bottom } } = rib
    //板荷载
    top.thick
        |> map(t => -0.0785 * t)
        |> (o => o.subscribe(x => {
            for (let ld of loads) {
                top[ld].plate.next(x)
            }
        }))

    bottom.thick
        |> map(t => 0.0785 * t)
        |> (o => o.subscribe(x => {
            for (let ld of loads) {
                bottom[ld].plate.next(x)
            }
        }))

    //肋荷载
    combineLatest(top.ribWeight, span)
        |> map(([wt, sp]) => -10 * wt / sp)
        |> (o => o.subscribe(x => {
            for (let ld of loads) {
                top[ld].rib.next(x)
            }
        }))

    combineLatest(bottom.ribWeight, span)
        |> map(([wt, sp]) => 10 * wt / sp)
        |> (o => o.subscribe(x => {
            for (let ld of loads) {
                bottom[ld].rib.next(x)
            }
        }))
}

