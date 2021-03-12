import { div, table, tbody, th, thead, tr } from '../hyperscript'

export function keywordColorTable() {
    return table(
        thead(
            tr(
                th({ 'style.width': '25%' }, '颜色'),
                th({ 'style.width': '10%' }, '红'),
                th({ 'style.width': '10%' }, '绿'),
                th({ 'style.width': '10%' }, '蓝'),
                th({ 'style.width': '25%' }, 'RGB16进制'),
                th({ 'style.width': '25%' }, '色卡'),
            )
        ),
        tbody(),
    )

}