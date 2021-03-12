import { combineLatest } from 'rxjs'
import { filter, map, mapTo } from 'rxjs/operators'

export function terminalBinding(balance) {
    let {
        gasParameters,
        terminal,
        hasGGH,
        ggh,
        absorber,
    } = balance

    //
    gasParameters.temperature.subscribe(terminal.temperature)

    //无GGH时,出口压力是吸收塔出口压力
    combineLatest(hasGGH, terminal.pressureg)
        |> filter(([ggh, pg]) => !ggh)
        |> map(([ggh, pg]) => pg)
        |> (o => o.subscribe(absorber.outlet.pressureg))

    //有GGH时，出口压力是ggh出口压力
    combineLatest(hasGGH, terminal.pressureg)
        |> filter(([ggh, pg]) => ggh)
        |> map(([ggh, pg]) => pg)
        |> (o => o.subscribe(ggh.outlet.pressureg))

}
