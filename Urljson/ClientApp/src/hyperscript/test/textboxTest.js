import { BehaviorSubject, fromEvent } from 'rxjs'
import { button, div, textNode,textbox } from '..'

export function textboxTest() {
    let value = new BehaviorSubject('ddd')
    value.subscribe(console.log)

    let backgroundColor = new BehaviorSubject('red')

    return div(
        textbox({ value, 'style.backgroundColor': backgroundColor }),
        button('修改').subscribeEvent('click', e => {
            value.next('xxxx')
            backgroundColor.next('blue')
        }),
        textNode(value)
    )
}
