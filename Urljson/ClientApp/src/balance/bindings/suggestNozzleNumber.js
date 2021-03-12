export function suggestNozzleNumber(absorber) {
    let { nozzleFlow, area, nozzleNumber } = absorber

    nozzleFlow.value || nozzleFlow.next(50)

    let num = Math.ceil(area.value / 4) * 4
    nozzleNumber.value === num || nozzleNumber.next(num)
}
