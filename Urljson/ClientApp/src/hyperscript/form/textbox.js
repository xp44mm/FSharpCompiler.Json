import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import { input } from '../tags'

export function textbox(props) {
    let elem = input({ ...props, type: 'text' })
    elem.pipeEvent(
        'input',
        input$ =>
            input$
            |> map(e => e.target.value)
            |> (o => o.subscribe(props.value))
    )
    return elem
}
