import { combineLatest } from 'rxjs'
import { filter, map, mapTo } from 'rxjs/operators'
import { absorberOutletAjax, absorberWithUndersprayAjax, gghOutletAjax } from '../ajax'
import { absInletBinding } from './absInletBinding'
import { gasBinding } from './gasBinding'


export const absorberBinding = balance => {
    let {
        atmosphere: { pressure: p0 },
        gasParameters,
        terminal,
        effect,
        oxiair,
        hasGGH,
        ggh,
        removal,
        absorber,
    } = balance

    let { nozzleNumber, nozzleFlow, pumpFlow_write } = absorber

    gasBinding(p0, absorber.outlet)

    absInletBinding(balance)

    absorberOutletAjax(balance)

    gghOutletAjax(balance)

    absorberWithUndersprayAjax(balance)

    absorber.diameter
        |> map(d => Math.PI / 4 * d ** 2)
        |> (o => o.subscribe(absorber.area))

    combineLatest(absorber.outlet.volume, absorber.diameter)
        |> map(([v, d]) => v / 3600 / (Math.PI / 4 * d ** 2))
        |> (o => o.subscribe(absorber.velocity))

    combineLatest(absorber.nozzleNumber, absorber.diameter)
        |> map(([n, d]) => n / (Math.PI / 4 * d ** 2))
        |> (o => o.subscribe(absorber.nozzleDensity))

    combineLatest(absorber.nozzleNumber, absorber.nozzleFlow)
        |> map(([n, f]) => n * f)
        |> (o => o.subscribe(absorber.pumpFlow))

    //没有托盘就没有下喷淋
    absorber.towerType
        |> filter(t => t === 'Open Spray Tower')
        |> mapTo(false)
        |> (o => o.subscribe(absorber.hasUndertrayHeader))

    //有下喷淋一定有托盘
    absorber.hasUndertrayHeader
        |> filter(has => has)
        |> mapTo('Tray Tower')
        |> (o => o.subscribe(absorber.towerType))

    combineLatest(absorber.hasUndertrayHeader, absorber.pumpFlow)
        |> map(([undertray, x]) => (undertray ? x : 0))
        |> (o => o.subscribe(absorber.undertrayPumpFlow))

    //可能是多余的?
    combineLatest(absorber.sprays)
        |> map(
            sprays =>
                sprays.some(spray => /^IS /.test(spray))
                    ? 'Interspacial'
                    : 'Standard'
        )
        |> (o => o.subscribe(absorber.headerType))

    //Tray
    combineLatest(absorber.velocity, absorber.tray.openArea)
        |> map(([v, o]) => v / o * 100)
        |> (o => o.subscribe(absorber.tray.velocity))

    //吸收塔压力降
    combineLatest(
        absorber.mistDp,
        absorber.outletDp,
        absorber.spraysDp,
        absorber.tray.pressureDrop,
        absorber.inlet.pressureDrop
    )
        |> map(ps => ps.map(x => Number(x)).reduce((x, y) => x + y, 0))
        |> (o => o.subscribe(absorber.pressureDrop))

    //吸收塔入口表压力
    combineLatest(absorber.outlet.pressureg, absorber.pressureDrop)
        |> map(([pg, dp]) => Number(pg) + Number(dp))
        |> (o => o.subscribe(absorber.inlet.pressureg))


}
