import { hyperscriptArgs } from './hyperscriptArgs'
import { parsePropName } from './parsePropName'
import { partitionObservable } from './partitionObservable'
import { pipeEvent, subscribeEvent } from './event'
import { setProps } from './setProps'
import { isNode } from './isNode'

/**
 * 輸入元素名，屬性，子元素。
 * @param {any} elem
 * @param {...any} args == props?, children
 */
export function hyperscript(elem, ...args) {
    let element = document.createElement(elem)

    let { props, children } = hyperscriptArgs(args)

    setProps(element, props)

    //支持子元素包含在数组中：fn([a,b,c]), fn(a,b,c)
    children =
        children.length === 1 && Array.isArray(children[0])
            ? children[0]
            : children

    // append children
    children
        .map(child => (isNode(child) ? child : document.createTextNode(child)))
        .forEach(child => {
            element.appendChild(child)
        })

    element.pipeEvent = pipeEvent(element)
    element.subscribeEvent = subscribeEvent(element)

    return element
}
