import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import {
    debounceTime,
    distinctUntilChanged,
    map,
    mergeMap,
} from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { PlaneLayerViewModel } from './PlaneLayerViewModel'
import { PipeInsulationViewModel } from './PipeInsulationViewModel'

//仅用于 `PipeInsulationViewModel`
export class PipeLayerViewModel extends PlaneLayerViewModel {
    constructor() {
        super()

        this.d0 = new BehaviorSubject(10)
        this.d1 =
            combineLatest(this.d0, this.thick) |> map(([d, t]) => d + 2 * t)

        this.outerTemperature =
            combineLatest(
                this.heatLoss,
                this.tn,
                this.insula,
                this.d0,
                this.thick
            )
            //|> debounceTime(10)
            |> distinctUntilChanged()
            |> map(
                ([
                    heatloss,
                    innerTemperature,
                    material,
                    innerDiameter,
                    thick,
                ]) =>
                    'equipment/pipeOuterTemperature?' +
                    jzonQueryData({
                        heatloss,
                        innerTemperature,
                        material,
                        innerDiameter: innerDiameter * 1e-3,
                        thick: thick * 1e-3,
                    })
            )
            |> mergeMap(url => httpGetJson(url))
    }

    subscribe(parent = new PipeInsulationViewModel()) {
        let lastLayer =
            parent.layers.length
            |> (len => (len > 0 ? parent.layers[len - 1] : null))

        let subscriptions = [
            parent.safeHeatLoss.subscribe(this.heatLoss),
            (lastLayer ? lastLayer.outerTemperature : parent.t)
                |> (t$ => t$.subscribe(this.tn)),
            (lastLayer ? lastLayer.d1 : parent.d)
                |> (d$ => d$.subscribe(this.d0)),
        ]

        let subscription = new Subscription()
        subscriptions.forEach(su => {
            subscription.add(su)
        })
        return subscription
    }
}
