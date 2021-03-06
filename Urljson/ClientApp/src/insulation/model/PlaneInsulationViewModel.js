﻿import { BehaviorSubject } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { ObservableArray } from '../../deep'
import { httpGetJson, jzonQueryData } from '../../http'
import { PlaneLayerViewModel } from './PlaneLayerViewModel'

/*extends InsulationViewModel */
export class PlaneInsulationViewModel {
    constructor() {
        this.t = new BehaviorSubject(0) //介质温度
        this.heatLoss = new BehaviorSubject(0) //许用热流密度
        this.ts = new BehaviorSubject(0) //许用表面温度

        this.t
            |> map(t => 'equipment/allowableHeatLoss?' + jzonQueryData({ t }))
            |> mergeMap(url => httpGetJson(url))
            |> (obs =>
                obs.subscribe(([q, ts]) => {
                    this.heatLoss.next(q)
                    this.ts.next(ts)
                }))

        this.safeHeatLoss = this.heatLoss |> map(q => 0.9 * q)

        //保温层
        this.layers = new ObservableArray()
        this.layers.create = this.push.bind(this)

    }

    pickeys() {
        return ['t', 'layers']
    }
    ///添加保溫層
    push() {
        let layer = new PlaneLayerViewModel()
        layer.subscription = layer.subscribe(this)
        this.layers.push(layer)
    }

    pop() {
        this.layers.pop()
    }

}
