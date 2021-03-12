import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BalanceViewModel } from '../model';
import { gasBinding } from "./gasBinding";
import { gghSideBinding } from "./gghSideBinding";
import { sootblowBinding } from "./sootblowBinding";

export function gghBinding(balance = new BalanceViewModel()) {
    let {
        atmosphere: { pressure: p0 },
        hasGGH,
        ggh,
        absorber,
    } = balance

    let { dirty, clean, inlet, outlet } = ggh

    gghSideBinding(dirty)
    gghSideBinding(clean)

    sootblowBinding(balance)
    gasBinding(p0, inlet)
    gasBinding(p0, outlet)

    //吸收塔出口压力
    combineLatest(hasGGH, ggh.outlet.pressureg, ggh.clean.pressureDrop)
        |> filter(([ggh]) => ggh)
        |> map(([ggh, go, gd]) => go + gd)
        |> (o => o.subscribe(absorber.outlet.pressureg))

    //GGH入口压力
    combineLatest(hasGGH, absorber.inlet.pressureg, ggh.dirty.pressureDrop)
        |> filter(([ggh]) => ggh)
        |> map(([, p, dp]) => Number(p) + Number(dp))
        |> (o => o.subscribe(ggh.inlet.pressureg))

}
