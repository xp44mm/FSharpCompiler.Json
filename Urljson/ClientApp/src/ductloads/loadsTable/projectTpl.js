import { map } from 'rxjs/operators'
import { button, tbody, td, th, tr, tfoot } from '../../hyperscript'
import { ProjectViewModel } from '../model'

import { clusterTpl } from './clusterTpl'

export const projectTpl = (project = new ProjectViewModel()) => {
    let root = tbody(
        tr(
            th(),
            td(
                button('添加烟道').subscribeEvent('click', e => {
                    project.push()
                })
            ),
            td(),
            td(),
        )
    )

    //添加支架组`cluster`
    project.clusters.push$
        |> map(item => clusterTpl(item, project))
        |> (obs =>
            obs.subscribe(tbody => {
                root.parentNode.insertBefore(tbody, root)
            }))

    //删除支架组`cluster`
    project.clusters.remove$.subscribe(i => {
        let tbl = root.parentNode
        tbl.removeChild(tbl.children[i + 1])
    })

    return root
}
