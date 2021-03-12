import { BalanceViewModel } from '../model';
import { gasVolumeAjax } from "./gasVolumeAjax";

export const remainGasVolumeAjax = (balance = new BalanceViewModel()) => {
    let {
        oxiair: {
            feed: oxiairFeed,
            compress: oxiairCompress,
            satur: oxiairSatur,
        },
        hasGGH,
        ggh: {
            sootblow,
            inlet: gghInlet,
            outlet: gghOutlet,
        },
        absorber: {
            inlet: absInlet,
        },
    } = balance

    const gases = {
        gghInlet,
        sootblow,
        absInlet,
        gghOutlet,
        oxiairFeed,
        oxiairCompress,
        oxiairSatur,
    }

    Object.entries(gases)
        .forEach(([key, gas]) => {
            gasVolumeAjax(hasGGH, key, gas)
        })
}
