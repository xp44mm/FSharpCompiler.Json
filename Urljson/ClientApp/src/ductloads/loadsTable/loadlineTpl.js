import { button, option, td, th, tr } from '../../hyperscript'
import { choice } from '../../hyperscript/component'
import { select } from '../../hyperscript/form'
import { chineseLoadKinds, LoadViewModel } from '../model'
import { damperloadTpl } from './damperloadTpl'
import { ductloadTpl } from './ductloadTpl'
import { expansionloadTpl } from './expansionloadTpl'
import { shapeInput } from './shapeInput'


export const loadlineTpl = (load = new LoadViewModel(), support) => {
    let root = tr([
        th(
            select({ 'className': 'full-width', value: load.kind },
                Object.entries(chineseLoadKinds).map(([value, text]) =>
                    option({ value, text })
                )
            )
        ),
        //td(
        //    ...shapeInput(load.section),
        //),
        ...choice(load.kind, {
            duct: ductloadTpl(
                load.duct
            ),
            damper: damperloadTpl(
                load.damper
            ),
            expansion: expansionloadTpl(
                load.expansion
            ),
        }),

        td(
            button('删除荷载').subscribeEvent('click', e => {
                support.remove(load)
            })
        ),
    ])

    return root
}
