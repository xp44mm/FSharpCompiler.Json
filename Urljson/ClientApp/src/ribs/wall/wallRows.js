import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { locate } from '../../deep'
import { option, td, textNode, tr } from '../../hyperscript'
import { numberbox, select } from '../../hyperscript/form'
import { wallPaths } from '../path/wallPaths'
import { ribSelector } from './ribSelector'

export const wallRows = rib => {
    let { frequency } = rib
    let walls = wallPaths.map(path => {
        let props = {
            colSpan: 2, //正压，负压
            className: 'text-right',
            '.hidden': rib.kind |> map(k => k !== path[0]),
        }
        let wall = locate(rib, path)
        return { props, wall }
    })

    let isPinned = rib.type |> map(tp => tp === 'pinned')

    return [
        tr(
            td('壁厚'),
            td('mm'),
            ...walls.map(({ props, wall }) =>
                td(props, numberbox({ number: wall.thick }))
            ),
            td()
        ),

        tr(
            td('板频率'),
            td('≥', textNode(frequency), 'Hz'),
            ...walls.map(({ props, wall }) =>
                td({
                    ...props,
                    '.table-danger': true,
                    '.table-success': combineLatest(wall.plateFrequency, frequency,) |> map(([v, f]) => v >= f),
                },
                    textNode(wall.plateFrequency |> map(v => v.toFixed(1)))
                )
            ),
            td()
        ),

        tr(
            td('加固肋'),
            td(),
            ...walls.map(({ props, wall }) =>
                td({ ...props, '.text-right': false }, ribSelector(wall))
            ),
            td()
        ),

        tr(
            td('肋重量'),
            td('kg/m'),
            ...walls.map(({ props, wall }) =>
                td(props, textNode(wall.ribWeight |> map(v => v.toFixed(2))))
            ),
            td()
        ),

        tr(td('A'), td('cm2'), ...walls.map(({ props, wall }) => td(props, textNode(wall.area |> map(v => v.toFixed(2))))), td()),

        tr(td('G'), td('kg/m'), ...walls.map(({ props, wall }) => td(props, textNode(wall.weight |> map(v => v.toFixed(2))))), td()),

        tr(td('e'), td('cm'), ...walls.map(({ props, wall }) => td(props, textNode(wall.center |> map(v => v.toFixed(2))))), td()),

        tr(td('I'), td('cm4'), ...walls.map(({ props, wall }) => td(props, textNode(wall.ix |> map(v => v.toFixed(2))))), td()),

        tr(td('Zmin'), td('cm3'), ...walls.map(({ props, wall }) => td(props, textNode(wall.zmin |> map(v => v.toFixed(2))))), td()),

        tr(
            td('加固肋频率'),
            td('≥', textNode(frequency), 'Hz'),
            ...walls.map(({ props, wall }) =>
                td({
                    ...props,
                    '.table-danger': true,
                    '.table-success': combineLatest(wall.ribFrequency, frequency,) |> map(([v, f]) => v >= f),
                },
                    textNode(wall.ribFrequency |> map(v => v.toFixed(1)))
                )),
            td()
        ),

        tr(
            td('整体稳定系数'),
            td('#'),
            ...walls.map(({ props, wall }) => td(props, textNode(wall.stable |> map(v => v.toFixed(2))))),
            td()
        ),

        tr(
            { '.hidden': isPinned },
            td('刚度'),
            td('#'),
            ...walls.map(({ props, wall }) =>
                td(props, textNode(wall.rigid |> map(v => v.toFixed(3))))),
            td()
        ),

        tr(
            { '.hidden': isPinned },
            td('β'),
            td('#'),
            ...walls.map(({ props, wall }) =>
                td(
                    props,
                    textNode(
                        wall.beta |> map(v => v.toFixed(2)) //有错误
                    )
                )
            ),
            td()
        ),
    ]
}
