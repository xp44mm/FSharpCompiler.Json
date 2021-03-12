import { tbody, td, textNode, tr } from '../../hyperscript'

export const resultTbody = data =>
    tbody([
        tr(td('直径'), td('m'), td({ className: 'text-right' }, textNode(data.diameter)), td()),
        tr(td('转角'), td('°'), td({ className: 'text-right' }, textNode(data.angle)), td()),
        tr(td('截面积'), td('m2'), td({ className: 'text-right' }, textNode(data.area)), td()),
        tr(td('阻力系数'), td('#'), td({ className: 'text-right' }, textNode(data.zeta)), td()),
    ])
