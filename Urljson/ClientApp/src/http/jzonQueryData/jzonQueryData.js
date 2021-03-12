import { jsonToJzon } from './jsonToJzon'
import { isEmptyData } from './isEmptyData'

const isPlainObject = data =>
    data && typeof data === 'object' && !(data instanceof Array)

///序列化字段值，需要先过滤。
function jzonField(value) {
    if (typeof value === 'object') {
        return jsonToJzon(JSON.stringify(value)).slice(1, -1) //删除的是jzon首尾括号。
    } else if (typeof value === 'string') {
        return value
    } else {
        return JSON.stringify(value)
    }
}

///第一层为名值对，其后序列化为压缩格式。
export function jzonQueryData(data) {
    //名值对的先决条件是普通对象
    if (!isPlainObject(data)) {
        return ''
    }

    //空值不会出现在查询字符串中。仅第一层省略空值，jzon内部的空值不会被省略。
    let entries = Object.entries(data).filter(([k, v]) => !isEmptyData(v))

    //如果名值对的数量为零则无需。
    if (entries.length === 0) {
        return ''
    }

    return entries
        .map(([k, v]) =>
            [k, jzonField(v)].map(e => encodeURIComponent(e)).join('=')
        )
        .join('&')
}
