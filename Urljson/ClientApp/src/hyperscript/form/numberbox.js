import { map } from 'rxjs/operators'
import { input } from '../tags'

export function numberbox(props = {}) {
    let { number, ...rest } = props

    let value = number.pipe(map(n => String(n)))

    let elem = input({ ...rest, value, type: 'text' })

    elem.pipeEvent('blur', blur$ =>
        blur$.pipe(
            map(e => Number(e.target.value))
        ).subscribe(newValue => {
            if (Number.isNaN(newValue)) {
                elem.select()
            } else if (number.value !== newValue) {
                number.next(newValue)
            }
        })
    )

    //数字右对齐，用style可以获得最高优先级
    elem.style.textAlign = 'right'

    return elem
}
