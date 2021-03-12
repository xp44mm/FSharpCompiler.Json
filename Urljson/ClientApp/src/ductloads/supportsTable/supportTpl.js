import { map } from 'rxjs/operators'
import { td, textNode, th, tr } from '../../hyperscript'
import { checkbox, numberbox, } from '../../hyperscript/form'

import { SupportViewModel } from '../model'

export const supportTpl = (
    support = new SupportViewModel()
) => {
    let root = tr([
        th(textNode(support.pos)),

        td(
            checkbox({
                checked: support.isFixed,
            })
            ,
            '方向角(°)',
            numberbox({
                'style.display':
                    support.isFixed
                    |> map(fixed => (fixed ? 'none' : 'inline')),
                size: 9,
                title: '方向角(°)',
                number: support.slip.direction,
            })
        ),

        td(
            { className: 'text-right' },
            textNode(support.weight |> map(v => v.toFixed(1)))
        ),

        td({ className: 'text-right' },
            textNode(support.weightFrictionX |> map(v => v.toFixed(2)))
        ),

        td(
            { className: 'text-right' },
            textNode(support.weightFrictionY |> map(v => v.toFixed(2)))
        ),

        td(
            { className: 'text-right' },
            textNode(support.ashWeight |> map(v => v.toFixed(1)))
        ),

        td(
            { className: 'text-right' },
            textNode(support.ashWeightFrictionX |> map(v => v.toFixed(2)))
        ),

        td(
            { className: 'text-right' },
            textNode(support.ashWeightFrictionY |> map(v => v.toFixed(2)))
        ),

        td(
            { className: 'text-right' },
            textNode(support.loadZ |> map(v => v.toFixed(2)))
        ),

        td(
            { className: 'text-right' },
            textNode(support.loadX |> map(v => v.toFixed(2)))
        ),

        td(
            { className: 'text-right' },
            textNode(support.loadY |> map(v => v.toFixed(2)))
        ),

        td(),
    ])

    return root
}
