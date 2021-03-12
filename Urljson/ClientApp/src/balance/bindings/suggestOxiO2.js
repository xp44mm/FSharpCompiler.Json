export function suggestOxiO2(balance) {
    let {
        oxiair: { feed: { O2 } },
        terminal: { SO2 }
    } = balance

    let nextValue = Math.floor(SO2.value / 1.2)
    O2.next(nextValue)
}
