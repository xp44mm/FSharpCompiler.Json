import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { rtuAcidAjax } from '../ajax/rtuAcidAjax'
import { rtuBaseAjax } from '../ajax/rtuBaseAjax'
import { rtuClAjax } from '../ajax/rtuClAjax'
import { rtuDpAjax } from '../ajax/rtuDpAjax'
import { rtuGrindAjax } from '../ajax/rtuGrindAjax'
import { rtuLgAjax } from '../ajax/rtuLgAjax'
import { rtuMarginAjax } from '../ajax/rtuMarginAjax'
import { rtuNozzleAjax } from '../ajax/rtuNozzleAjax'
import { rtuPHAjax } from '../ajax/rtuPHAjax'
import { rtuQuenchAjax } from '../ajax/rtuQuenchAjax'
import { rtuSO2Ajax } from '../ajax/rtuSO2Ajax'
import { rtuSolidsAjax } from '../ajax/rtuSolidsAjax'
import { rtuSrAjax } from '../ajax/rtuSrAjax'
import { rtuVelocityAjax } from '../ajax/rtuVelocityAjax'
import { BalanceViewModel } from '../model'

export const performanceBinding = (balance = new BalanceViewModel()) => {
    let { performance } = balance
    let { rtu, ntu, efficiency } = performance

    combineLatest(Object.values(rtu))
        |> map(arr => arr.reduce((p, c) => p * c, 1))
        |> (o => o.subscribe(ntu))

    ntu
        |> map(ntu => (1 - Math.exp(-ntu)) * 100)
        |> (o => o.subscribe(efficiency))

    rtuAcidAjax(balance)
    rtuBaseAjax(balance)
    rtuClAjax(balance)
    rtuDpAjax(balance)
    rtuGrindAjax(balance)
    rtuLgAjax(balance)
    rtuMarginAjax(balance)
    rtuNozzleAjax(balance)
    rtuPHAjax(balance)
    rtuQuenchAjax(balance)
    rtuSO2Ajax(balance)
    rtuSolidsAjax(balance)
    rtuSrAjax(balance)
    rtuVelocityAjax(balance)
}
