import { map } from 'rxjs/operators'
import { td, textNode, tr } from '../../hyperscript'

export function pipeLoadRows(rib, loads) {
    let { pipeMaterial: { xigma }, } = rib

    return [
        tr(
            td('内撑杆荷载'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.pipe.load |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr(
            td('内撑杆受力'),
            td('kN'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.pipe.force |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr(
            td('内撑杆应力'),
            td('≤', textNode(xigma), 'MPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.pipe.stress |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),
    ]
}
