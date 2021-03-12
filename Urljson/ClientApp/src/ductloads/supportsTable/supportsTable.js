import { map } from 'rxjs/operators'
import { table, th, thead, tr } from '../../hyperscript'
import { ProjectViewModel } from '../model'
import { clusterSupports } from './clusterSupports'

export const supportsTable = (project = new ProjectViewModel()) => {
    let root = table(
        thead([
            tr(
                th({ 'style.width': '50px' }, '编号'),
                th({ 'style.width': '300px' }, '类型'),
                th('工作(kN)'),
                th('工作X(kN)'),
                th('工作Y(kN)'),

                th('积灰(kN)'),
                th('积灰X(kN)'),
                th('积灰Y(kN)'),

                th('内压Z(kN)'),
                th('内压X(kN)'),
                th('内压Y(kN)'),

                th('备注')
            ),
        ])
    )

    project.clusters.push$
        |> map(item => clusterSupports(item))
        |> (obs =>
            obs.subscribe(tbody => {
                root.appendChild(tbody)
            }))

    project.clusters.remove$.subscribe(i => {
        root.removeChild(root.children[i + 1])
    })

    return root
}
