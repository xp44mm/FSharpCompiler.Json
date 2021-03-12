/// 用途：插入一组元素，不必使用循环语句，fragment用后即弃。
export function fragment(...children) {
    children = children.length === 1 && Array.isArray(children[0]) ? children[0] : children

    let frag = new DocumentFragment()
    children.forEach(elem => {
        frag.appendChild(elem)
    })
    return frag
}
