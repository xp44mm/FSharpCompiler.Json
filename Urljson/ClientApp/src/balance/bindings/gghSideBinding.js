import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export function gghSideBinding(gghSide /*: GghSideViewModel,*/) {
    combineLatest(gghSide.gghPressureDrop, gghSide.ductPressureDrop)
        |> map(([g, d]) => g + d)
        |> (o => o.subscribe(gghSide.pressureDrop))
}
