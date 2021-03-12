import { pickout } from '../deep'
import { button, div, h3, span } from '../hyperscript'
import { DenoxViewModel } from './model'
import { inputs } from './inputs/inputs'

export const main = (model = new DenoxViewModel()) => {
    return div(
        h3(
            span({ 'style.margin': '0 16px 0 0' }, '脱硝氨耗量计算'),

            button({ 'style.margin': '0 16px' }, '保存').subscribeEvent('click', _ => {
                let data = pickout(model)
                console.log(data)
            }),

        ),
        inputs(model),
    )

}
