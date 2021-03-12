import { tbody, td, textNode, tr } from '../../hyperscript'

export const resultTbody = ({
    density,
    solids,
    flow,
    diameter,
    area,
    delta,
    dv,
    kv,
    veloc,
    head,
    re,
    lambda,
}) =>
    tbody([
        tr(
            td('密度'), td('kg/m3'), td({ className: 'text-right' }, textNode(density)), td()),

        tr(
            td('含固量'), td('%'), td({ className: 'text-right' }, textNode(solids)), td()),

        tr(td('流量'), td('m3/hr'), td({ className: 'text-right' }, textNode(flow)), td()),

        tr(td('管道直径'), td('mm'), td({ className: 'text-right' }, textNode(diameter)), td()),

        tr(td('管道截面积'), td('m2'), td({ className: 'text-right' }, textNode(area)), td()),

        tr(td('相对粗糙度'), td('#'), td({ className: 'text-right' }, textNode(delta)), td()),

        tr(td('Dv'), td('Pa*s'), td({ className: 'text-right' }, textNode(dv)), td()),

        tr(td('运动粘度'), td('m2/s'), td({ className: 'text-right' }, textNode(kv)), td()),

        tr(td('流速'), td('m/s'), td({ className: 'text-right' }, textNode(veloc)), td()),

        tr(td('动压头'), td('m'), td({ className: 'text-right' }, textNode(head)), td()),

        tr(td('雷诺数'), td('#'), td({ className: 'text-right' }, textNode(re)), td()),

        tr(td('沿程阻力系数'), td('#'), td({ className: 'text-right' }, textNode(lambda)), td()),
    ])
