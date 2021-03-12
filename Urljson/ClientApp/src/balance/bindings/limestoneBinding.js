import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export const limestoneBinding = limestone => {
    let { CaCO3, MgCO3, inerts } = limestone

    combineLatest(CaCO3, MgCO3)
        |> map(([c, m]) => 100 - c - m)
        |> (o => o.subscribe(inerts))
}
