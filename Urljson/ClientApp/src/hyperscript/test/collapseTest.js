import { BehaviorSubject } from 'rxjs'
import { map, mergeMap, take } from 'rxjs/operators'
import { button, div, textNode } from '..'
import { checkbox } from '../form'
import { collapse } from '../component'

export const collapseTest = () => {
    let checked = new BehaviorSubject(false)

    //輸出控制臺，觀察後端主題的狀態
    checked.subscribe(checked => {
        console.log(checked)
    })

    return div(
        textNode('checkboxTest'),
        checkbox({ checked }),
        ...collapse(checked, div('显示内容'))
    )
}
