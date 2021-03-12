import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { molar } from './molar'

export function combusGasBinding(combusGas) {
    let { H2O, O2, N2, CO2, SO2 } = combusGas

    combineLatest(O2, N2, CO2, SO2)
        |> map(arr => arr.map(Number).reduce((x, y) => x + y, 0))
        |> (o => o.subscribe(combusGas.dry))

    combineLatest(H2O, combusGas.dry)
        |> map(([w, d]) => w + d)
        |> (o => o.subscribe(combusGas.total))

    combineLatest(SO2, combusGas.dry)
        |> map(([s, d]) => s / d * 1e6)
        |> (o => o.subscribe(combusGas.ppmSO2))

    combusGas.ppmSO2
        |> map(ppm => ppm * molar.SO2 / 22.414)
        |> (o => o.subscribe(combusGas.concentrationSO2))
}
