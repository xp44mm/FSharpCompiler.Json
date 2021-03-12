import { isObservable } from 'rxjs'

export function textNode(text) {
    if (isObservable(text)) {
        let node = document.createTextNode("")
        text.subscribe(t => {
            node.nodeValue = t
        })
        return node
    } else {
        return document.createTextNode(text)
    }
}
