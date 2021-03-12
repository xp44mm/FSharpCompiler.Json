import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { ShapeViewModel } from '../../shapes'

//挡板门重量
export class DamperViewModel {
    constructor() {
        this.section =  new ShapeViewModel()
        this.wall = new BehaviorSubject(20)

        //重量荷载
        this.weight =
            combineLatest(this.section.area, this.wall)
            |> map(([area, wall]) => area * wall * 78.5e-3)
    }
}
