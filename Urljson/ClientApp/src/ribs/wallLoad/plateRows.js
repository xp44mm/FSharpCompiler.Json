import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { td, textNode, tr } from '../../hyperscript'

export const plateRows = (rib, loads) => {
    let { ribMaterial: { xigma } } = rib

    return [
        tr(
            td('板组合'),
            td('kPa'),
            ...loads.map(({ props, ld }) =>
                td(props,
                    textNode(ld.plateLoads |> map(v => v.toFixed(2)))
                )
            ),
            td()
        ),

        tr(
            td('板应力'),
            td('≤', textNode(xigma), 'MPa'),
            ...loads.map(({ props, ld }) =>
                td({
                    ...props,
                    '.table-danger': true,
                    '.table-success': combineLatest(ld.plateStress, xigma) |> map(([s, x]) => Math.abs(s) <= x),
                },
                    textNode(ld.plateStress |> map(v => v.toFixed(0)))
                )
            ),
            td()
        ),

        tr(
            td('板挠度'),
            td('≥120'),
            ...loads.map(({ props, ld }) =>
                td({
                    ...props,
                    '.table-danger': true,
                    '.table-success': ld.plateDeflection |> map(d => Math.abs(d) >= 120),
                },
                    textNode(ld.plateDeflection |> map(v => v.toFixed(0)))
                )
            ),
            td()
        ),
    ]
}