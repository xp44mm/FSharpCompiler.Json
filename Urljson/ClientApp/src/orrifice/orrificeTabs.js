import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { textNode } from '../hyperscript'
import { bindTabIndex, tabNavItem, tabPanel, tabRoot } from '../hyperscript/component/tabControl'
import { ProjectViewModel } from './model'
import { pipeline } from './pipeline'
import { project } from './project'


export function orrificeTabs(model = new ProjectViewModel()) {
    let root = tabRoot()

    let navs = root.firstChild
    let panels = root.lastChild

    navs.appendChild(tabNavItem('首頁'))
    panels.appendChild(tabPanel(project(model)))

    model.pipelines.push$
        |> map(pl => ({
            nav: tabNavItem(textNode(pl.title)),
            panel: tabPanel(pipeline(pl)),
        }))
        |> (o => o.subscribe(({ nav, panel }) => {
            navs.appendChild(nav)
            panels.appendChild(panel)
        }))

    model.pipelines.remove$
        |> (o => o.subscribe(i => {
            navs.removeChild(navs.children[i + 1])
            panels.removeChild(panels.children[i + 1])
        }))

    bindTabIndex(root, new BehaviorSubject(0))

    return root
}
