
//16进制
function hex(oct) {
    let h = Number(oct).toString(16).toUpperCase()
    return oct < 16 ? '0' + h : h
}

//10进制
function oct(hex) {
    return parseInt(hex, 16)
}

//RGB颜色转换为16进制
export function colorHex(r, g, b) {
    return `#${hex(r)}${hex(g)}${hex(b)}`
}

function singleToDouble(hex) {
    return hex => hex.repeat(2)
}

//16进制颜色转为RGB格式
export function colorRgb(hex) {
    let rgb = (function() {
        if (hex.length === 3) {
            return [...hex].map(c => c.repeat(2))
        } else if (hex.length === 6) {
            return [0, 2, 4].map(i => hex.slice(i, i + 2))
        }
    })()

    return rgb.map(hex => parseInt(hex, 16))
}

export function distance([r1, g1, b1], [r2, g2, b2]) {
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}
