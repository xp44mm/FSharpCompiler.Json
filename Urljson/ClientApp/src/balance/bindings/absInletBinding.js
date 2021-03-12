import { combineLatest, merge } from 'rxjs'
import { map } from 'rxjs/operators'
import { pickObject } from '../../pickObject'
import { gasBinding } from './gasBinding'

export function absInletBinding(balance) {
    let {
        atmosphere: { pressure: p0 },
        terminal,
        hasGGH,
        ggh,
        absorber,
    } = balance

    gasBinding(p0, absorber.inlet)

    let keys = ["H2O", "O2", "N2", "CO2", "SO2", "SO3", "HCl", "HF", "ash", "temperature"]

    let source =
        Object.entries(pickObject(terminal, keys))
            .map(([prop, bs]) =>
                combineLatest(bs, hasGGH)
                |> map(([value, hasggh]) => [
                    (hasggh ? ggh : absorber).inlet[prop],
                    value,
                ])
            )

    merge(...source).subscribe(([bs, value]) => { bs.next(value) })
}
