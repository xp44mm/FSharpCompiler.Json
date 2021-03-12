import { map } from 'rxjs/operators'
import { button, td, th, tr } from '../../hyperscript'
import { textbox } from '../../hyperscript/form'
import { ClusterViewModel, SupportViewModel } from '../model'
import { loadlineTpl } from './loadlineTpl'
import { loadtdsTpl } from './loadtdsTpl'

export const supportRows = (
    support = new SupportViewModel(),
    cluster = new ClusterViewModel()
) => {
    let firstRow = tr({ className: 'support-row' }, [
        th('支架'),
        td(textbox({ className: 'full-width', title: '支架编号', value: support.pos })),
        td(),
        td(
            button('删除支架').subscribeEvent('click', e => {
                cluster.remove(support)
            })
        ),
    ])

    let lastRow = tr({ className: 'support-last' }, [
        th(),
        td(
            button('添加荷载').subscribeEvent('click', e => {
                support.push()
            })
        ),
        td(),
        td(),
    ])

    support.loads.push$
        |> map(item => loadlineTpl(item, support))
        |> (obs =>
            obs.subscribe(row => {
                lastRow.parentNode.insertBefore(row, lastRow)
            }))

    support.loads.remove$.subscribe(i => {
        let tbody = firstRow.parentNode
        let offset = Array.from(tbody.children).indexOf(firstRow) + 1
        tbody.removeChild(tbody.children[offset + i])
    })

    return [firstRow, lastRow] // root
}
