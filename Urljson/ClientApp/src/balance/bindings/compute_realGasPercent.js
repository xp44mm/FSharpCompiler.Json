import { map } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { pickObject } from '../../pickObject'
import { gasscale } from './molar'

export function compute_realGasPercent({
    realGas,
    realGasPercent,
    realGasDryPercent,
}) {
    let gascomponents = [
        'H2O',
        'O2',
        'N2',
        'CO2',
        'SO2',
    ]

    let input = pickObject(realGas, [
        //'H2O',
        //'O2',
        //'N2',
        //'CO2',
        //'SO2',
        ...gascomponents,
        'dry',
        'total',
    ])
    let result = {
        percent: {
            H2O: realGasPercent.H2O,
            O2: realGasPercent.O2,
            N2: realGasPercent.N2,
            CO2: realGasPercent.CO2,
            SO2: realGasPercent.SO2,
        },
        drypercent: {
            H2O: realGasDryPercent.H2O,
            O2: realGasDryPercent.O2,
            N2: realGasDryPercent.N2,
            CO2: realGasDryPercent.CO2,
            SO2: realGasDryPercent.SO2,
        },
    }


    //let reviseMe = revise()
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    deepCombineLatest(inputDeep)
        |> map(deep => deep.toObject())
        //marshal(input)
        //    |> map(erect)
        |> map(realGas => {
            let wet = 100 / realGas.total
            let dry = 100 / realGas.dry

            let gas = pickObject(realGas, ['H2O', 'O2', 'N2', 'CO2', 'SO2'])

            let percent = gasscale(gas, wet)
            let drypercent = gasscale(gas, dry)
            drypercent.H2O = 0

            return { percent, drypercent }
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
