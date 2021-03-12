import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { airVolAjax, gypsumBleedAjax, ionBalanceAjax, makeupAjax, phofChlorideBleedAjax, reactAjax, remainGasVolumeAjax, remainLiquidVolumeAjax, removalAjax, toprepAjax, towerAjax, wetAirAjax } from '../ajax'
import { BalanceViewModel } from '../model'
import { absorberBinding } from './absorberBinding'
import { combustionBinding } from './combustionBinding'
import { gasParametersBinding } from './gasParametersBinding'
import { gghBinding } from './gghBinding'
import { limestoneBinding } from './limestoneBinding'
import { oxiairBinding } from './oxiairBinding'
import { performanceBinding } from './performanceBinding'
import { terminalBinding } from './terminalBinding'

export const balanceBinding = (balance = new BalanceViewModel()) => {

    wetAirAjax(balance.atmosphere)
    airVolAjax(balance.atmosphere)

    gasParametersBinding(balance)
    combustionBinding(balance)
    limestoneBinding(balance.limestone)

    //gasParameters 合并 terminal 为 gasInlet ?
    terminalBinding(balance)
    oxiairBinding(balance)

    //s/o,kg/kg
    combineLatest(balance.terminal.SO2, balance.oxiair.feed.O2)
        |> map(([SO2, O2]) => SO2 / O2)
        |> (o => o.subscribe(balance.ratioSO))

    gghBinding(balance)
    removalAjax(balance)
    reactAjax(balance)
    absorberBinding(balance)
    balance.absorber.area
        |> map(a => 270 * a)
        |> (o => o.subscribe(balance.mistElim))

    //系统入口压力
    combineLatest(balance.hasGGH, balance.ggh.inlet.pressureg, balance.absorber.inlet.pressureg)
        |> map(([hasggh, gi, ai]) => hasggh ? gi : ai)
        |> (o => o.subscribe(balance.inletGasPressureg))

    phofChlorideBleedAjax(balance)
    ionBalanceAjax(balance)
    gypsumBleedAjax(balance)
    makeupAjax(balance)
    towerAjax(balance)
    toprepAjax(balance)
    remainGasVolumeAjax(balance)
    remainLiquidVolumeAjax(balance)

    performanceBinding(balance)
}
