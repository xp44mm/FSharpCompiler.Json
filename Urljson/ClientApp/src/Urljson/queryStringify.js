import { urljsonStringify } from './urljsonStringify'

/// 它会序列化传入的 obj 中以下类型的值：<string> | <number> | <boolean> 。 任何其他的输入值都将会被强制转换为空字符串。
export function fieldStringify(obj) {
    let s =
        obj === undefined || obj === null || Number.isNaN(obj) ? "" : typeof obj === 'string' ? obj : urljsonStringify(obj)
    return encodeURIComponent(s)
}

///第一层为名值对，其后序列化为压缩格式。
export function queryStringify(data) {
    //名值对的先决条件是普通对象
    if (!data || Array.isArray(data) || typeof data !== 'object') {
        throw new Error("query's input should be a plain object.")
    }
    let pairs = Object.entries(data)

    if (pairs.length === 0) {
        throw new Error("query's input should not be a empty object.")
    }

    return pairs
        .map(([k, v]) =>
            encodeURIComponent(k) + '=' + fieldStringify(v)
        )
        .join('&')
}

