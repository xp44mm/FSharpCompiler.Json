import { map } from 'rxjs/operators'
import { td, textNode } from '../../hyperscript'
import { LoadViewModel } from '../model'

export const loadtdsTpl = (ld = new LoadViewModel()) => [
    td(
        { className: 'text-right' },
        textNode(ld.weight
            //|> map(v => v && v.toFixed(1))
        )
    ),

    td(
        { className: 'text-right' },
        textNode(ld.ashWeight
            |> map(v => v && v.toFixed(1)))
    ),

    td(
        { className: 'text-right' },
        textNode(ld.loadZ |> map(v => v && v.toFixed(1)))
    ),

    td(
        { className: 'text-right' },
        textNode(ld.loadX |> map(v => v && v.toFixed(2)))
    ),

    td(
        { className: 'text-right' },
        textNode(ld.loadY |> map(v => v && v.toFixed(2)))
    ),
]
