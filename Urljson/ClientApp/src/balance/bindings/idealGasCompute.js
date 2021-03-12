import { map } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { pickObject } from '../../pickObject'
import { gasadd, getair } from './molar'

export function idealGasCompute(balance) {
    let {
        atmosphere: { airVol },
        combustion: { product, idealAir, idealGas },
    } = balance

    let input = {
        air: pickObject(airVol, ['H2O', 'O2', 'N2']),
        gas: pickObject(product, ['H2O', 'O2', 'N2', 'CO2', 'SO2']),
    }
    //let reviseMe = revise()
    let result = {
        newair: pickObject(idealAir, ['H2O', 'O2', 'N2']),
        newgas: {
            H2O: idealGas.H2O,
            O2: idealGas.O2,
            N2: idealGas.N2,
            CO2: idealGas.CO2,
            SO2: idealGas.SO2,
        },
    }

    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    deepCombineLatest(inputDeep)
        |> map(deep => deep.toObject())
        |> map(data => {
            let o2 = -data.gas.O2

            let newair = getair(data.air, o2)
            let newgas = pickObject(
                gasadd(newair, data.gas),
                Object.keys(result.newgas))

            return { newair, newgas }
        })
        |> map(result => {
            let deep = Deep.fromObject(result)
            //if (deep.structureEqual(resultDeep.keys)) {
            return deep.zip(resultDeep.values).values
            //} else {
            //    console.error(deep.keys)
            //}
        })
        //|> (o =>
        //    o.subscribe(data => {
        //        reviseMe(data)
        //    }))
        |> (o =>
            o.subscribe(zipValues => {
                zipValues.forEach(([value, subject]) => {
                    subject.next(value)
                })
            }))

}
