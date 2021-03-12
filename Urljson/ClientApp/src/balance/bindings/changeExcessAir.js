export function changeExcessAirByO2(combustion) {
    let { target_realO2, realGasPercent: { O2 }, exessAir } = combustion

    let ratio = target_realO2.value / O2.value
    exessAir.next(1 + (exessAir.value - 1) * ratio)
}

export function changeExcessAirByDryO2(combustion) {
    let { target_dryO2, realGasDryPercent: { O2 }, exessAir } = combustion

    let ratio = target_dryO2.value / O2.value
    exessAir.next(1 + (exessAir.value - 1) * ratio)
}
