import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { ShapeViewModel } from '../../shapes'
import { cos, sin } from '../trigonometry'

//膨胀节内压力
export class ExpansionViewModel {
    constructor() {
        this.section = new ShapeViewModel()
        this.pressure = new BehaviorSubject(4)
        this.inclination = new BehaviorSubject(0)
        this.direction = new BehaviorSubject(0)

        this.pressureLoad =
            combineLatest(this.section.area, this.pressure)
            |> map(([area, pressure]) => 1.1 * area * pressure)

        this.loadZ =
            combineLatest(this.pressureLoad, this.inclination)
            |> map(
                ([pressureLoad, inclination]) =>
                    -pressureLoad * sin(inclination)
            )

        this.loadXY =
            combineLatest(this.pressureLoad, this.inclination)
            |> map(
                ([pressureLoad, inclination]) => pressureLoad * cos(inclination)
            )

        this.loadX =
            combineLatest(this.loadXY, this.direction)
            |> map(([loadXY, direction]) => loadXY * cos(direction))

        this.loadY =
            combineLatest(this.loadXY, this.direction)
            |> map(([loadXY, direction]) => loadXY * sin(direction))
    }
}
