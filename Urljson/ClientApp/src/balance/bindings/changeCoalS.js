//反求煤中硫含量
export function changeCoalS(balance) {
    let {
        gasParameters,
        combustion: {
            coal, idealGas } } = balance

    let ratio = gasParameters.concentration.SO2.value / idealGas.base_concentrationSO2.value
    coal.S.next(coal.S.value * ratio)
}
