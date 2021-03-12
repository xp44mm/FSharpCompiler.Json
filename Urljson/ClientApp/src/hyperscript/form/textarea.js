import { map } from 'rxjs/operators'
import { textarea as createTextarea } from '../tags'

export function textarea(props) {
    let elem = createTextarea(props)

    elem.pipeEvent(
        'input',
        input$ =>
            input$
            |> map(e => e.target.value)
            |> (o => o.subscribe(props.value))
    )

    return elem
}
