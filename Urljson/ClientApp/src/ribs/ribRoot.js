import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { div, textNode } from '../hyperscript'
import { bindTabIndex, tabNavItem, tabPanel, tabRoot } from '../hyperscript/component'
import { ProjectViewModel } from './model'
import { project } from './project'
import { rib } from './rib'
import { ribTabTable } from './ribTabTable'

export function ribRoot(model = new ProjectViewModel()) {
    let root = tabRoot()

    let navs = root.firstChild
    let panels = root.lastChild

    navs.appendChild(tabNavItem('首頁'))
    panels.appendChild(tabPanel(div(project(model), ribTabTable(model))))

    model.ribs.push$
        |> map(item => ({
            nav: tabNavItem(textNode(item.title)),
            panel: tabPanel(rib(item)),
        }))
        |> (o => o.subscribe(({ nav, panel }) => {
                navs.appendChild(nav)
                panels.appendChild(panel)
            }))

    model.ribs.remove$
        |> (o => o.subscribe(i => {
            navs.removeChild(navs.childNodes[i + 1])
            panels.removeChild(panels.childNodes[i + 1])
            }))

    bindTabIndex(root, new BehaviorSubject(0))

    return root
}
