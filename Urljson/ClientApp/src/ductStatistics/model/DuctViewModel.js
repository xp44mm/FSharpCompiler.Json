import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { SurfaceViewModel } from './SurfaceViewModel'

export class DuctViewModel {
    constructor() {
        this.remark = new BehaviorSubject('')
        this.surface = new SurfaceViewModel()
        this.wall = new BehaviorSubject(0)

        this.paint = new BehaviorSubject(true)
        this.degree = new BehaviorSubject(3) //油漆道数，估算3道

        this.insula = new BehaviorSubject(true)
        this.space = new BehaviorSubject(0)
        this.thick = new BehaviorSubject(0)

        this.casing = new BehaviorSubject(true)
        this.support = new BehaviorSubject(0)

        this.weight =
            combineLatest(this.surface.surface, this.wall)
            |> map(([surface, wall]) => 7.85e-3 * surface * wall)

        this.paintVolume =
            combineLatest(this.paint, this.surface.surface, this.degree)
            |> map(([need, surface, degree]) => {
                if (need) {
                    let dosage = 0.2 // 0.2 kg/m2*道，估算，有的油漆值更小些
                    let kg = dosage * surface * degree //* this.ratio / 100
                    return kg

                } else {
                    return 0
                }
            })

        let insulaSurface =
            this.surface.kind
            |> mergeMap(k => {
                if (k === 'section') {
                    return this.surface.section.surface
                } else {
                    let ext =
                        combineLatest(this.space, this.thick)
                        |> map(([space, thick]) => 2e-3 * (space + thick))

                    return this.surface.tube.offsetSurface(ext)
                }
            })

        this.insulaVolume =
            combineLatest(insulaSurface, this.thick)
            |> map(([surface, thick]) => 1.1 * surface * thick / 1000)

        let casingSurface =
            this.surface.kind
            |> mergeMap(k => {
                if (k === 'section') {
                    return this.surface.section.surface
                } else {
                    let ext =
                        this.support
                        |> map(support => 2e-3 * support)

                    return this.surface.tube.offsetSurface(ext)
                }

            })

        this.casingArea = casingSurface |> map(surface => 1.2 * surface)

    }

    pickeys() {
        let bs = new Set(
            Object.keys(this).filter(k => this[k] instanceof BehaviorSubject)
        )

        if (!this.paint.value) {
            bs.delete('degree')
        }

        if (!this.insula.value) {
            bs.delete('space')
            bs.delete('thick')
        }

        if (!this.casing.value) {
            bs.delete('support')
        }

        return ['surface', ...bs]
    }
}
