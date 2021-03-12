import { map, withLatestFrom } from 'rxjs/operators'
import { oxiairAjax } from '../ajax'
import { gasBinding } from './gasBinding'

export const oxiairBinding = balance => {
    let {
        atmosphere: { pressure: p0, temperature: t0 },
        oxiair,
    } = balance

    gasBinding(p0, oxiair.feed)
    gasBinding(p0, oxiair.compress)
    gasBinding(p0, oxiair.satur)

    t0.subscribe(oxiair.feed.temperature)

    oxiair.feed.H2O.subscribe(oxiair.compress.H2O)
    oxiair.feed.O2.subscribe(oxiair.compress.O2)
    oxiair.feed.N2.subscribe(oxiair.compress.N2)

    oxiair.feed.O2.subscribe(oxiair.satur.O2)
    oxiair.feed.N2.subscribe(oxiair.satur.N2)

    oxiair.compress.pressureg.subscribe(oxiair.satur.pressureg)

    oxiairAjax(balance)

}
