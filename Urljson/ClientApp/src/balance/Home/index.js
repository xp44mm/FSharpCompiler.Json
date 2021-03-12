import { BehaviorSubject } from 'rxjs'
import { pickout } from '../../deep'
import { button, div, h3, span } from '../../hyperscript'
import {
    bindTabIndex,
    tabNavItem,
    tabPanel,
    tabRoot
} from '../../hyperscript/component'
import { BalanceViewModel } from '../model'
import { absorberTable } from './absorber'
import { atmospherePanel } from './atmosphere'
import { coalPanel } from './coal'
import { dewateringTable } from './dewatering'
import { exessairPanel } from './exessair'
import { gasTable } from './gas'
import { gasAnalysisTable } from './gasAnalysis'
import { gasInputTable } from './gasInput'
import { limestoneTable } from './limestone'
import { liquidPanel } from './liquids'
import { performanceTable } from './performance'
import { towerResultTable } from './towerResult'

export function home(model = new BalanceViewModel()) {
    let tabs = tabRoot()

    let navs = tabs.firstChild
    let panels = tabs.lastChild

    let appendPage = (tag, page) => {
        navs.appendChild(tabNavItem(tag))
        panels.appendChild(tabPanel(page))
    }

    appendPage('大气', atmospherePanel(model))
    appendPage('煤燃烧', coalPanel(model))
    appendPage('过量空气', exessairPanel(model))
    appendPage('烟气量', gasAnalysisTable(model))
    appendPage('输入', gasInputTable(model))
    appendPage('石灰石', limestoneTable(model))
    appendPage('吸收塔', absorberTable(model))
    appendPage('脱水系统', dewateringTable(model))
    appendPage('吸收塔结果', towerResultTable(model))
    appendPage('烟气', gasTable(model))
    appendPage('浆液', liquidPanel(model))
    appendPage('性能', performanceTable(model))

    bindTabIndex(tabs, new BehaviorSubject(0))

    return div(
        h3(

            span({ 'style.margin': '0 16px 0 0' }, '脱硫物料平衡'),

            button({ 'style.margin': '0 16px' }, '保存').subscribeEvent('click', _ => {
                let data = pickout(model)
                console.log(data)
            }),

        ),
        tabs)

}

