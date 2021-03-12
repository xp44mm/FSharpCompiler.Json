import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { combusGasBinding } from './combusGasBinding'

export function combusGasWithO2Binding({ baseO2, combusGas }) {
    combusGasBinding(combusGas)

    combineLatest(baseO2, combusGas.O2, combusGas.dry)
        |> map(([base, o2, dry]) => (21 - base) / (21 - o2 / dry * 100))
        |> (o => o.subscribe(combusGas.baseFactor))

    combineLatest(combusGas.ppmSO2, combusGas.baseFactor)
        |> map(([i, fac]) => i * fac)
        |> (o => o.subscribe(combusGas.base_ppmSO2))

    combineLatest(combusGas.concentrationSO2, combusGas.baseFactor)
        |> map(([i, fac]) => i * fac)
        |> (o => o.subscribe(combusGas.base_concentrationSO2))
}
