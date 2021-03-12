import { map, tap } from 'rxjs/operators'
import { input } from '../tags'

export function checkbox(props) {
    let elem = input({ ...props, type: 'checkbox' })

    elem.pipeEvent('input', input$ =>
        input$.pipe(
            map(e => e.target.checked),
        ).subscribe(props.checked)
    )

    return elem
}
