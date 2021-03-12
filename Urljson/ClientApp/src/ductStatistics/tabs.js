import { BehaviorSubject } from 'rxjs'
import { bindTabIndex, tabNavItem, tabPanel } from '../hyperscript/component/tabControl'
import { button, div, li, ul, h3 } from '../hyperscript'
import { inputTable } from './inputTable';
import { outputTable } from './outputTable';

import { TableViewModel } from './model';
export function tabs(model = new TableViewModel()) {
    let tabIndex = new BehaviorSubject(0)

    let root = div(
        ul({ className: 'nav nav-tabs', },
            tabNavItem('输入'),
            tabNavItem('结果'),
        ),
        div({ className: 'tab-content', },
            tabPanel(inputTable(model)),
            tabPanel(outputTable(model)),
        )
    )


    bindTabIndex(root, tabIndex)

    return  root

}