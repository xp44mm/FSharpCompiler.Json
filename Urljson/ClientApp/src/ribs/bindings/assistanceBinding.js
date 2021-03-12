import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export function assistanceBinding({ rib, wall, wallLoad }) {
    let {
        ribMaterial: { ela, xigma },
    } = rib

    let { thick, stable } = wall

    let { assistance, ribStress } = wallLoad

    //防失稳中间支撑
    combineLatest(stable, ribStress, xigma)
        |> map(([stable, stress, x0]) => {
            if (stress > 0) return 0
            else {
                let x1 = -stress / stable
                return Math.floor(x1 / x0)
            }
        })
        |> (o => o.subscribe(assistance))

}
