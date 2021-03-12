import { BehaviorSubject } from 'rxjs'
import { map, mergeMap, take } from 'rxjs/operators'
import { button, div, textNode } from '..'
import { checkbox } from '../form'

export const checkboxTest = () => {
    let checked = new BehaviorSubject(false)

    //輸出控制臺，觀察後端主題的狀態
    checked.subscribe(checked => {
        console.log(checked)
    })

    return div(
        textNode('checkboxTest'),
        checkbox({ checked }),
        button('反转').pipeEvent(
            'click',
            event =>
                event
                |> mergeMap(() => checked )
                |> map(ck => !ck)
                |> take(1)
                |> (o => o.subscribe(checked))
        ),

        textNode(checked)
    )
}
