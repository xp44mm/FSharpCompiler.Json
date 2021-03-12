import { map } from 'rxjs/operators'
import { collapse } from './collapse'

///yin,yang必须是元素节点，因为要附着属性，所以不能是textNode。
export function flip(isYin, yin, yang) {
    return [
        ...collapse(isYin, yin),
        ...collapse(isYin |> map(v => !v), yang)
    ]
}
