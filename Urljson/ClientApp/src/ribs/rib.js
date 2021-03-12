import { div, h4, option } from '../hyperscript'
import { select } from '../hyperscript/form'
import { basicTable } from './basic'
import { dimensionTable } from './dimension/dimensionTable'
import { RibViewModel } from './model'
import { wallTable } from './wallTable'
import { kinds, types } from './path/keys'

//单页
export function rib(rib = new RibViewModel(), project) {
    return div(
        h4('常规'),
        basicTable(rib),
        h4('尺寸'),
        dimensionTable(rib),

        select(
            { value: rib.kind },
            kinds.map(text => option({ text }))
        ),

        select(
            { value: rib.type },
            types.map(text => option({ text }))
        ),
        wallTable(rib)
    )
}
