import { input } from '../tags'

//无需,见radioTest.js
export function radio(props) {
    let elem = input({ ...props, type: 'radio' })
    return elem
}
