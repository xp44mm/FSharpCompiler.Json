import { BehaviorSubject } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { restore } from '../deep'
import { button, div } from '../hyperscript'
import {  textarea } from '../hyperscript/form'

import { main } from './main'
import { json } from './json'
import { DenoxViewModel } from './model'

export function startup() {
    //模型区域
    let textarea$ = new BehaviorSubject(JSON.stringify(json))
    let model = new DenoxViewModel()
    let root = document.getElementById('root')

    return div(
        div('输入JSON：'),
        div(textarea({ value: textarea$ })),
        div(
            { className: 'text-right' },
            button({ type: 'button' }, '加载').pipeEvent(
                'click',
                click$ =>
                    click$
                    |> withLatestFrom(textarea$)
                    |> map(([_, code]) => code)
                    |> map(code => JSON.parse(code))
                    |> tap(obj => {
                        while (root.firstChild) {
                            root.removeChild(root.firstChild)
                        }
                        root.appendChild(main(model))
                    })
                    |> (o =>
                        o.subscribe(obj => {
                            restore(model, obj)
                        }))
            )
        )
    )

    ////视图区域
    //let root = flip(isYin,
    //    div(
    //        div('输入JSON：'),
    //        div(
    //            textarea({ value: textarea$ }),
    //        ),
    //        div({ className: 'text-right' },
    //            button({ type: "button", }, '加载').pipeEvent('click', click$ =>
    //                click$
    //                |> withLatestFrom(textarea$)
    //                |> map(([_, code]) => code)
    //                |> map(code => JSON.parse(code))
    //                |> tap(obj => {
    //                    restore(model, obj)
    //                })
    //                |> (o => o.subscribe(() => { isYin.next(false) }))
    //            ),
    //        )
    //    ),
    //    inputs(model)
    //)

    //return div(root)
}
