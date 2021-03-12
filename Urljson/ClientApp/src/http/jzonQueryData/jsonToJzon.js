//let isidentifier = real => /^[^\s()*!~][^\s()*!]*$/.test(real)

function needQuote(real) {
    return /^~/.test(real) || /[\s()*!]/.test(real)
}

//波浪线代替引号，单引号仍然被转义。
let toTilde = s =>
    [
        '~',
        s
            .slice(1, -1)
            .replace(/\\"/g, '"')
            .replace(/~/g, '~~'),
        '~',
    ].join('')

//let tildes = /(~[^~]*(?:(?:~~)[^~]*)*~(?!~))/

export const jsonToJzon = json =>
    json
        .split(/("[^"]*(?:(?:\\")[^"]*)*(?<!\\)")/) //正则表达式匹配字符串字面量
        .map(s => s.trim())
        .filter(s => !!s)
        .map((s, i, a) => {
            if (s.startsWith('"')) {
                //字符串字面量
                if (i < a.length - 1 && a[i + 1][0] === ':') {
                    //Key:冒号之前
                    let real = JSON.parse(s)
                    return needQuote(real) ? toTilde(s) : real
                } else {
                    //String literal
                    return toTilde(s)
                }
            } else {
                //非字符串
                return s
                    .replace(/\{\s*\}/g, '(*)') //空对象
                    .replace(/[{[]/g, '(') //开括号
                    .replace(/[}\]]/g, ')') //闭括号
                    .replace(/:/g, '*') //冒号
                    .replace(/,/g, '!') //逗号
            }
        })
        .join('')
