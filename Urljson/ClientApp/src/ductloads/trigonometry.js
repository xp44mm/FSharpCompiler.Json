//三角函数

function radians(degree) {
    return degree / 180. * Math.PI
}

//避免特殊点的精度损失
export function sin(degree) {
    switch (degree) {
        case 0:
            return 0
        case 90:
            return 1
        case 180:
        case -180:
            return 0
        case -90:
        case 270:
            return -1
        default:
            return Math.sin(radians(degree))
    }
}

//避免特殊点的精度损失
export function cos(degree) {
    switch (degree) {
        case 0:
            return 1
        case 90:
            return 0
        case 180:
        case -180:
            return -1
        case -90:
        case 270:
            return 0
        default:
            return Math.cos(radians(degree))
    }
}

export function tan(degree) {
    switch (degree) {
        case 0:
            return 0
        case 45:
            return 1
        case -45:
            return -1
        default:
            return Math.tan(radians(degree))
    }
}
