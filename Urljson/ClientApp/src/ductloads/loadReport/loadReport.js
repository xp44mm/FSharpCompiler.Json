import { of } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { table, tbody, td, textNode, th, thead, tr, fragment } from '../../hyperscript'
import { chineseLoadKinds, ClusterViewModel, LoadViewModel, ProjectViewModel, SupportViewModel } from '../model'
import { paramRepr } from './paramRepr'
import { sectionRepr } from './sectionRepr'

export function loadReport(project = new ProjectViewModel()) {
    let tbl = table(
        thead(
            tr(
                th({ 'style.width':'4em' }, '序号'),
                th({ 'style.width': '4em' }, '类型'),
                th({ 'style.width': '12em' },  '规格'),
                th({}, '参数'),
                th({ 'style.width': '6em' }, '自重(kN)'),
                th({ 'style.width': '6em' },  '积灰(kN)'),
                th({ 'style.width': '6em' }, '内压Z(kN)'),
                th({ 'style.width': '6em' },  '内压X(kN)'),
                th({ 'style.width': '6em' }, '内压Y(kN)'),
                th({ 'style.width': '10em' },  '备注')
            )
        ),
    )

    //添加烟道
    project.clusters.push$
        |> map(item => clusterTitleBody(item))
        |> (obs => obs.subscribe(tbd => { tbl.appendChild(tbd) }))

    //删除烟道，标题tbody，后面跟着烟道的支架tbody
    project.clusters.remove$.subscribe(i => {
        let bodies = tbl.querySelectorAll('tbody.duct')
        let i1 = [...tbl.childNodes].indexOf(bodies[i])
        let i2 = bodies.length > i + 1 ? [...tbl.childNodes].indexOf(bodies[i + 1]) : tbl.childNodes.length

        tbl.slice(i1, i2).forEach(tbd => {
            tbl.removeChild(tbd)
        })
    })

    return tbl
}

//散装的table body，散装指的是没有容器，table body是支架的。
function clusterTitleBody(cluster = new ClusterViewModel()) {
    let titleBody = tbody({ className: 'duct', 'style.display': 'none' })

    //添加支架tbody
    cluster.supports.push$
        |> map(item => supportBody(item))
        |> (obs => obs.subscribe(tbd => {
            let tbl = titleBody.parentNode
            let i = [...tbl.childNodes].indexOf(titleBody)
            let j = cluster.supports.length
            let nextClusterTitleBody = tbl.childNodes[i + j]
            //If this is null, then newNode is inserted at the end of parentNode's child nodes.
            tbl.insertBefore(tbd, nextClusterTitleBody)
        }))

    //删除支架tbody
    cluster.supports.remove$.subscribe(i => {
        let tbl = titleBody.parentNode
        let j = [...tbl.childNodes].indexOf(titleBody)
        let target = tbl.childNodes[i + j + 1]
        tbl.removeChild(target)
    })

    return titleBody

}

function supportBody(support = new SupportViewModel()) {
    let container = tbody(tr(
        th(textNode(support.pos)),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),

    ))

    support.loads.push$
        |> map(item => loadRow(item))
        |> (obs => obs.subscribe(row => {
            container.appendChild(row)
        }))

    support.loads.remove$.subscribe(i => {
        container.removeChild(container.childNodes[i + 1])
    })

    return container
}

function loadRow(load = new LoadViewModel()) {
    let row = tr(
        th(),
        td(textNode(load.kind |> map(kind => chineseLoadKinds[kind]))),
        td(
            textNode(sectionRepr(load))
        ),

        td(
            textNode(paramRepr(load))
        ),
        td({ className: 'text-right', }, textNode(load.weight |> map(n=>n.toFixed(1)))),
        td({ className: 'text-right', }, textNode(load.ashWeight |> map(n => n.toFixed(1)))),
        td({ className: 'text-right', }, textNode(load.loadZ |> map(n => n.toFixed(2)))),
        td({ className: 'text-right', }, textNode(load.loadX |> map(n => n.toFixed(2)))),
        td({ className: 'text-right', }, textNode(load.loadY |> map(n => n.toFixed(2)))),
        td()
    )

    return row
}
