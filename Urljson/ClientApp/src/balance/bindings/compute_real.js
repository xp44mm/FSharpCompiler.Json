import { map } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { pickObject } from '../../pickObject'
import { gasadd, getair } from './molar'


export function compute_real(balance) {
    let {
        atmosphere: { airVol },
        combustion: { product, exessAir, realAir, realGas },
    } = balance

    let input = {
        exessAir,
        air: pickObject(airVol, ['H2O', 'O2', 'N2']),
        gas: pickObject(product, ['H2O', 'O2', 'N2', 'CO2', 'SO2']),
    }
    let result = {
        newair: pickObject(realAir, ['H2O', 'O2', 'N2']),
        newgas: {
            H2O: realGas.H2O,
            O2: realGas.O2,
            N2: realGas.N2,
            CO2: realGas.CO2,
            SO2: realGas.SO2,
        },
    }
    //let reviseMe = revise()
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    deepCombineLatest(inputDeep)
        |> map(deep => deep.toObject())

        |> map(data => {
            let o2 = -data.gas.O2 * data.exessAir

            let newair = getair(data.air, o2)

            let newgas = pickObject(
                gasadd(newair, data.gas),
                Object.keys(result.newgas))
            return { newair, newgas }
        })
        |> map(result => {
            let deep = Deep.fromObject(result)
            if (deep.structureEqual(resultDeep.keys)) {
                return deep.zip(resultDeep.values).values
            } else {
                console.error(deep.keys)
            }
        })
        |> (o =>
            o.subscribe(zipValues => {
                zipValues.forEach(([value, subject]) => {
                    subject.next(value)
                })
            }))

    //|> (o =>
    //    o.subscribe(data => {
    //        reviseMe(data)
    //    }))
}
