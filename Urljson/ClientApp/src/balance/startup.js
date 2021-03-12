import { BehaviorSubject } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { restore } from '../deep'
import { button, div } from '../hyperscript'
import { textarea } from '../hyperscript/form'
import { balanceBinding } from './bindings'
import { home } from './Home'
import { json } from './json'
import { BalanceViewModel } from './model'

export function startup() {
    //模型区域
    let model = new BalanceViewModel()
    let textarea$ = new BehaviorSubject(JSON.stringify(json))
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
                        root.appendChild(home(model))
                    })
                    |> (o =>
                        o.subscribe(obj => {
                            restore(model, obj)
                            balanceBinding(model)
                        }))
            )
        )
    )
}
