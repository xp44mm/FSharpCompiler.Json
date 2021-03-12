export function setTerminalAnalysis(balance
) {
    let {
        combustion: { fluegas },
        terminal
    } = balance

    terminal.H2O.next(fluegas.H2O.value)
    terminal.O2.next(fluegas.O2.value)
    terminal.N2.next(fluegas.N2.value)
    terminal.CO2.next(fluegas.CO2.value)
    terminal.SO2.next(fluegas.SO2.value)
    terminal.SO3.next(fluegas.SO3.value)
    terminal.HCl.next(fluegas.HCl.value)
    terminal.HF.next(fluegas.HF.value)
    terminal.ash.next(fluegas.ash.value)
}
