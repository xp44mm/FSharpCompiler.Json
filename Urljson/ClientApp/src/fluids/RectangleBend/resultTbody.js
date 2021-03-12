import { tbody, td, tr, textNode } from '../../hyperscript'
import { ResultViewModel } from './RectangleBendViewModel'

export const resultTbody = (data = new ResultViewModel()) =>
    tbody([
        tr(
            td('入口宽度'), td('m'),
            td({ className: 'text-right' }, textNode(data.widthInlet)), td()
        ),
        tr(
            td('出口宽度'), td('m'),
            td({ className: 'text-right' }, textNode(data.widthOutlet)), td()
        ),
        tr(
            td('高度'), td('m'),
            td({ className: 'text-right' }, textNode(data.height)), td()
        ),
        tr(
            td('半径'), td('m'),
            td({ className: 'text-right' }, textNode(data.radius)), td()
        ),
        tr(
            td('转角'), td('°'),
            td({ className: 'text-right' }, textNode(data.angle)), td()
        ),
        tr(
            td('截面积'), td('m2'),
            td({ className: 'text-right' }, textNode(data.area)), td()
        ),
        tr(td('阻力系数'), td('#'),
            td({ className: 'text-right' }, textNode(data.zeta)), td()
        ),
    ])
