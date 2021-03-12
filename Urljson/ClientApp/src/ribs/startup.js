import { BehaviorSubject } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { pickout, restore } from '../deep'
import { button, div, h3, span } from '../hyperscript'
import { textbox, textarea } from '../hyperscript/form'
import { json } from './json'
import { ProjectViewModel } from './model'
import { ribRoot } from './ribRoot'

export function startup() {
    let model = new ProjectViewModel()
    let textarea$ = new BehaviorSubject(JSON.stringify(json))

    let root = document.getElementById("root")

    return div(
        div('输入JSON：'),
        div(textarea({ value: textarea$ })),
        div({ className: 'text-right' },
            button({ type: "button" }, '加载').pipeEvent('click', click$ =>
                click$
                |> withLatestFrom(textarea$)
                |> map(([_, code]) => code)
                |> map(code => JSON.parse(code))
                |> tap(obj => {
                    while (root.firstChild) {
                        root.removeChild(root.firstChild)
                    }
                    root.appendChild(
                        div(
                            h3(
                                span({ 'style.margin': '0 16px 0 0' }, '加固肋计算'),

                                button({ 'style.margin': '0 16px' },
                                    '保存'
                                ).subscribeEvent('click', _ => {
                                    let data = pickout(model)
                                    console.log(data)
                                })
                            ),

                            div(textbox({ value: model.projectName, size: 60, })),
                            ribRoot(model)
                        )
                    )
                    //root.appendChild(ribRoot(model)
                })
                |> (o => o.subscribe(obj => {
                    restore(model, obj)
                }))
            ),
        )
    )
}
