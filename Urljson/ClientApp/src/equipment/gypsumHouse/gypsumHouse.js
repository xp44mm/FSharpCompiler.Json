import { pickout, restore } from '../../deep'
import {
    button,
    div,
    h3,
    table,
    tbody,
    td,
    textNode,
    th,
    thead,
    tr
} from '../../hyperscript'
import { numberbox } from '../../hyperscript/form'
import { GypsumHouseViewModel } from './GypsumHouseViewModel'
import initialData from './initialData.json'


export const gypsumHouse = (model = new GypsumHouseViewModel()) =>
    div(
        h3('石膏库大小'),
        div(
            table(
                thead(tr(
                    th({ 'style.width': '10em' }, '名称'),
                    th({ 'style.width': '5em' }, '单位'),
                    th('数值'),
                    th('备注')
                )),
                tbody(
                    tr(
                        td('石膏质量'),
                        td('ton'),
                        td({ className: 'text-right' }, numberbox({ number: model.gypsumWeight })),
                        td()
                    ),

                    tr(
                        td('石膏堆积密度'),
                        td('ton/m3'),
                        td({ className: 'text-right' }, numberbox({ number: model.density })),
                        td()
                    ),

                    tr(
                        td('石膏体积'),
                        td('m3'),
                        td({ className: 'text-right' }, textNode(model.volume)),
                        td()
                    ),

                    tr(
                        td('石膏库宽度'),
                        td('m'),
                        td({ className: 'text-right' }, numberbox({ number: model.houseWidth })),
                        td()
                    ),

                    tr(
                        td('皮带机数'),
                        td('台'),
                        td({ className: 'text-right' }, numberbox({ number: model.beltQuantity })),
                        td()
                    ),

                    tr(
                        td('石膏库当量堆高'),
                        td('m'),
                        td({ className: 'text-right' }, textNode(model.heapHeight)),
                        td()
                    ),

                    tr(
                        td('石膏库长度'),
                        td('m'),
                        td({ className: 'text-right' }, textNode(model.houseLength)),
                        td()
                    )
                )
            ), button({}, '重置').subscribeEvent('click', _ => {
                restore(model, initialData)
            })
            ,
            button('保存').subscribeEvent('click', _ => {
                let data = pickout(model)
                console.log(data)
            })

        )
    )
