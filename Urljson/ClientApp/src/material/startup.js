import { BehaviorSubject } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { restore } from '../deep'
import { button, div } from '../hyperscript'
import { textarea } from '../hyperscript/form'
import { inputPanel } from './inputPanel'
import { json } from './json'
import { ProjectViewModel } from './ProjectViewModel'

export function startup() {
    let model = new ProjectViewModel()
    let textarea$ = new BehaviorSubject(JSON.stringify(json))

    let root = document.getElementById('root')

    //视图区域
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
                        restore(model, obj)
                    })
                    |> (o =>
                        o.subscribe(() => {
                            while (root.firstChild) {
                                root.removeChild(root.firstChild)
                            }
                            root.appendChild(inputPanel(model))
                        }))
            )
        )
    )
}
