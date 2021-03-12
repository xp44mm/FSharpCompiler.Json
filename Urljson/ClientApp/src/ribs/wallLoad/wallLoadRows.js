import { map } from 'rxjs/operators'
import { locate } from '../../deep'
import { wallPaths } from '../path/wallPaths'
import { primitiveLoadRows } from './primitiveLoadRows'
import { plateRows } from './plateRows'
import { ribRows } from './ribRows'
import { pipeLoadRows } from './pipeLoadRows'

const vb = ['vaccum', 'barotropy']

export function wallLoadRows(rib) {
    let loads = wallPaths
        .map(path => vb.map(l => [...path, l]))
        .reduce((a, b) => [...a, ...b])
        .map(path => {
            let props = {
                className: 'text-right',
                '.hidden': rib.kind |> map(k => k !== path[0])
            }
            let ld = locate(rib, path)
            return { props, ld }
        })

    return [
        ...primitiveLoadRows(rib, loads),
        ...plateRows(rib, loads),
        ...ribRows(rib, loads),
        ...pipeLoadRows(rib, loads),

    ]
}

