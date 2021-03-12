import { combineLatest, NEVER } from 'rxjs'
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Deep, deepCombineLatest } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { BalanceViewModel } from '../model'
import { ready } from './ready'

export function absorberWithUndersprayAjax(balance = new BalanceViewModel()) {
    let {
        hasGGH,
        absorber: {
            outlet,
            diameter,
            pumpFlow,
            sprays,
            towerType,
            tray,
            undertrayPumpFlow,
            inlet,
            operatingHeaders,
            totalPumpFlow,
            flux,
            lg,
            stdLg,
            spraysDp,
            spraysStdDp,
            undersprayPressureDrop,
            stdDp,
        },
    } = balance

    let allow =
        combineLatest(hasGGH, ready.gghOutlet, ready.absorberOutlet)
        |> map(([ggh, gout, aout]) => ggh ? gout : aout)

    allow
        |> filter(s => !s)
        |> (o => o.subscribe(() => ready.absorberWithUnderspray.next(false)))

    let input = {
        flow: outlet.volume,
        diameter,
        pumpFlow,
        sprays,
        openArea:
            combineLatest(towerType, tray.openArea)
            |> map(([tt, op]) => tt === 'Tray Tower' ? op : 0),
        undersprayFlow: undertrayPumpFlow,
        inletVelocity: inlet.velocity,
        saturTemperature: outlet.temperature,
        inletTemperature: inlet.temperature,
    }

    let result = {
        operatingHeaders,
        totalFlow: totalPumpFlow,
        flux,
        lg,
        stdLg,
        spraysDp,
        spraysStdDp,
        trayMaxVel: tray.maxVel,
        trayPressureDrop: tray.pressureDrop,
        trayStdPressureDrop: tray.stdPressureDrop,
        trayNg: tray.ng,
        undersprayPressureDrop,
        inletPressureDrop: inlet.pressureDrop,
        stdDp,
    }
    let inputDeep = Deep.fromObject(input)
    let resultDeep = Deep.fromObject(result)

    combineLatest(deepCombineLatest(inputDeep), allow)
        |> filter(([_, t]) => t)
        |> tap(() => ready.absorberWithUnderspray.next(false))
        |> debounceTime(9)
        |> map(([deep]) => deep.toObject())
        |> map(
            data => 'desulphur/absorberWithUnderspray?' + jzonQueryData(data)
        )
        |> mergeMap(url => httpGetJson(url))
        |> map(data => Deep.fromObject(data))
        |> map(deep => deep.intersect(resultDeep.keys))
        |> map(deep => {
            if (deep.structureEqual(resultDeep.keys)) {
                return deep.zip(resultDeep.values)
            } else {
                console.error(deep.keys)
                //return NEVER
            }
        })
        |> map(deep => deep.values)
        |> tap(zipValues => {
            zipValues.forEach(([value, subject]) => {
                subject.next(value)
            })
        })
        |> (o => o.subscribe(() => { ready.absorberWithUnderspray.next(true) }))
}
