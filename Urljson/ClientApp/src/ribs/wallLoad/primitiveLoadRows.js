import { map } from 'rxjs/operators'
import { td, textNode, tr } from '../../hyperscript'

export function primitiveLoadRows(rib, loads) {
    let isVertical = rib.kind |> map(k => k === 'vertical')

    return [
        tr(
            td('内压'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.pressure |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr(
            td('风'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.wind |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr({ '.hidden': isVertical },
            td('板重'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.plate |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr({ '.hidden': isVertical },
            td('肋重'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.rib |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr({ '.hidden': isVertical },
            td('保温'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.insula |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr({ '.hidden': isVertical },
            td('灰'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.ash |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr({ '.hidden': isVertical },
            td('雪'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.snow |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),
    ]
}

