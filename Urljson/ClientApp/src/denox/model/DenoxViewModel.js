import { BehaviorSubject, combineLatest, NEVER } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { AmmoniaSlipViewModel } from './AmmoniaSlipViewModel'
import { GasViewModel } from './GasViewModel'
import { NH3ViewModel } from './NH3ViewModel'

export class DenoxViewModel {
    constructor() {
        this.gas = new GasViewModel()
        this.inletNOx = new BehaviorSubject(0)

        this.bsncr = new BehaviorSubject(true)
        this.sncr = new NH3ViewModel()

        this.bscr = new BehaviorSubject(true)
        this.scr = new NH3ViewModel()

        this.ammoniaSlip = new AmmoniaSlipViewModel()

        //sncr/scr至少有一个
        this.bsncr
            |> filter(b => !b)
            |> (o=>o.subscribe(_ => {
                if (!this.bscr.value) this.bscr.next(true)
            }))

        //sncr/scr至少有一个
        this.bscr
            |> filter(b => !b)
            |> (o=>o.subscribe(_ => {
                if (!this.bsncr.value) this.bsncr.next(true)
            }))

        this.bsncr
            |> map(b => (b ? 'sncr' : 'scr'))
            |> (nm => combineLatest(nm, this.inletNOx))
            |> (o=>o.subscribe(([nm, nox]) => this[nm].inletNOx.next(nox)))

        this.bsncr
            |> mergeMap(b => (b ? this.gas.stdVolume : NEVER))
            |> (o=>o.subscribe(this.sncr.volume))

        this.bscr
            |> mergeMap(b => (b ? this.gas.stdVolume : NEVER))
            |> (o=>o.subscribe(this.scr.volume))

        this.bsncr
            |> mergeMap(b => (b ? this.sncr.outletNOx : NEVER))
            |> (o=>o.subscribe(this.scr.inletNOx))

        this.gas.dryVolume.subscribe(this.ammoniaSlip.volume)
    }

    pickeys() {
        let bs = Object.keys(this).filter(
            k => this[k] instanceof BehaviorSubject
        )
        let sncr = this.bsncr.value ? ['sncr'] : []
        let scr = this.bscr.value ? ['scr'] : []
        return [...bs, 'gas', 'ammoniaSlip', ...sncr, ...scr]
    }
}
