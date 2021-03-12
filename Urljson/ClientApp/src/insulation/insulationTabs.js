import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { textNode } from '../hyperscript'
import { bindTabIndex, tabNavItem, tabPanel, tabRoot } from '../hyperscript/component'
import { insulation } from './insulation'
import { ProjectViewModel } from './model'
import { project } from './project'

export function insulationTabs(model = new ProjectViewModel()) {
    let root = tabRoot()

    let navs = root.firstChild
    let panels = root.lastChild

    navs.appendChild(tabNavItem('首頁'))
    panels.appendChild(tabPanel(project(model)))

    model.insulations.push$
        |> map(item => ({
            nav: tabNavItem(textNode(item.title)),
            panel: tabPanel(insulation(item)),
        }))
        |> (o =>
            o.subscribe(({ nav, panel }) => {
                navs.appendChild(nav)
                panels.appendChild(panel)
            }))

    model.insulations.remove$
        |> (o =>
            o.subscribe(i => {
                navs.removeChild(navs.children[i + 1])
                panels.removeChild(panels.children[i + 1])
            }))

    bindTabIndex(root, new BehaviorSubject(0))

    return root
}
