import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { td, textNode, tr } from '../../hyperscript'


export const ribRows = (rib, loads) => {
    let { ribMaterial: { xigma } } = rib

    return [
        tr({
            '.hidden': rib.kind |> map(k => k === 'pinned')
        },
            td('肋当量'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(
                        ld.normalLoads |> map(v => v.toFixed(2))
                    )
                )
            ),
            td()
        ),

        tr(
            td('肋组合'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.allLoads |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr(
            td('肋应力'),
            td('≤', textNode(xigma), 'MPa'),
            ...loads.map(({ props, ld }) =>
                td({
                    ...props,
                    '.table-danger': true,
                    '.table-success': combineLatest(ld.ribStress, xigma) |> map(([s, x]) => Math.abs(s) <= x),
                },
                    textNode(ld.ribStress |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr(
            td('防失稳点数'),
            td('#'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.assistance)
                )
            ),
            td()
        ),

        tr(
            td('肋挠度'),
            td('≥400'),
            ...loads.map(({ props, ld }) =>
                td({
                    ...props,
                    '.table-danger': true,
                    '.table-success': ld.ribDeflection |> map(d => Math.abs(d) >= 400),
                },
                    textNode(ld.ribDeflection |> map(v => v.toFixed(0)))
                )
            ),
            td()
        ),
    ]
}

