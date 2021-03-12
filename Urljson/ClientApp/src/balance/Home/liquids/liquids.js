//浆液汇总
export const liquids = balance => {
    let {
        productA,
        limestone,
        gypsumBleed,
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

    return {
        "产物": productA,
        "石灰石": limestone.feed,
        "石灰石浆液": limestone.slurry,
        "浆液排出": gypsumBleed,
        "石膏站顶流": phof,
        "石膏站底流": phuf,
        "过滤机供浆": vffeed,
        "石膏": gypsum,
        "滤液水": filtrate,
        "废水站供浆": shff,
        "废水站顶流": shof,
        "废水站底流": shuf,
        "废水排放": bleed,
        "回流水": reclaimWater,
        "去制浆": toprep,
    }
}
