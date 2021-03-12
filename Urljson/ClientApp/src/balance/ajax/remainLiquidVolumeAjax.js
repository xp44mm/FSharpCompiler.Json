import { liquidVolumeAjax } from "./liquidVolumeAjax";
import { BalanceViewModel } from '../model';

export const remainLiquidVolumeAjax = (balance = new BalanceViewModel()) => {
    let {
        //productA,
        limestone: {
            feed: limestoneFeed,
            slurry: limestoneSlurry,
        },
        dewatering,
        //gypsumBleed,
        phof,
        phuf,
        vffeed,
        gypsum,
        filtrate,
        shff,
        shof,
        shuf,
        bleed,
        reclaimWater,
        toprep,
    } = balance

    let liquids = {
        limestoneFeed,
        limestoneSlurry,
        phof,
        phuf,
        vffeed,
        gypsum,
        filtrate,
        shff,
        shof,
        shuf,
        bleed,
        reclaimWater,
        toprep,
    }

    Object.entries(liquids)
        .forEach(([key, liquid]) => {
            liquidVolumeAjax(dewatering.chlorideBleed, key, liquid)
        })
}
