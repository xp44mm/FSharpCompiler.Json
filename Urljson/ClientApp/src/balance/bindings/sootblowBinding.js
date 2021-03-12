import { sootblowAjax } from "../ajax";
import { BalanceViewModel } from '../model';
import { gasBinding } from "./gasBinding";

export function sootblowBinding(balance = new BalanceViewModel()) {
    let {
        atmosphere: { pressure: p0, temperature: t0 },
        hasGGH,
        ggh: { sootblow },
    } = balance

    t0.subscribe(sootblow.temperature)
    gasBinding(p0, sootblow)
    sootblowAjax(balance)
}
