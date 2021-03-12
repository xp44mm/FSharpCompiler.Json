import { BehaviorSubject } from 'rxjs'
import { distinctUntilChanged, filter, map } from 'rxjs/operators'
import { deepMerge } from '../../deep'

/** 里面保存的值尽量为假，指示Ajax不要发送请求。*/
class Ready {
    constructor() {

        this.wetAir = new BehaviorSubject(false)
        this.airVol = new BehaviorSubject(false)
        this.idealCombus = new BehaviorSubject(false)
        this.oxiair = new BehaviorSubject(false)
        this.sootblow = new BehaviorSubject(false)
        this.removal = new BehaviorSubject(false)
        this.react = new BehaviorSubject(false)
        this.absorberOutlet = new BehaviorSubject(false)
        this.gghOutlet = new BehaviorSubject(false)
        this.absorberWithUnderspray = new BehaviorSubject(false)
        this.phofChlorideBleed = new BehaviorSubject(false)
        this.ionBalance = new BehaviorSubject(false)
        this.gypsumBleed = new BehaviorSubject(false)
        this.tower = new BehaviorSubject(false)
        this.toprep = new BehaviorSubject(false)
        this.makeup = new BehaviorSubject(false)

        //remain gases
        this.gas_gghInlet = new BehaviorSubject(false)
        this.gas_sootblow = new BehaviorSubject(false)
        this.gas_absInlet = new BehaviorSubject(false)
        this.gas_absOutlet = new BehaviorSubject(false)
        this.gas_gghOutlet = new BehaviorSubject(false)
        this.gas_oxiairFeed = new BehaviorSubject(false)
        this.gas_oxiairCompress = new BehaviorSubject(false)
        this.gas_oxiairSatur = new BehaviorSubject(false)

        //remain liquids
        this.liquid_limestoneFeed = new BehaviorSubject(false)
        this.liquid_limestoneSlurry = new BehaviorSubject(false)
        this.liquid_phof = new BehaviorSubject(false)
        this.liquid_phuf = new BehaviorSubject(false)
        this.liquid_vffeed = new BehaviorSubject(false)
        this.liquid_gypsum = new BehaviorSubject(false)
        this.liquid_filtrate = new BehaviorSubject(false)
        this.liquid_shff = new BehaviorSubject(false)
        this.liquid_shof = new BehaviorSubject(false)
        this.liquid_shuf = new BehaviorSubject(false)
        this.liquid_bleed = new BehaviorSubject(false)
        this.liquid_reclaimWater = new BehaviorSubject(false)
        this.liquid_toprep = new BehaviorSubject(false)

        //rtu
        this.rtuAcid = new BehaviorSubject(false)
        this.rtuBase = new BehaviorSubject(false)
        this.rtuCl = new BehaviorSubject(false)
        this.rtuDp = new BehaviorSubject(false)
        this.rtuGrind = new BehaviorSubject(false)
        this.rtuLg = new BehaviorSubject(false)
        this.rtuMargin = new BehaviorSubject(false)
        this.rtuNozzle = new BehaviorSubject(false)
        this.rtuPH = new BehaviorSubject(false)
        this.rtuQuench = new BehaviorSubject(false)
        this.rtuSO2 = new BehaviorSubject(false)
        this.rtuSolids = new BehaviorSubject(false)
        this.rtuSr = new BehaviorSubject(false)
        this.rtuVelocity = new BehaviorSubject(false)


        deepMerge(this)
            |> distinctUntilChanged()
            |> filter(([keyPath, completed]) => completed)
            |> map(([[key]]) => key)
            |> (o => o.subscribe(key => {
                console.log(`${key} completed`)
            }))

    }
}

export const ready = new Ready()