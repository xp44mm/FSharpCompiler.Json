import { BehaviorSubject } from 'rxjs'
import { bindTabIndex, tabNavItem, tabPanel } from '../hyperscript/component/tabControl'
import { button, div, li, ul, h3 } from '../hyperscript'
import { SectionsViewModel } from './model/SectionsViewModel';
import { inputPanel } from './inputPanel';
import { outputTable } from './outputTable';

export function tabs(sections = new SectionsViewModel()) {
    let root = div(
        ul({ className: 'nav nav-tabs', },
            tabNavItem('输入'),
            tabNavItem('报告'),
        ),
        div({ className: 'tab-content', },
            tabPanel(inputPanel(sections)),
            tabPanel(outputTable(sections)),
        )
    )

    let tabIndex = new BehaviorSubject(0)

    bindTabIndex(root, tabIndex)

    return  root

}