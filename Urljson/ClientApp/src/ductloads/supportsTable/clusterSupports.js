import { map } from 'rxjs/operators'
import { b, td, textNode, tr } from '../../hyperscript'
import { ClusterViewModel } from '../model'
import { supportTpl } from './supportTpl'

export const clusterSupports = (cluster = new ClusterViewModel()) => {
    let firstRow = tr(

        td(b('烟道')),

        td(textNode(cluster.spec)),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td(),
        td()
    )

    cluster.supports.push$
        |> map(item => supportTpl(item))
        |> (obs =>
            obs.subscribe(row => {
                let parent = firstRow.parentNode
                let allChildren = Array.from(parent.children)
                let offset =
                    allChildren.indexOf(firstRow) + cluster.supports.length

                parent.insertBefore(row, allChildren[offset])
            }))

    cluster.supports.remove$.subscribe(i => {
        let parent = firstRow.parentNode
        let allChildren = Array.from(parent.children)
        let offset = allChildren.indexOf(firstRow) + 1 + i

        parent.removeChild(allChildren[offset])
    })

    return firstRow
}
