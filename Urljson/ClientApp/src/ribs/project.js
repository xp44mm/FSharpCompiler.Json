import { option, table, tbody, td, th, thead, tr } from '../hyperscript'
import { numberbox, select } from '../hyperscript/form'
import { roughnesses } from '../load/windLoad/windLoad'
import { ProjectViewModel } from './model'

///
export const project = (model = new ProjectViewModel()) =>
    table(
        thead(tr(
            th({ 'style.width': '10em' }, '名称'),
            th({ 'style.width': '4em' }, '单位'),
            th('数值'),
            th({ 'style.width': '4em' }, '备注')
        )),
        tbody(
            tr(
                td('基本雪压'),
                td('kPa'),
                td({ className: 'text-right' }, numberbox({ number: model.snow })),
                td()
            ),

            tr(
                td('基本风压'),
                td('kPa'),
                td({ className: 'text-right' }, numberbox({ number: model.w0 })),
                td()
            ),

            tr(
                td('地面粗糙度等级'),
                td(),
                td(
                    select(
                        { value: model.topography, 'style.width': '100%' },

                        Object.entries(roughnesses).map(([value, text]) =>
                            option({ value, text })
                        )
                    )
                ),
                td()
            )
        )
    )
