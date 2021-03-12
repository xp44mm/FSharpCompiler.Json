import './style.css'
import { fragment,h1 } from './hyperscript'

//import { parseHTML } from './parseHTML'
//let elem = parseHTML()

let elem = h1("服务器已经启动")

document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('root')
    let element = elem instanceof Array ? fragment(...elem) : elem
    root.appendChild(element)
})

