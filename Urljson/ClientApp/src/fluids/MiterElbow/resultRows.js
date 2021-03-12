import { tbody, td, tr, textNode } from '../../hyperscript'

export const resultRows = data =>
    tbody(
        ...[
            tr(td('直径(D)'), td('m'), td({ className: 'text-right' }, textNode(data.diameter)), td()),
            tr(td('半径(R)'), td('m'), td({ className: 'text-right' }, textNode(data.radius)), td()),
            tr(td('转角'), td('°'), td({ className: 'text-right' }, textNode(data.angle)), td()),
            tr(td('截面积'), td('m2'), td({ className: 'text-right' }, textNode(data.area)), td()),
            tr(td('阻力系数'), td('#'), td({ className: 'text-right' }, textNode(data.zeta)), td()),
            tr(
                td('90°虾米弯最少焊缝数'),
                td('#'),
                td({ className: 'text-right' }, textNode(data.weld)),
                td()
            ),
        ]
    )
