import { BehaviorSubject } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { pickout, restore } from '../deep'
import { button, div, h3, span } from '../hyperscript'
import { textarea, textbox } from '../hyperscript/form'
import { tabs } from './tabs'
import initialData  from './input.json'
import { TableViewModel } from './model'


export function startup() {
    let model = new TableViewModel()
    let textarea$ = new BehaviorSubject(JSON.stringify(initialData))

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
                        while (root.firstChild) {
                            root.removeChild(root.firstChild)
                        }
                        root.appendChild(
                            div(
                                h3(
                                    span({ 'style.margin': '0 16px 0 0' }, '烟道材料统计'),

                                    button({ 'style.margin': '0 16px' }, '保存'
                                    ).subscribeEvent('click', _ => {
                                        let data = pickout(model)
                                        console.log(data)
                                    })
                                ),

                                div(textbox({ value: model.projectName, size: 60, })),
                                tabs(model)
                            )
                        )
                    })
                    |> (o => o.subscribe(obj => {
                        restore(model, obj)
                    }))
            )
        )
    )
}
