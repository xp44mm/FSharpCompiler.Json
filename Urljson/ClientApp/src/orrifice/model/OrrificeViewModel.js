import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'

export class OrrificeViewModel {
    constructor() {
        this.p0 = new BehaviorSubject(0)
        this.p1 = new BehaviorSubject(0)
        this.pt = new BehaviorSubject(0)
        this.dens = new BehaviorSubject(0)
        this.flow = new BehaviorSubject(0)
        this.dw = new BehaviorSubject(0)
        this.thick = new BehaviorSubject(0)

        this.dn = new BehaviorSubject(42)


        //壁厚越小阻力系数越大
        this.zeta =
            combineLatest(this.dw, this.dn, this.thick)
            |> map(
                ([dw, dn, thick]) =>
                    'orrifice/zeta?' +
                    jzonQueryData({ dw1: dw, dw2: dw, dn, thick })
            )
            |> mergeMap(url => httpGetJson(url))

        //孔板动压头, kPa
        this.dp =
            combineLatest(this.dens, this.flow, this.dn)
            |> map(([dens, flow, dn]) => {
                let area = Math.PI / 4 * dn ** 2 //mm2
                let vn = flow / area / 3600e-6 //孔内流速, m/s
                return 0.5 * (dens / 1000) * vn ** 2
            })

        this.maxZeta =
            combineLatest(this.p0, this.pt, this.p1, this.dp)
            |> map(
                ([p0, pt, p1, dp]) =>
                    'orrifice/maxZeta?' + jzonQueryData({ p0, pt, p1, dp })
            )
            |> mergeMap(url => httpGetJson(url))

        this.span =
            combineLatest(this.dw, this.dn)
            |> map(([dw, dn]) => 'orrifice/span?' + jzonQueryData({ dw, dn }))
            |> mergeMap(url => httpGetJson(url))

        this.p2 =
            combineLatest(this.p1, this.zeta, this.dp)
            |> map(([p1, zeta, dp]) => p1 - zeta * dp)
    }

    subscribe(pipeline = new PipelineViewModel()) {
        let ss = [
            pipeline.p0.subscribe(this.p0),
            pipeline.pt.subscribe(this.pt),
            pipeline.dens.subscribe(this.dens),
            pipeline.flow.subscribe(this.flow),
            pipeline.dw.subscribe(this.dw),
            pipeline.thick.subscribe(this.thick),

            pipeline.orrifices.length
                |> (length =>
                    length > 0
                        ? pipeline.orrifices[length - 1].p2
                        : pipeline.p1)
                |> (p1 => p1.subscribe(this.p1)),
        ]

        let subscription = new Subscription()
        ss.forEach(i => {
            subscription.add(i)
        })
        return subscription
    }

    pickeys() {
        return ['dn']
    }
}
