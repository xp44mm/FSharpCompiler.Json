
export const molar = {
    H2O: 18.01528,
    O2: 31.9988,
    N2: 28.0134,
    CO2: 44.0095,
    SO2: 64.0638,
    SO3: 80.0632,
    HCl: 36.46094,
    HF: 20.0063432,
}

/**
 * 烟气混合，各成分对应相加
 * @param {any} a
 * @param {any} b
 */
export function gasadd(a, b) {
    let res = {
        H2O: 0,
        O2: 0,
        N2: 0,
        CO2: 0,
        SO2: 0,
        SO3: 0,
        HCl: 0,
        HF: 0,
        ash: 0,
    }

    return Object.fromEntries(
        Object.entries(res).map(([key, value]) =>
            [key, (a[key] || 0) + (b[key] || 0)]
        )
    )
}

export function gasscale(gas, ratio) {
    let res = Object.assign({}, gas)
    for (let prop in res) {
        res[prop] = res[prop] * ratio
    }
    return res
}

export function getair(air, o2) {
    let ratio = o2 / air.O2
    return {
        H2O: ratio * air.H2O,
        O2: ratio * air.O2,
        N2: ratio * air.N2,
    }
}
