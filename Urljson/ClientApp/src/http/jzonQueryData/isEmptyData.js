/// 空值包括undefined,null,[],{},"",NaN。数字零，布尔假不是空值。
export function isEmptyData(value) {
    return (
        value === undefined ||
        value === null ||
        (value instanceof Array  && !value.length) ||
        (typeof value === 'object' && !Object.keys(value).length) ||
        (typeof value === 'string' && !value) ||
        (typeof value === 'number' && isNaN(value))
    )
}

