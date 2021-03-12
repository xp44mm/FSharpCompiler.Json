import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { tbody, td, textNode, tr } from '../../hyperscript'

export function shapeResult(data) {
    let unionCase = { [data.kind]: data[data.kind] }
    return JSON.stringify(unionCase)
}

export const resultTbody = data => {
    return tbody({ key: 'output' }, [
        tr(td('入口(1)'), td('m'), td(textNode(data.sinlet)), td()),
        tr(
            td('出口(2)'),
            td('m'),
            td(textNode(data.soutlet)),

            td()
        ),
        tr(td('扩散角/收缩角'), td('°'), td({ className: 'text-right' }, textNode(data.angle)), td()),

        tr(td('截面积'), td('m2'), td({ className: 'text-right' }, textNode(data.area)), td()),
        tr(td('阻力系数'), td('#'), td({ className: 'text-right' }, textNode(data.zeta)), td()),
    ])
}
