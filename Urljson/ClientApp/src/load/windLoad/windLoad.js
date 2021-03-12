import { pickout, restore } from '../../deep'
import { button, div, h3, option, table, tbody, td, textNode, th, thead, tr } from '../../hyperscript'
import { numberbox, select } from '../../hyperscript/form'
import { WindLoadViewModel } from './WindLoadViewModel'
import initialData from './initialData.json'

export const roughnesses = {
    A: '近海海面和海岛、海岸、湖岸及沙漠地区',
    B: '田野、乡村、丛林、丘陵以及房屋比较稀疏的乡镇和城市郊区',
    C: '有密集建筑群的城市市区',
    D: '有密集建筑群且房屋较高的城市市区',
}

export const windLoad = (model = new WindLoadViewModel()) =>
    div(
        h3('风荷载'),

        div(
            table(
                thead(tr(
                    th({ 'style.width': '10em' }, '名称'),
                    th({ 'style.width': '5em' }, '单位'),
                    th('数值'),
                    th('备注')
                )),
                tbody([
                    tr(
                        td('地面粗糙度等级'),
                        td('#'),
                        td(
                            select(
                                { value: model.kind },
                                Object.entries(roughnesses).map(
                                    ([value, text]) => option({ value, text })
                                )
                            )
                        ),
                        td(textNode(model.kind))
                    ),

                    tr(
                        td('标高'),
                        td('m'),
                        td({ className: 'text-right', }, numberbox({ number: model.elevation })),
                        td()
                    ),

                    tr(
                        td('高度变化系数'),
                        td('#'),
                        td({ className: 'text-right', }, textNode(model.coefficient)),
                        td()
                    ),
                ])
            ),
            button('重置').subscribeEvent('click', _ => {
                restore(model, initialData)
            }),
            button('保存').subscribeEvent('click', _ => {
                let data = pickout(model)
                console.log(data)
            })
        )
    )
