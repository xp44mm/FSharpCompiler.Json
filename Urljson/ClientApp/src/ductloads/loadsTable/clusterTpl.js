import { map } from 'rxjs/operators'
import { button, fragment, tbody, td,  th, tr } from '../../hyperscript'
import { textbox } from '../../hyperscript/form'

import { ClusterViewModel } from '../model'
import { supportRows } from './supportRows'

export const clusterTpl = (cluster = new ClusterViewModel(), project) => {
    let firstRow = tr([
        th('烟道分段'),
        td(textbox({ className:'full-width', title: '烟道说明', value: cluster.spec })),
        td(),
        td(
            button('删除烟道').subscribeEvent('click', e => {
                project.remove(cluster)
            })
        ),
    ])

    let lastRow = tr([
        th(),
        td(
            button('添加支架').subscribeEvent('click', e => {
                cluster.push()
            })
        ),
        td(),
        td(),
    ])

    //添加支架
    cluster.supports.push$
        |> map(item => supportRows(item, cluster))
        |> (obs => obs.subscribe(rows => {
            lastRow.parentNode.insertBefore(fragment(...rows), lastRow)
        }))

    //刪除多行，對應模型刪除一項。
    cluster.supports.remove$.subscribe(i => {
        let tbody = firstRow.parentNode
        let allRows = Array.from(tbody.children)
        let rows1 = allRows.filter(row => row.className === 'support-row')
        let rows2 = allRows.filter(row => row.className === 'support-last')

        let i1 = allRows.indexOf(rows1[i])
        let i2 = allRows.indexOf(rows2[i])

        allRows.slice(i1, i2 + 1).forEach(row => {
            tbody.removeChild(row)
        })
    })

    return tbody(firstRow, lastRow)
}
