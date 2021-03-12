export function suggestDiameter(absorber) {
    let { outlet: { volume }, diameter } = absorber

    let a = volume.value / 3600 / 3.5
    let d = Math.sqrt(4 * a / Math.PI)
    diameter.next(Math.ceil(d * 10) / 10)
}
