import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { httpGetJson, jzonQueryData } from '../../http'
import { CircleViewModel } from '../../shapes'

export class TankViewModel {
    constructor(circle = new CircleViewModel()) {
        this.circle = circle
        this.height = new BehaviorSubject(5)
        this.liningHeight = new BehaviorSubject(1)

        this.volume =
            combineLatest(this.circle.area, this.height)
            |> map(([area, height]) => area * (height - 0.5))

        this.weight =
            combineLatest(this.circle.diameter, this.height)
            |> mergeMap(([diameter, height]) =>
                httpGetJson(
                    'equipment/tankweight?' +
                        jzonQueryData({ diameter, height })
                )
            )

        this.agitator =
            this.volume
            |> mergeMap(volume =>
                httpGetJson('equipment/agitator?' + jzonQueryData({ volume }))
            )

        this.singleLining =
            combineLatest(
                this.circle.area,
                this.circle.peri,
                this.height,
                this.liningHeight
            )
            |> map(
                ([area, peri, height, liningHeight]) =>
                    area + peri * (height - liningHeight)
            )

        this.doubleLining =
            combineLatest(
                this.circle.area,
                this.circle.peri,
                this.liningHeight
            ) |> map(([area, peri, liningHeight]) => area + peri * liningHeight)
    }
}
