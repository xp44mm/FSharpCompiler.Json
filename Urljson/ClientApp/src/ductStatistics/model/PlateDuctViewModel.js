import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { SurfaceViewModel } from './SurfaceViewModel'
import { SectionViewModel } from './SectionViewModel'

export class PlateDuctViewModel {
    constructor() {
        //this.remark = new BehaviorSubject('')
        //this.surface = new SurfaceViewModel()
        this.section = new SectionViewModel()

        this.wall = new BehaviorSubject(0)

        this.paint = new BehaviorSubject(true)
        this.degree = new BehaviorSubject(0)

        this.insula = new BehaviorSubject(true)
        this.space = new BehaviorSubject(0)
        this.thick = new BehaviorSubject(0)

        this.casing = new BehaviorSubject(true)
        this.support = new BehaviorSubject(0)

        this.weight =
            combineLatest(this.surface.surface, this.wall)
            |> map(([surface, wall]) => 7.85e-3 * surface * wall)

        this.paintVolume =
            combineLatest(this.surface.surface, this.degree)
            |> map(([surface, degree]) => {
                let dosage = 0.2 // kg/m2*道，估算3道
                let kg = dosage * surface * degree //* this.ratio / 100
                return kg
            })

        let insulaExt =
            combineLatest(this.space, this.thick)
            |> map(([space, thick]) => 2e-3 * (space + thick))

        let insulaSurface = this.surface.offset(insulaExt)

        this.insulaVolume =
            combineLatest(insulaSurface.surface, this.thick)
            |> map(([surface, thick]) => 1.1 * surface * thick / 1000)

        let casingExt = this.support |> map(support => 2e-3 * support)
        let casingSurface = this.surface.offset(casingExt)
        this.casingArea = casingSurface.surface |> map(surface => 1.2 * surface)

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
