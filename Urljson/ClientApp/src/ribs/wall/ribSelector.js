import { BehaviorSubject } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { button, option, textNode, div, optgroup } from '../../hyperscript'
import { select } from '../../hyperscript/form'
import { RibSectionViewModel } from '../model'
import { getRibKind } from './ribData'
import { ribData } from './ribData'

let ribKinds = Object.keys(ribData)

export function ribSelector(model = new RibSectionViewModel()) {
    //组件的状态
    let isEdit = new BehaviorSubject(false)
    let kind = new BehaviorSubject('槽钢')
    let spec = new BehaviorSubject('[20a')

    let root = div([
        div({ '.hidden': isEdit },
            textNode(model.ribSpec |> map(spec => getRibKind(spec))),
            ' ',
            textNode(model.ribSpec),
            button('编辑').pipeEvent(
                'click',
                click$ =>
                    click$
                    |> withLatestFrom(model.ribSpec)
                    |> map(([_, x]) => x)
                    |> tap(x => { isEdit.next(true) })
                    |> (o => o.subscribe(ribSpec => {
                        kind.next(getRibKind(ribSpec))
                        spec.next(ribSpec)
                    }))
            )
        ),

        div({ '.hidden': isEdit |> map(v => !v) },
            select({ value: kind }, ribKinds.map(text => option({ text }))),

            //代码演示：当选择值与选项都不匹配时，显示空白
            ...Object.entries(ribData).map(([k, specs]) =>
                select({
                    value: spec,
                    '.hidden': kind |> map(kind => kind !== k)
                }, specs.map(text => option({ text }))),
            ),

            //代码演示：option可以不显示：display:none
            //select({
            //    value: spec,
            //},
            //    ...Object.entries(ribData).map(([k, specs]) =>
            //        optgroup({
            //            label:k,
            //            '.hidden': kind |> map(kind => kind !== k)
            //        },
            //            specs.map(text => option({ text }))
            //        )
            //    ),
            //),

            button('設定').pipeEvent('click', click$ =>
                click$
                |> withLatestFrom(spec)
                |> map(([_, v]) => v)
                |> tap(() => { isEdit.next(false) })
                |> (o => o.subscribe(model.ribSpec))
            ),
            button('取消').subscribeEvent('click', _ => {
                isEdit.next(false)
            })
        )
    ])
    return root
}

