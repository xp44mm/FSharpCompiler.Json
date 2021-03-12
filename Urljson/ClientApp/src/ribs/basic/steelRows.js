import { option, td, textNode, tr } from '../../hyperscript'
import { select } from '../../hyperscript/form'
import { SteelViewModel } from '../model'

export function steelRows(model = new SteelViewModel(), steels = []) {
    return [
        tr(
            td('材质'),
            td(),
            td(
                select(
                    { value: model.name },
                    steels.map(text => option({ text }))
                )
            ),
            td()
        ),

        tr(
            td('弹性模量'),
            td('GPa'),
            td({ className: 'text-right' }, textNode(model.ela)),
            td()
        ),

        tr(
            td('许用应力'),
            td('MPa'),
            td({ className: 'text-right' }, textNode(model.xigma)),
            td()
        ),
    ]
}
