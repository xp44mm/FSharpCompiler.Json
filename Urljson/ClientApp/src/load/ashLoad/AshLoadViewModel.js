import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class AshLoadViewModel {
    constructor() {
        this.density = new BehaviorSubject(14)
        this.height = new BehaviorSubject(10)
        this.denominator = new BehaviorSubject(6)
        this.angle = new BehaviorSubject(0)

        this.ashLoad =
            combineLatest(
                this.density,
                this.height,
                this.denominator,
                this.angle
            )
            |> map(([density, height, denominator, angle]) => {
                var factor =
                    angle >= 45 ? 0 : 1 - Math.tan(Math.PI / 180 * angle)
                return density * height / denominator * factor
            })
    }
}
