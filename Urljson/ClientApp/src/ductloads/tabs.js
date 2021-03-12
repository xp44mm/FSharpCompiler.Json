import { BehaviorSubject } from 'rxjs'
import { bindTabIndex, tabNavItem, tabPanel, tabRoot } from '../hyperscript/component/tabControl'
import { ProjectViewModel } from './model'
import { loadsTable } from './loadsTable'
import { supportsTable } from './supportsTable'
import { loadReport } from './loadReport'
import { supportReport } from './supportReport'

export function tabs(project = new ProjectViewModel()) {
    let root = tabRoot()

    let navs = root.firstChild
    let panels = root.lastChild

    navs.appendChild(tabNavItem('荷载'))
    panels.appendChild(tabPanel(loadsTable(project)))

    navs.appendChild(tabNavItem('支架'))
    panels.appendChild(tabPanel(supportsTable(project)))

    navs.appendChild(tabNavItem('荷载报表'))
    panels.appendChild(tabPanel(loadReport(project)))

    navs.appendChild(tabNavItem('支架报表'))
    panels.appendChild(tabPanel(supportReport(project)))

    bindTabIndex(root, new BehaviorSubject(0))

    return root
}

//tags: ['荷载', '支架', '荷载报表', '支架报表',],
//    panels: [
//        loadsTable(project),
//        supportsTable(project),
//        loadReport(project),
//        supportReport(project),
//    ]
