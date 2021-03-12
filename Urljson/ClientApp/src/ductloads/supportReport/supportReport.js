import { of } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { ClusterViewModel, ProjectViewModel, SupportViewModel } from '../model'

export function supportReport(project = new ProjectViewModel()) {
    let tbl = table(
        thead(
            tr(
                th({ scope: 'col' }, '编号'),
                th({ scope: 'col' }, '方向角'),
                th({ scope: 'col' }, '自重(kN)'),
                th({ scope: 'col' }, '自重X'),
                th({ scope: 'col' }, '自重Y'),
                th({ scope: 'col' }, '积灰(kN)'),
                th({ scope: 'col' }, '积灰X'),
                th({ scope: 'col' }, '积灰Y'),
                th({ scope: 'col' }, '内压Z(kN)'),
                th({ scope: 'col' }, '内压X'),
                th({ scope: 'col' }, '内压Y'),
                th({ scope: 'col' }, '备注')
            )
        ),
        //tbody()
    )

    //添加支架组
    project.clusters.push$
        |> map(item => clusterBody(item))
        |> (obs => obs.subscribe(tbody => {
            tbl.appendChild(tbody)
        }))

    //删除支架组
    project.clusters.remove$.subscribe(i => {
        let tbl = root.parentNode
        tbl.removeChild(tbl.children[i + 1]) //thead占1位
    })

    return tbl
}

function clusterBody(cluster = new ClusterViewModel()) {
    let clusterContainer = tbody(tr([
        th({ colSpan: 2, scope: 'row' }, textNode(cluster.spec)),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
    ]))


    //添加支架
    cluster.supports.push$
        |> map(item => supportRow(item))
        |> (obs => obs.subscribe(row => {
            clusterContainer.appendChild(row)
        }))

    //刪除多行，對應模型刪除一項。
    cluster.supports.remove$.subscribe(i => {
        let target = clusterContainer.children[i + 1] //第一行是claster title
        clusterContainer.removeChild(target)
    })

    return clusterContainer
}

function supportRow(support = new SupportViewModel()) {
    let row = tr([
        th(textNode(support.pos)),
        td(
            { className: 'text-center' },
            textNode(
                support.isFixed
                |> mergeMap(
                    isfixed => (isfixed ? of('X') : support.slip.direction)
                )
            )
        ),

        td({ className: 'text-right' }, textNode(support.weight |> map(n => n.toFixed(1)))),
        td({ className: 'text-right' }, textNode(support.weightFrictionX |> map(n => n.toFixed(2)))),
        td({ className: 'text-right' }, textNode(support.weightFrictionY |> map(n => n.toFixed(2)))),

        td({ className: 'text-right' }, textNode(support.ashWeight |> map(n => n.toFixed(1)))),
        td({ className: 'text-right' }, textNode(support.ashWeightFrictionX |> map(n => n.toFixed(2)))),
        td({ className: 'text-right' }, textNode(support.ashWeightFrictionY |> map(n => n.toFixed(2)))),

        td({ className: 'text-right' }, textNode(support.loadZ |> map(n => n.toFixed(2)))),
        td({ className: 'text-right' }, textNode(support.loadX |> map(n => n.toFixed(2)))),
        td({ className: 'text-right' }, textNode(support.loadY |> map(n => n.toFixed(2)))),

        td(),
    ])

    return row
}
