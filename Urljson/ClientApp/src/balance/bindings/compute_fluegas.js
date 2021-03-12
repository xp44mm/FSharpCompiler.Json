import { map } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { pickObject } from '../../pickObject'
import { molar } from './molar'

export function compute_fluegas(balance) {
    let {
        gasParameters: { concentration },
        combustion: { realGas, gasState, fluegas },
    } = balance

    let input = {
        gasState: pickObject(gasState, ['volume0', 'baseVolume']),
        realGas: pickObject(realGas, ['H2O', 'O2', 'N2', 'CO2', 'SO2', 'total']),
        concentration: pickObject(concentration, [
            'SO2',
            'SO3',
            'HCl',
            'HF',
            'ash',
        ]),
    }
    let inputDeep = Deep.fromObject(input)

    deepCombineLatest(inputDeep)
        |> map(deep => deep.toObject())

    //marshal(input)
    //    |> map(erect)
        |> map(({ gasState, realGas, concentration }) => {
            let ratio = gasState.volume0 / realGas.total
            let gas = {
                H2O: molar.H2O * ratio / 22.414 * realGas.H2O,
                O2: molar.O2 * ratio / 22.414 * realGas.O2,
                N2: molar.N2 * ratio / 22.414 * realGas.N2,
                CO2: molar.CO2 * ratio / 22.414 * realGas.CO2,
                SO2: molar.SO2 * ratio / 22.414 * realGas.SO2,
            }

            let harmful = {
                SO3: concentration.SO3 * gasState.baseVolume / 1e6,
                HCl: concentration.HCl * gasState.baseVolume / 1e6,
                HF: concentration.HF * gasState.baseVolume / 1e6,
                ash: concentration.ash * gasState.baseVolume / 1e6,
            }
            return { ...gas, ...harmful }
        })
        |> (o => o.subscribe(data => {
            for (let name of [
                'H2O',
                'O2',
                'N2',
                'CO2',
                'SO2',
                'SO3',
                'HCl',
                'HF',
                'ash',
            ]) {
                fluegas[name].next(data[name])
            }
        }))
}
