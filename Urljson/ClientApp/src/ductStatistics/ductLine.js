import { BehaviorSubject, combineLatest, fromEvent, } from 'rxjs'
import { map, tap, sample, withLatestFrom, mergeMap } from 'rxjs/operators'
import { button, option, td, tr, span } from '../hyperscript'
import { numberbox, checkbox, textbox, select } from '../hyperscript/form'
import { DuctViewModel, TableViewModel } from './model'
import { shapeInputTds } from './shapeInputTds'
import { dimensionCell } from './dimensionCell'
import { kindSelector } from './kindSelector'


export const ductLine = (duct = new DuctViewModel(), model = new TableViewModel()) => {
    let kk = new BehaviorSubject(0)

    let row = tr([
        td(textbox({ className: 'full-width', value: duct.remark })),

        td(select(
            { className: 'full-width', value: kk },
            kindSelector.map(([text, _1, _2, value]) => option({ text, value }))
        )),

        dimensionCell(duct.surface),

        td(numberbox({ className: 'full-width', size: 5, number: duct.wall })),

        td(
            checkbox({ checked: duct.paint }),
            numberbox({
                '.hidden': duct.paint |> map(v => !v),
                number: duct.degree,
                size: 6
            })
        ),

        td(
            checkbox({ checked: duct.insula }),
            span({
                //'style.width': 'calc(100% - 8px - 2em)',
                'style.display':
                    duct.insula
                    |> map(yes => (yes ? 'inline-block' : 'none')),
            },

                numberbox({
                    size:5,
                    number: duct.thick,
                }),
                "&",
                numberbox({
                    size:5,
                    number: duct.space,
                })
            )
        ),

        td(
            checkbox({ checked: duct.casing }),
            numberbox({
                'style.width': 'calc(100% - 8px - 2em)',
                'style.display': duct.casing |> map(v => (v ? '' : 'none')),
                number: duct.support,
            })
        ),

        td(
            button('移除')
                .subscribeEvent('click', _ => {
                    model.remove(duct)
                })
        ),
    ])

    //model -> view 传递种类 
    combineLatest(duct.surface.kind, duct.surface.section.shape.kind, duct.surface.tube.shape.kind)
        |> map(([a, b, c]) => {
            let x = a === 'section' ? b : c
            return `${a} && ${x}`
        })
        |> (o => o.subscribe(kk))

    //view -> model 传递种类 
    kk
        |> sample(fromEvent(row.getElementsByTagName('select')[0], 'input'))
        |> map(str => {
            let [_, k, s] = /^(\w+)\W+(\w+)$/.exec(str)
            return [k, s]
        })
        |> (o => o.subscribe(([k, s]) => {
            duct.surface.kind.next(k)
            duct.surface[k].shape.kind.next(s)
        }))

    return row
}
