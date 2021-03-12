import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export function gasParametersBinding(balance) {
    let {
        atmosphere: { pressure: p0 },
        gasParameters: gp,
    } = balance

    // 相对压力->绝对压力
    combineLatest(p0, gp.pressureg)
        |> map(([p0, pg]) => Number(p0) + Number(pg))
        |> (o => o.subscribe(gp.pressure))

    gp.pressure
        |> map(p => 101325 / p)
        |> (o => o.subscribe(gp.pcorrect))

    gp.temperature
        |> map(t => (Number(t) + 273.15) / 273.15)
        |> (o => o.subscribe(gp.tcorrect))

    combineLatest(gp.pcorrect, gp.tcorrect)
        |> map(([p, t]) => p * t)
        |> (o => o.subscribe(gp.vcorrect))
}
