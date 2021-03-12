import { combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

//荷载参数
let parameters = {
    duct: function (load) {
        let { wall, length, fullness, inclination, ashDensity } = load.duct
        return combineLatest(wall, length, fullness, inclination, ashDensity)
            |> map(([wall, length, fullness, inclination, ashDensity]) => {
                if (fullness == 0 || ashDensity == 0) {
                    return [`壁厚：${wall}mm`, `倾角：${inclination}°`].join(
                        '，'
                    )
                } else {
                    return [
                        `壁厚：${wall}mm`,
                        `倾角：${inclination}°`,
                        `灰密度：${ashDensity}kN/m3`,
                        `积灰：${fullness}`,
                    ].join('，')
                }
            })
    },

    damper: function (load) {
        let { wall } = load.damper
        return (wall
            |> map(wall => {
                return [`壁厚：${wall}mm`].join('，')
            })
        )
    },

    expansion: function (load) {
        let { pressure, inclination, direction } = load.expansion

        return (combineLatest(pressure, inclination, direction)
            |> map(([pressure, inclination, direction]) => {
                return [
                    `倾角：${inclination}°`,
                    `方向角：${direction}°`,
                ].join('，')
            })
        )
    },
}

export const paramRepr = load =>
    load.kind |> mergeMap(kind => parameters[kind](load))
