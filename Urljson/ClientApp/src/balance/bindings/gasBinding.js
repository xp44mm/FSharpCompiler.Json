import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { GasViewModel } from '../model'

/**
 *
 * @param {BehaviorSubject} p0 atmosphere.pressure
 * @param {GasViewModel} gas
 */
export const gasBinding = (p0, gas) => {
    //相对压力->绝对压力
    combineLatest(p0, gas.pressureg)
        |> map(([p0, pg]) => Number(p0) + Number(pg))
        |> (o => o.subscribe(gas.pressure))
}
