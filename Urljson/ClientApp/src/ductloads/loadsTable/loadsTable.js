import { div, table, th, thead, tr } from '../../hyperscript'
import { ProjectViewModel } from '../model'
import { projectTpl } from './projectTpl'

export const loadsTable = (project = new ProjectViewModel()) => {
    let root = div(
        table(
            thead(
                tr(
                    th({ 'style.width': '80px' }, '类型'),
                    th({ 'style.width': 'calc(50% - 80px)' }, '规格'),
                    th({ 'style.width': 'calc(50% - 80px)' }, '配置'),
                    th({ 'style.width': '80px' })
                )
            ),
            projectTpl(project)
        )
    )
    return root
}
