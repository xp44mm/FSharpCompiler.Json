import { option, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox, select } from '../../hyperscript/form'
import { RibViewModel } from '../model'
import { steelRows } from './steelRows'

export const basicTable = (rib = new RibViewModel()) =>
    table(
        thead(tr(th('名称'), th('单位'), th('数值'), th('备注'))),
        tbody(
            tr(
                td('自振频率'),
                td('Hz'),
                td({ className: 'text-right' }, 
                    select(
                        { value: rib.frequency },
                        [20, 40].map(value => option({ value, text: value }))
                    )
                ),
                td()
            ),

            tr(
                td('标高'),
                td('m'),
                td({ className: 'text-right' }, numberbox({ number: rib.elevation })),
                td()
            ),

            tr(
                td('风压高度系数'),
                td('#'),
                td({ className: 'text-right' }, textNode(rib.windElevCoeff)),
                td()
            ),

            tr(
                td('设计温度'),
                td('℃'),
                td({ className: 'text-right' }, numberbox({ number: rib.temperature })),
                td()
            ),

            tr(td('板肋材质'), td(), td(), td()),

            ...steelRows(rib.ribMaterial, ['Q235', 'Q345']),

            tr(td('内撑杆材质'), td(), td(), td()),

            ...steelRows(rib.pipeMaterial, ['Q235', 'Q345', '10', '20']),

            tr(
                td('保温重量'),
                td('kPa'),
                td({ className: 'text-right' }, textNode(rib.insulationWeight)),
                td()
            ),

            tr(
                td('正压'),
                td('kPa'),
                td({ className: 'text-right' }, numberbox({ number: rib.barotropy })),
                td()
            ),

            tr(
                td('负压'),
                td('kPa'),
                td({ className: 'text-right' }, numberbox({ number: rib.vaccum })),
                td()
            ),

            tr(
                td('灰荷载'),
                td('kPa/m'),
                td({ className: 'text-right' }, numberbox({ number: rib.ash })),
                td()
            ),

            tr(
                td('加固肋间距'),
                td('mm'),
                td({ className: 'text-right' }, numberbox({ number: rib.span })),
                td()
            )
        )
    )
