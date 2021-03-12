import { combineLatest } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { pickObject } from '../../pickObject'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

// rename from bindingTower
export function towerAjax(balance = new BalanceViewModel()) {
    let {
        absorber,
        tower,
        gypsumBleed,
        productA,
        limestone,
        oxiair,
        removal,
    } = balance

    let { satur: saturOxiair } = oxiair

    let allow = ready.makeup && ready.gas_oxiairSatur

    allow |> filter(s => !s) |> (o => o.subscribe(b => ready.tower.next(false)))

    let input = {
        size: {
            diameter: absorber.diameter,
            high: tower.high,
            injectElevation: tower.injectElevation,
            flare:
                combineLatest(tower.isFlare, tower.flare)
                |> map(([isflare, x]) => (isflare ? x : -1)),
            flareHeight: tower.flareHeight,
        },
        slurry: {
            temperature: absorber.outlet.temperature,
            tds: gypsumBleed.tds,
            fw: gypsumBleed.fw,
            solids: tower.solids,
            density: gypsumBleed.density,
            totalPumpFlow: absorber.totalPumpFlow,
            productAtss: productA.tss,
            stoich: limestone.stoich,
            velocity: absorber.velocity,
        },
        absInlet: {
            pressure: absorber.inlet.pressure,
            SO2: absorber.inlet.SO2,
            O2: absorber.inlet.O2,
        },
        airVolume: saturOxiair.nvolume,
        reactO2: removal.O2,
    }

    let result = pickObject(tower, [
        'dll',
        'slurryVolume',
        'solidsMass',
        'minO2',
        'injectPressure',
        'retentionTime',
        'residenceTime',
        'pH',
    ])
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => ready.tower.next(false))
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(data => 'desulphur/tower?' + jzonQueryData(data))
        |> mergeMap(url => httpGetJson(url))
        |> map(data => Deep.fromObject(data))
        |> map(deep => deep.intersect(resultDeep.keys))
        |> map(deep => {
            if (deep.structureEqual(resultDeep.keys)) {
                return deep.zip(resultDeep.values)
            } else {
                console.error(deep.keys)
            }
        })
        |> map(deep => deep.values)
        |> tap(zipValues => {
            zipValues.forEach(([value, subject]) => {
                subject.next(value)
            })
        })
        |> (o => o.subscribe(() => { ready.tower.next(true) }))

}
