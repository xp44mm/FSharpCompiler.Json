import { literal, literalArray } from './literal'
import { whitespace } from './whitespace'

export function parseHTML() {
    let inp = document.createElement('textarea')
    inp.setAttribute('placeholder', '粘贴或输入HTML')
    inp.setAttribute('rows', 7)

    let btn = document.createElement('button')
    btn.classList.add('btn-primary')
    btn.appendChild(document.createTextNode('生成代码'))

    let preview = document.createElement('textarea')
    preview.toggleAttribute('readonly')
    preview.setAttribute('rows', 14)

    btn.addEventListener('click', function(e) {
        let wrapper = document.createElement('div')
        wrapper.innerHTML = inp.value
        wrapper.normalize() // 递归：all of wrapper's sub-tree into a "normalized" form.
        whitespace(wrapper)

        let literalText =
            wrapper.childNodes.length === 1
                ? literal(wrapper.firstChild)
                : literalArray(wrapper.childNodes)
        preview.value = literalText
        preview.select()
    })

    let root = document.createElement('div')
    root.appendChild(inp)
    root.appendChild(btn)
    root.appendChild(preview)
    return root
}
