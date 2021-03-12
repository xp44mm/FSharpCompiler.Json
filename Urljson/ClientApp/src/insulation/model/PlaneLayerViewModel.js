import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, mergeMap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { PlaneInsulationViewModel } from './PlaneInsulationViewModel'

//仅用于 `PlaneInsulationViewModel`
export class PlaneLayerViewModel {
    constructor() {
        this.insula = new BehaviorSubject('岩棉')
        this.thick = new BehaviorSubject(10)
        this.heatLoss = new BehaviorSubject(0)
        this.tn = new BehaviorSubject(0) //内壁温度

        this.maxTemperature =
            this.insula
            |> map(
                insula =>
                    'equipment/maxTemperature?' + jzonQueryData({ insula })
            )
            |> mergeMap(url => httpGetJson(url))

        //todo:需要等待heatLoss结束再发射
        //外壁温度
        this.outerTemperature =
            combineLatest(this.heatLoss, this.tn, this.insula, this.thick)
            //|> debounceTime(10)
            |> distinctUntilChanged()
            |> map(
                ([heatloss, innerTemperature, material, thick]) =>
                    'equipment/flatOuterTemperature?' +
                    jzonQueryData({
                        heatloss,
                        innerTemperature,
                        material,
                        thick: thick * 1e-3,
                    })
            )
            |> mergeMap(url => httpGetJson(url))
    }
    pickeys() {
        return ['insula', 'thick']
    }

    subscribe(parent = new PlaneInsulationViewModel()) {
        let subscriptions = [
            parent.safeHeatLoss.subscribe(this.heatLoss),
            parent.layers.length
                |> (len =>
                    len > 0
                        ? parent.layers[len - 1].outerTemperature
                        : parent.t)
                |> (t => t.subscribe(this.tn)),
        ]
        let subscription = new Subscription()
        subscriptions.forEach(su => {
            subscription.add(su)
        })
        return subscription
    }

    unsubscribe() {
        this.subscriptions.forEach(s => {
            s.unsubscribe()
        })
    }
}
