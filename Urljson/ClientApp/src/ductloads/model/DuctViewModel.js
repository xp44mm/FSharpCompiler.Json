import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { ShapeViewModel } from '../../shapes'
import { tan } from '../trigonometry'

//烟道荷载
export class DuctViewModel {
    constructor() {
        this.section = new ShapeViewModel()
        this.wall = new BehaviorSubject(15) //mm
        this.length = new BehaviorSubject(1) //m
        this.fullness = new BehaviorSubject(0.166) //#
        this.inclination = new BehaviorSubject(0) //度
        this.ashDensity = new BehaviorSubject(14) //kN/m3

        //重量荷载
        this.weight =
            combineLatest(this.section.peri, this.length, this.wall)
            |> map(([peri, length, wall]) => peri * length * wall * 78.5e-3)

        //灰重量荷载
        this.ashWeight =
            combineLatest(
                this.section.area,
                this.inclination,
                this.fullness,
                this.ashDensity,
                this.length
            )
            |> map(
                ([area, inclination, fullness, ashDensity, length]) =>
                    area *
                    length *
                    fullness *
                    ashDensity *
                    Math.max(1 - tan(inclination), 0)
            )
    }

}
